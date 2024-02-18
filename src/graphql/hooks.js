import { useQuery } from '@vue/apollo-composable';
import { computed } from 'vue';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

const defaultQueryOptions = { fetchPolicy: 'cache-and-network' };

function getKey(result) {
  return computed(() => {
    const value = result.value;
    const keys = Object.keys(value);

    return keys.length === 1 ? keys[0] : null;
  });
}

export function useGraphQL() {
  function queryPage(
    query,
    variables = {
      paginationParams: {
        pageSize: DEFAULT_PAGE_SIZE,
        before: 0,
      },
    },
    options = {},
  ) {
    const queryResult = useQuery(
      query,
      variables,
      Object.assign(defaultQueryOptions, options),
    );

    const { result: pageResult, fetchMore, loading } = queryResult;
    const dataKey = getKey(pageResult);

    const items = computed(() => {      
      return pageResult.value ? pageResult.value[dataKey.value].items : [];
    });

    const hasMore = computed(() => {
      return pageResult.value ? pageResult.value[dataKey.value].hasMore : false;
    });

    const cursor = computed(() => {
      return pageResult.value ? pageResult.value[dataKey.value].cursor : 0;
    });

    const total = computed(() => {
      return pageResult.value ? pageResult.value[dataKey.value].total : 0;
    });

    const totalPages = computed(() => {
      return Math.ceil(total.value / DEFAULT_PAGE_SIZE);
    })

    const fetchMorePage = () => {
      if (!hasMore.value) {
        return;
      }

      fetchMore({
        variables: {
          paginationParams: {
            before: cursor.value,
            page: -1,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        },
      });
    };

    const fetchPage = (page) => {
      if (totalPages.value < page)
        return;
    
      fetchMore({
        variables: {
          paginationParams: {
            before: -1,
            page: page - 1,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        },
        updateQuery: (previousResult, { fetchMoreResult }) => { 
          return { ...fetchMoreResult };
        }
      });
    };

    return {
      items,
      hasMore,
      loading,
      fetchMorePage,
      fetchPage,
      total,
      totalPages,
      ...queryResult,
    };
  }

  return {
    queryPage,
  };
}
