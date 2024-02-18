<template>
  <q-item class="q-py-md flex-center full-width">
    <q-item-section avatar>
      <q-avatar color="primary" text-color="white">
        <StaticImage :url="userStore.user.avatar" />
      </q-avatar>
    </q-item-section>

    <q-item-section class="userinfo">
      <q-item-label>{{ userStore.user.name }}</q-item-label>

      <q-item-label
        caption
        lines="1"
        style="font-weight: bold; font-size: 10px; color: #999"
      >
        {{ $t('server.siteSlogan') }}
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <div class="row flex-end buttons">
        <q-btn
          flat
          round
          color="#999"
          size="12px"
          class="button"
          :to="{ name: 'Messages' }"
        >
          <q-badge
            v-if="userStore.unreadMessageCount > 0"
            floating
            color="red"
            rounded
          />
          <icon name="icon_005" type="class" style="color: #7e9aa6" />
        </q-btn>
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup>
// import { useRouter } from 'vue-router';
import StaticImage from 'components/StaticImage.vue';
import { useUserStore } from 'src/store/userStore';

// const { currentRoute } = useRouter();
const userStore = useUserStore();
</script>

<style lang="scss" scoped>
.userinfo {
  color: #000 !important;
  font-size: 13px;
  font-weight: bold;
}

::v-deep(.buttons) {
  // .button:first-child {
  //   margin-right: 10px;
  // }
  .iconfont {
    font-size: 22px;
    text-shadow: 1px 1px 1px rgb(0 0 0 / 20%);
  }
}
</style>
