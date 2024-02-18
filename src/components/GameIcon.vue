<template>
  <div class="Home_slide">
    <a @click="loadGame(game)">
      <q-img
        :src="game.logo"
        alt=""
        :ratio="1"
        width="100%"
        height="100%"
        fit="fill"
      />
    </a>

    <button
      v-if="!!authStore.accessToken"
      class="collect"
      :class="{ collect_active: isFavorite }"
      @click="
        () =>
          isFavorite
            ? userStore.removeFromFavorite(game)
            : userStore.addToFavorite(game)
      "
    >
      <i>&nbsp;</i>
      <i>&nbsp;</i>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'src/store/userStore';
import { useAuthStore } from 'src/store/authStore';
import NoSleep from 'nosleep.js/dist/NoSleep.min.js';

const router = useRouter();
const userStore = useUserStore();
const authStore = useAuthStore();

const props = defineProps({
  game: {
    type: Object,
  },
});

const isFavorite = computed(() => {
  return userStore.favoriteGames.some((g) => g.id === props.game.id);
});

const loadGame = (game) => {
  if (userStore.user.id) {
    userStore.addToRecent(game);
  }

  let noSleep = new NoSleep();
  noSleep.enable();

  router.push({
    name: 'Game',
    params: { gameId: game.id },
    query: { screenOrientation: game.screenOrientation },
  });
};
</script>
