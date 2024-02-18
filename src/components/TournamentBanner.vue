<template>
  <div v-if="configStore.tournaments.length > 1" class="CompBanner Mo">
    <q-carousel swipeable animated v-model="slide" infinite autoplay>
      <q-carousel-slide
        v-for="(item, index) in configStore.tournaments"
        :key="index"
        :name="index"
        :img-src="item.advertiseImageLink"
      >
        <div class="CompImg" @click="gotoListPage()">
          <ul>
            <h3>{{ item.title }}</h3>
            <Countdown :endDate="item.endDate" />
          </ul>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import Countdown from "./Countdown.vue";
import { useRouter } from "vue-router";
import { useConfigStore } from "src/store/configStore";

const { push } = useRouter();
const configStore = useConfigStore();

const slide = ref(0);

const items = reactive([]);

const gotoListPage = () => {
  if (items.length == 1) {
    push({ name: "TournamentDetails", params: { tournamentId: items[0].id } });
  } else {
    push("TournamentList");
  }
};
</script>
