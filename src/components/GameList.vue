<template>
  <div v-show="games?.length > 0" class="game_box">
    <div v-if="title" class="q-mt-lg q-px-md row justify-between">
      <div class="flex align-center">
        <q-img
          v-if="!!logo"
          :src="logo"
          class="q-mr-xs"
          alt=""
          :ratio="1"
          width="20px"
          height="20px"
          fit="fill"
        />
        <span class="title_text">{{ title }}</span>
      </div>
      <div v-if="tabId > 0">
        <q-btn @click="() => showMore(tabId)">{{ $t('common.more') }}</q-btn>
      </div>
    </div>

    <div class="list_box">
      <GameIcon v-for="game in showGames" :key="game.id" :game="game" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Dialog } from 'quasar';
import DialogGames from 'src/components/DialogGames.vue';
import GameIcon from './GameIcon.vue';

const props = defineProps({
  title: {
    type: String,
  },
  logo: {
    type: String,
  },
  tabId: {
    type: Number,
  },
  games: {
    type: Array,
  },
  pageSize: {
    type: Number,
    default: 12,
  },
});

const showGames = ref([]);

watch(
  () => props.games,
  () => {
    if (showGames.value.length <= props.pageSize) {
      showGames.value = props.games.slice(0, props.pageSize);
    }
  },
);

onMounted(() => {
  showGames.value = props.games.slice(0, props.pageSize);
});

const showMore = (tabId) => {
  Dialog.create({
    component: DialogGames,
    dark: true,
    componentProps: { tabId },
  });
};
</script>
