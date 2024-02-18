<template>
  <q-page class="Sys_page">
    <div class="Location Pc">
      <ul>
        <li>
          <q-btn flat round dense @click="$router.go(-1)" />
        </li>
        <li>{{ t("routes.title.Password") }}</li>
      </ul>
    </div>
    <q-form @submit="onSubmit">
      <div class="profile_form">
        <div class="profile_form_list">
          <div class="list_input">
            <p class="label text-capitalize">
              {{ t('profile.label.currentPassword') }}
            </p>
            <q-input
              type="password"
              dense
              autocorrect="off"
              autocapitalize="off"
              autocomplete="off"
              spellcheck="false"
              v-model="formModel.currentPassword"
              :placeholder="$t('profile.placeholder.currentPassword')"
              lazy-rules="ondemand"
              :rules="passwordRules"
              class="Sys_input_text"
            />
          </div>
          <!--  -->
          <div class="list_input">
            <p class="label text-capitalize">
              {{ t('profile.label.newPassword') }}
            </p>
            <q-input
              type="password"
              dense
              autocorrect="off"
              autocapitalize="off"
              autocomplete="new-password"
              spellcheck="false"
              v-model="formModel.password"
              :placeholder="t('profile.placeholder.newPassword')"
              lazy-rules="ondemand"
              :rules="passwordRules"
              class="Sys_input_text"
            />
          </div>
          <!--  -->
          <div class="list_input">
            <p class="label text-capitalize">
              {{ t('profile.label.passwordAgain') }}
            </p>
            <q-input
              ref="confirmPasswordInput"
              type="password"
              dense
              autocomplete="new-password"
              v-model="formModel.confirmPassword"
              :placeholder="$t('profile.placeholder.passwordAgain')"
              lazy-rules="ondemand"
              :rules="
                passwordRules.concat([
                  (val) =>
                    val === formModel.password ||
                    $t('message.confirmPasswordNotMatch'),
                ])
              "
              class="Sys_input_text"
            />
          </div>
          <div class="Sys_Btn_Submit">
          <q-btn
            :label="$t('profile.label.changePassword')"
            :loading="submitting"
            rounded
            type="submit"
          />
        </div>
          <!--  -->
        </div>
      </div>
    </q-form>
    <PcCopyright />
    <StickyCustomerService />
  </q-page>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'src/boot/i18n';
import { passwordRules } from '../login/LoginRules';
import { useConfigStore } from 'src/store/configStore';
import { useQuasar } from 'quasar';
import { useMutation } from '@vue/apollo-composable';
import { Mutation } from 'src/graphql';
import StickyCustomerService from "src/components/StickyCustomerService.vue";
import PcCopyright from "src/components/PcCopyright.vue";

const configStore = useConfigStore();
const router = useRouter();

const { t } = useI18n();
const $q = useQuasar();

const confirmPasswordInput = ref(null);

const formModel = reactive({
  currentPassword: '',
  password: '',
  confirmPassword: '',
});

watch(
  () => formModel.password,
  () => {
    if (!!formModel.confirmPassword) {
      confirmPasswordInput.value.validate();
    }
  },
);

const { mutate: updatePassword, loading: submitting } = useMutation(
  Mutation.updatePassword,
);

async function onSubmit() {
  await updatePassword({
    currentPassword: formModel.currentPassword,
    newPassword: formModel.password,
  });

  $q.notify({
    message: t('profile.message.passwordChanged'),
    icon: 'mdi-check-circle',
    position: 'top',
    type: 'positive',
  });

  configStore.prevRoute
    ? await router.go(-1)
    : await router.replace({ name: 'Profile' });
}
</script>
<style lang="scss" scoped></style>
