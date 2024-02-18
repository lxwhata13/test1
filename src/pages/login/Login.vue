<template>
  <q-page class="q-ma-none">
    <div class="login_img Mo">
      <img src="~assets/AppSkinD/images/Login_00.png" alt="" />
    </div>
    <div class="loginMain">
      <q-item class="LoginLayout_title">
        <q-item-section>
          <q-item-label>{{ t("account.title.login") }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-form ref="loginForm" @submit="handleSubmit" class="LoginLayout_list">
        <q-input
          v-model.trim="model.accountName"
          lazy-rules="ondemand"
          :rules="
            sysConfig.userAccountType === 'mobile' ? loginMobileRules : loginEmailRules
          "
          :placeholder="
            t(
              `account.placeholder.${
                sysConfig.userAccountType === 'mobile' ? 'loginMobile' : 'loginEmail'
              }`
            )
          "
          class="Sys_input_text"
          dense
        />

        <q-input
          v-model="model.password"
          type="password"
          :placeholder="t('account.placeholder.password')"
          :rules="passwordRules"
          lazy-rules="ondemand"
          class="Sys_input_text"
          dense
        />

        <div class="List_bottom_text List_right_text">
          <q-btn to="/forgotPassword"> {{ t("account.label.forgotPassword") }}? </q-btn>
        </div>

        <div class="Sys_Btn_Submit">
          <q-btn :label="t('account.label.login')" :loading="submitting" type="submit" />
        </div>

        <div class="List_bottom_text">
          <q-btn to="/register">
            {{ t("account.label.dontHaveAccount") }}?
            <i>{{ t("account.label.signUpNow") }}</i>
          </q-btn>
        </div>
      </q-form>
    </div>
    <PcCopyright />
    <StickyCustomerService />
  </q-page>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useI18n } from "src/boot/i18n";
import { useAuthStore } from "src/store/authStore";
import { useConfigStore } from "src/store/configStore";
import { useUserStore } from "src/store/userStore";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { loginMobileRules, loginEmailRules, passwordRules } from "./LoginRules";
import { joinChannel, leaveChannel } from "src/boot/channel";
import PcCopyright from "src/components/PcCopyright.vue";
import StickyCustomerService from "src/components/StickyCustomerService.vue";

const { t } = useI18n();
const { countryCode, sysConfig } = useConfigStore();

const model = reactive({
  countryCode,
  accountName: "",
  password: "",
});

const loginForm = ref(null);
const submitting = ref(false);
const authStore = useAuthStore();
const userStore = useUserStore();

const router = useRouter();
const $q = useQuasar();

async function handleSubmit() {
  submitting.value = true;
  leaveChannel();

  try {    
    await router.push({ name: "Home" });
    
  } finally {
    submitting.value = false;
  }
}
</script>

<style lang="scss" scoped></style>
