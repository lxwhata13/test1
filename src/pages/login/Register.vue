<template>
  <q-page class="q-ma-none">
    <div class="loginMain loginMain_one">
      <q-item class="LoginLayout_title">
        <q-item-section>
          <q-item-label>
            {{ t("account.title.register") }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-form @submit="onSubmit" class="LoginLayout_list">
        <q-input
          v-model.trim="formModel.mobile"
          v-if="configStore.sysConfig.userAccountType === 'mobile'"
          :placeholder="t('account.placeholder.mobile')"
          autocomplete="new-password"
          :mask="MOBILE_INPUT_MASK"
          :rules="registerMobileRules"
          lazy-rules="ondemand"
          class="Sys_input_text"
          ref="mobileInputRef"
          dense
        />

        <q-input
          v-model="formModel.email"
          v-if="configStore.sysConfig.userAccountType === 'email'"
          :placeholder="t('account.placeholder.email')"
          autocomplete="new-password"
          :rules="registerEmailRules"
          lazy-rules="ondemand"
          ref="emailInput"
          class="Sys_input_text"
          dense
        />

        <q-input
          v-model="formModel.identifyCode"
          v-if="configStore.sysConfig.registerRequireIdentifyCode"
          type="number"
          mask="######"
          :rules="identifyCodeRules"
          lazy-rules="ondemand"
          :placeholder="t('account.placeholder.verificationCode')"
          class="Sys_input_text Sys_input_text_code"
          dense
        >
          <template v-slot:after>
            <q-btn
              :disable="!sendButtonEnabled"
              :label="
                cooldownRef == 0
                  ? t('account.label.getVerificationCode')
                  : `${cooldownRef}s`
              "
              @click.stop="onBtnSendIdentifyCode"
            />
          </template>
        </q-input>

        <q-input
          v-model="formModel.password"
          autocomplete="new-password"
          type="password"
          :rules="passwordRules"
          lazy-rules="ondemand"
          :placeholder="t('account.placeholder.password')"
          class="Sys_input_text"
          dense
        />

        <q-input
          v-model.trim="formModel.name"
          :placeholder="t('account.placeholder.accountName')"
          autocomplete="new-password"
          :rules="registerNameRules"
          lazy-rules="ondemand"
          class="Sys_input_text"
          dense
        />

        <q-input
          v-model.trim="formModel.inviteCode"
          type="text"
          :placeholder="t('account.placeholder.inviteCode')"
          :rules="inviteCodeRules"
          lazy-rules="ondemand"
          :readonly="!!configStore.inviteCode"
          class="Sys_input_text"
          dense
        />

        <div class="Sys_Btn_Submit">
          <q-btn type="submit" :label="t('account.label.signUpNow')" />
        </div>

        <div class="List_bottom_text">
          <q-btn to="/login">
            {{ t("account.label.haveAnAccount") }}?
            <i>{{ t("account.label.login") }}</i>
          </q-btn>
        </div>
      </q-form>
    </div>
    <PcCopyright />
    <StickyCustomerService />
  </q-page>
</template>

<script setup>
import { MOBILE_INPUT_MASK, RE_MOBILE_NUMBER, RE_EMAIL } from "src/utils/constants";
import { reactive, ref, toRaw, computed } from "vue";
import { throttle, useQuasar } from "quasar";
import { useI18n } from "src/boot/i18n";
import { useConfigStore } from "src/store/configStore";
import { registerUser } from "src/api";
import { sendIdentifyCode } from "src/utils";
import { useRouter } from "vue-router";
import {
  registerEmailRules,
  registerMobileRules,
  passwordRules,
  identifyCodeRules,
  inviteCodeRules,
  registerNameRules,
} from "./LoginRules";
import StickyCustomerService from "src/components/StickyCustomerService.vue";
import PcCopyright from "src/components/PcCopyright.vue";

const configStore = useConfigStore();

if (!configStore.sysConfig.userAccountType) {
  configStore.fetch();
}

const { t } = useI18n();
const $q = useQuasar();

const cooldownRef = ref(0);
const sendingSmsRef = ref(false);
const mobileInputRef = ref(null);
const submittingRef = ref(false);

const router = useRouter();

const formModel = reactive({
  mobile: "",
  email: "",
  countryCode: configStore.countryCode,
  identifyCode: "",
  password: "",
  inviteCode: configStore.inviteCode,
  name: "",
});

const sendButtonEnabled = computed(() => {
  if (configStore.sysConfig.userAccountType === "mobile") {
    return (
      !!formModel.mobile &&
      RE_MOBILE_NUMBER.test(formModel.mobile) &&
      cooldownRef.value === 0
    );
  } else {
    return !!formModel.email && RE_EMAIL.test(formModel.email) && cooldownRef.value === 0;
  }
});

const onBtnSendIdentifyCode = throttle(
  async () =>
    await sendIdentifyCode(
      formModel.countryCode,
      formModel.mobile,
      formModel.email,
      sendingSmsRef,
      cooldownRef
    ),
  1000
);

const onSubmit = throttle(handleSubmit, 3000);

async function handleSubmit() {
  submittingRef.value = true;

  try {
    let attrs = toRaw(formModel);
    let res = await registerUser(attrs);

    if (res.success) {
      $q.notify({
        message: t("account.message.registerSuccess"),
        icon: "mdi-check-circle",
        position: "top",
        type: "positive",
      });

      await router.replace({ name: "Login" });
    } else {
      $q.notify({
        message: t(res.message || "error.server.unknown"),
        icon: "mdi-information-outline",
        position: "top",
        type: "negative",
      });
    }
  } catch (_) {
    $q.notify({
      message: t("error.server.unknown"),
      icon: "mdi-information-outline",
      position: "top",
      type: "negative",
    });
  } finally {
    submittingRef.value = true;
  }
}
</script>

<style lang="scss" scoped>
::v-deep(.q-field) {
  .q-field__prefix {
    color: $purple;
  }
}
</style>
