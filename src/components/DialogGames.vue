<template>
  <q-dialog v-model="showDialog">
    <div class="close-dialog">
      <q-btn flat v-close-popup icon="iconfont:icon-guanbi"></q-btn>
    </div>
    <q-card class="game-list q-px-md">
      <q-card-section>
        <q-select
          dark
          borderless
          v-model="currentTab"
          :options="tabs"
          map-options
          emit-value
          behavior="menu"
          :popup-content-style="{ backgroundColor: '#111F41' }"
        />
      </q-card-section>
      <div class="list_box">
        <GameIcon v-for="game in games" :key="game.id" :game="game" />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useConfigStore } from 'src/store/configStore';
import GameIcon from './GameIcon.vue';

const configStore = useConfigStore();

const props = defineProps({
  tabId: {
    type: Number,
  },
});

const currentTab = ref(props.tabId);

const tabs = computed(() =>
  configStore.gameTabs.map((tab) => ({
    label: tab.name,
    value: tab.id,
    key: tab.id,
  })),
);

const games = computed(() => {
  const tab = configStore.gameTabs.find((tab) => tab.id === currentTab.value);
  console.log(currentTab.value, tab);
  return tab.games || [];
});
</script>

<style lang="scss" scoped>
.close-dialog {
  position: absolute;
  z-index: 20;
  top: 16px;
  right: 16px;

  @media (min-width: 414px) and (max-width: 2560px) {
    right: calc(50% - 207px);
  }
}

::v-deep(.q-dialog__backdrop) {
  background: rgba(0, 0, 0, 0.9);
}

::v-deep(.q-card).game-list {
  width: 100vw;
  min-height: 60vh;
  max-height: 80vh;
  background: rgba(0, 0, 0, 0);

  @media (min-width: 414px) and (max-width: 2560px) {
    width: 414px;
  }
}
</style>
