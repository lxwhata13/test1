<template>
  <router-view />
  <!-- <router-view v-slot="{ Component }">
    <transition
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutLeft"
    >
      <component :is="Component" />
    </transition>
  </router-view> -->
</template>

<script setup>
import { computed, provide } from 'vue';
import { useMeta, useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useI18n } from 'src/boot/i18n';
import { apolloClient } from 'src/apolloClient';
import { DefaultApolloClient } from '@vue/apollo-composable';

const { currentRoute } = useRouter();
const { t } = useI18n();

const $q = useQuasar();

document.body.classList.add('portrait');

$q.iconMapFn = (iconName) => {
  if (iconName.startsWith('iconfont:') === true) {
    const name = iconName.substring(9);

    return {
      cls: 'iconfont ' + name,
    };
  }
};

const title = computed(() =>
  t(`routes.title.${currentRoute.value.name}`, currentRoute.value.params),
);

useMeta(() => {
  return {
    title: title.value.startsWith('routers.title')
      ? 'Heyler777'
      : 'Heyler777 - ' + title.value,
  };
});

provide(DefaultApolloClient, apolloClient);
</script>
