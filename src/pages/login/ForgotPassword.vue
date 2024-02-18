<template>
  <q-page class="q-ma-none">
    <div class="loginMain loginMain_one">
      <q-item class="LoginLayout_title">
        <q-item-section>
          <q-item-label>{{ t("account.title.forgotPassword") }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-form @submit="onSubmit" class="LoginLayout_list">
        <q-input
          v-model.trim="formModel.mobile"
          v-if="sysConfig.userAccountType === 'mobile'"
          :placeholder="t('account.placeholder.mobile')"
          :mask="MOBILE_INPUT_MASK"
          lazy-rules="ondemand"
          :rules="loginMobileRules"
          ref="mobileInput"
          class="Sys_input_text Sys_input_text_phone"
          dense
        />

        <q-input
          v-model.trim="formModel.email"
          v-if="sysConfig.userAccountType === 'email'"
          :placeholder="t('account.placeholder.email')"
          :rules="loginEmailRules"
          lazy-rules="ondemand"
          class="Sys_input_text"
          ref="emailInput"
          dense
        />

        <q-input
          v-model.trim="formModel.identifyCode"
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
                cooldown == 0 ? t('account.label.getVerificationCode') : `${cooldown}s`
              "
              @click.stop="onBtnSendIdentifyCode"
            />
          </template>
        </q-input>

        <q-input
          v-model="formModel.password"
          :rules="passwordRules"
          lazy-rules="ondemand"
          autocomplete="new-password"
          :placeholder="t('account.placeholder.newPassword')"
          class="Sys_input_text"
          dense
        />
        <div class="Sys_Btn_Submit">
          <q-btn type="submit" :label="t('account.label.setNewPassword')" />
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
import { passwordRules, identifyCodeRules, loginMobileRules } from "./LoginRules";
import { resetPassword } from "src/api";
import { sendIdentifyCode } from "src/utils";
import { useRouter, useRoute } from "vue-router";
import { useConfigStore } from "src/store/configStore";
import PcCopyright from "src/components/PcCopyright.vue";
import StickyCustomerService from "src/components/StickyCustomerService.vue";

const {
  query: { mobile },
} = useRoute();

const cooldown = ref(0);
const mobileInput = ref(null);
const emailInput = ref(null);

const { t } = useI18n();
const $q = useQuasar();
const sendingSms = ref(false);
const submitting = ref(false);
const router = useRouter();
const { countryCode, sysConfig } = useConfigStore();

const formModel = reactive({
  countryCode: countryCode,
  mobile,
  email: "",
  identifyCode: "",
  password: "",
});

const sendButtonEnabled = computed(() => {
  if (sysConfig.userAccountType === "mobile") {
    return (
      !!formModel.mobile &&
      RE_MOBILE_NUMBER.test(formModel.mobile) &&
      cooldown.value === 0
    );
  } else {
    return !!formModel.email && RE_EMAIL.test(formModel.email) && cooldown.value === 0;
  }
});

const onBtnSendIdentifyCode = throttle(
  async () =>
    await sendIdentifyCode(
      formModel.countryCode,
      formModel.mobile,
      formModel.email,
      sendingSms,
      cooldown
    ),
  1000
);

async function onSubmit() {
  submitting.value = true;

  try {
    let attrs = toRaw(formModel);

    let res = await resetPassword({ ...attrs, newPassword: attrs.password });

    if (res.success) {
      $q.notify({
        message: t("account.message.resetPasswordSuccess"),
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
    submitting.value = true;
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
