<template>
  <q-page class="Sys_page">


    <div class="Location Pc">
      <ul>
        <li>
          <q-btn flat round dense @click="$router.go(-1)" />
        </li>
        <li>{{ t("routes.title.Avatar") }}</li>
      </ul>
    </div>
    <div class="Avatar_one" @click="handleSubmit">
      <p>
        <img src="~assets/AppSkinD/upload/Head_00.9cdd4cb7.png" alt="">
      </p>
      <p class="Sys_Btn_Submit">
        <q-btn
          type="a"
          :label="$t('profile.label.changeAvatar')"
          :loading="loading"
          @click.stop="() => handleSubmit()"
          rounded
        />
      </p>
    </div>
    <div class="Avatar_img">
      <div class="Avatar_title">{{ $t('profile.label.selectAvatar') }}:</div>
      <div class="box">
        <div v-for="url in avatarUrls" :key="url" class="box_img">
          <q-avatar
            size="48px"
            @click.stop="formModel.avatar = url"
            :class="formModel.avatar === url ? 'active' : ''"
          >
            <StaticImage :url="url" />
          </q-avatar>
        </div>
      </div>
    </div>
    <PcCopyright />
    <StickyCustomerService />
  </q-page>
</template>

<script setup>
import { reactive } from 'vue';
import { useUserStore } from 'src/store/userStore';
import { useI18n } from 'src/boot/i18n';
import StaticImage from 'components/StaticImage.vue';
import { format } from 'quasar';
import { useMutation } from '@vue/apollo-composable';
import { Mutation } from 'src/graphql';
import { useQuasar } from 'quasar';
import StickyCustomerService from "src/components/StickyCustomerService.vue";
import PcCopyright from "src/components/PcCopyright.vue";

const { pad } = format;
const { t } = useI18n();
const $q = useQuasar();

const userStore = useUserStore();

const formModel = reactive({
  avatar: userStore.user.avatar,
});

const avatarUrls = [...Array(37).keys()].map(
  (n) => `Head/Head_${pad(n, 2)}.png`,
);

const { mutate: updateAvatar, loading } = useMutation(Mutation.updateAvatar);

async function handleSubmit() {
  if (formModel.avatar !== userStore.user.avatar) {
    await updateAvatar({ avatar: formModel.avatar });

    userStore.updateAvatar(formModel.avatar);

    $q.notify({
      message: t('profile.message.avatarChanged'),
      timeout: 1000,
      icon: 'mdi-information',
      position: 'top',
      type: 'positive',
    });
  }
}
</script>

<style lang="scss" scoped>
.q-avatar.active {
  ::v-deep(.q-avatar__content) {
    border: 2px solid $lime-3;
  }
}
</style>
