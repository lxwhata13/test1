<template>
  <q-page class="Sys_page">
    <q-form @submit="onSubmit">
      <div class="profile_form">
        <div class="profile_form_list">
          <div class="list_input">
            <p class="label">Your mobile phone number</p>
            <q-input
              ref="mobileInput"
              v-if="!userStore.user.emptyFundPassword"
              v-model="formModel.mobile"
              autocorrect="off"
              autocapitalize="off"
              autocomplete="off"
              spellcheck="false"
              readonly
              dense
              :prefix="`+${formModel.countryCode}`"
              :placeholder="t('account.placeholder.mobile')"
              lazy-rules="ondemand"
              class="Sys_input_text"
            ></q-input>
          </div>
          <div class="list_input">
            <p class="label">Code received via SMS</p>
            <q-input
              dense
              mask="######"
              v-if="!userStore.user.emptyFundPassword"
              autocorrect="off"
              autocapitalize="off"
              autocomplete="off"
              spellcheck="false"
              v-model="formModel.identifyCode"
              :placeholder="t('account.placeholder.verificationCode')"
              lazy-rules="ondemand"
              :rules="identifyCodeRules"
              class="Sys_input_text Sys_input_text_code"
            >
              <template v-slot:after>
                <q-btn
                  v-if="cooldownRef == 0"
                  flat
                  dense
                  round
                  :loading="sendingRef"
                  @click.stop="onBtnSendCode"
                  label="Get verification code"
                />
                <q-avatar v-else>
                  {{ cooldownRef }}
                </q-avatar>
              </template>
            </q-input>
          </div>
          <div class="list_input">
            <p class="label">Set new password</p>
            <q-input
              type="password"
              dense
              autocorrect="off"
              autocapitalize="off"
              autocomplete="off"
              spellcheck="false"
              v-model="formModel.password"
              :placeholder="t('account.placeholder.password')"
              lazy-rules="ondemand"
              :rules="passwordRules"
              class="Sys_input_text"
            ></q-input>
          </div>
          <div class="list_input">
            <p class="label">Current password</p>
            <q-input
              ref="confirmPasswordInput"
              type="password"
              dense
              v-model="formModel.confirmPassword"
              :placeholder="$t('account.placeholder.passwordAgain')"
              lazy-rules="ondemand"
              :rules="
                passwordRules.concat([
                  (val) =>
                    val === formModel.password || $t('message.confirmPasswordNotMatch'),
                ])
              "
              class="Sys_input_text"
            ></q-input>
          </div>
        </div>
        <div class="Sys_Btn_Submit">
          <q-btn
            :label="$t('profile.label.setPassword')"
            :loading="submitting"
            rounded
            type="submit"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { MOBILE_COUNTRY_CODE } from "src/utils/constants";
import { reactive, ref, watch } from "vue";
import { useI18n } from "src/boot/i18n";
import { passwordRules, identifyCodeRules } from "../login/LoginRules";
import { useUserStore } from "src/store/userStore";
import { sendIdentifyCode } from "src/utils";
import { useQuasar } from "quasar";
import { useMutation } from "@vue/apollo-composable";
import { Mutation } from "src/graphql";

const userStore = useUserStore();
const { t } = useI18n();
const $q = useQuasar();

const cooldownRef = ref(0);
const sendingRef = ref(false);
const confirmPasswordInput = ref(null);

const formModel = reactive({
  countryCode: userStore.user.countryCode,
  mobile: userStore.user.mobile,
  identifyCode: null,
  password: "",
  confirmPassword: "",
});

watch(
  () => formModel.password,
  () => {
    if (!!formModel.confirmPassword) {
      confirmPasswordInput.value.validate();
    }
  }
);

async function onBtnSendCode() {
  await sendIdentifyCode(
    userStore.user.countryCode,
    userStore.user.mobile,
    sendingRef,
    cooldownRef
  );
}

const { mutate: updateFundPassword, loading: submitting } = useMutation(
  Mutation.updateFundPassword
);

const emit = defineEmits(["submit"]);

async function onSubmit() {
  const { data } = await updateFundPassword({
    password: formModel.password,
    identifyCode: formModel.identifyCode,
  });

  userStore.setUser(data.updateFundPassword);

  $q.notify({
    message: t("profile.message.fundPasswordUpdated"),
    icon: "mdi-check-circle",
    position: "top",
    type: "positive",
  });

  emit("submit");
}
</script>
<style lang="scss" scoped>
.Sys_page {
  background-color: #29333d;
}
</style>
