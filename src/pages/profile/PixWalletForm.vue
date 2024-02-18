<template>
  <q-page class="Sys_page">
    <q-form @submit="onSubmit">
      <div class="profile_form">
        <div class="profile_form_list">
          <div class="list_input list_input_select">
            <p class="label text-capitalize">
              {{ t('profile.label.pixAcctType') }}
            </p>

            <q-select
              filled
              v-model="formModel.acctType"
              :options="acctTypes"
              :popup-content-style="{ backgroundColor: '#111F41' }"
              :placeholder="t('profile.placeholder.pixAcctType')"
              stack-label
              class="profile_select"
              lazy-rules="ondemand"
              emit-value
              map-options
              :readonly="readonly"
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  t('message.required', {
                    fieldName: t('profile.label.pixAcctType'),
                  }),
              ]"
            />
          </div>

          <div class="list_input">
            <p class="label text-capitalize">
              {{ t('profile.label.pixAcctNo') }}
            </p>
            <q-input
              v-model.trim="formModel.acctNo"
              type="text"
              :mask="acctNoMask"
              dense
              :placeholder="t('profile.placeholder.pixAcctNo')"
              class="Sys_input_text"
              :readonly="readonly"
              lazy-rules="ondemand"
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  t('message.required', {
                    fieldName: t('profile.label.pixAcctNo'),
                  }),

                (val) => {
                  if (
                    formModel.acctType === 'cpf' &&
                    formModel.certId.length === 14
                  ) {
                    return (
                      formModel.certId
                        .replaceAll('.', '')
                        .replaceAll('-', '') === val ||
                      t('message.pixAccountSameWithCpf')
                    );
                  }

                  if (formModel.acctType === 'email') {
                    return (
                      /^[^@]+@[^a]+/.test(val) || t('message.invalidEmail')
                    );
                  }

                  return true;
                },
              ]"
            >
              <template v-slot:prepend v-if="formModel.acctType === 'phone'">
                <span
                  class="text-white"
                  style="font-size: 0.9rem; padding-bottom: 7px"
                >
                  +{{ MOBILE_COUNTRY_CODE }}
                </span>
              </template>
            </q-input>
          </div>

          <div class="list_input">
            <p class="label text-capitalize">
              {{ t('profile.label.pixAcctName') }}
            </p>
            <q-input
              v-model.trim="formModel.acctName"
              type="text"
              dense
              :readonly="readonly"
              :placeholder="t('profile.placeholder.pixAcctName')"
              class="Sys_input_text"
              lazy-rules="ondemand"
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  t('message.required', {
                    fieldName: t('profile.label.pixAcctName'),
                  }),
              ]"
            />
          </div>

          <div class="list_input list_input_phone">
            <p class="label text-capitalize">
              {{ t('profile.label.contactPhone') }}
            </p>
            <q-input
              v-model.trim="formModel.contactPhone"
              :mask="MOBILE_INPUT_MASK"
              type="text"
              dense
              :readonly="readonly"
              :placeholder="t('profile.placeholder.contactPhone')"
              class="Sys_input_text"
              lazy-rules="ondemand"
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  t('message.required', {
                    fieldName: t('profile.title.contactPhone'),
                  }),
                (val) =>
                  RE_MOBILE_NUMBER.test(val) ||
                  t('account.message.invalidMobile'),
              ]"
            >
              <template v-slot:prepend>
                <span>+{{ MOBILE_COUNTRY_CODE }}</span>
              </template>
            </q-input>
          </div>

          <div class="list_input">
            <p class="label text-capitalize">
              {{ t('profile.label.contactEmail') }}
            </p>
            <q-input
              v-model.trim="formModel.contactEmail"
              type="email"
              dense
              :readonly="readonly"
              :placeholder="t('profile.placeholder.contactEmail')"
              class="Sys_input_text"
              lazy-rules="ondemand"
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  t('message.required', {
                    fieldName: t('profile.title.contactEmail'),
                  }),
              ]"
            />
          </div>

          <div class="list_input">
            <p class="label text-capitalize">
              {{ t('profile.label.cpfCertId') }}
            </p>
            <q-input
              v-model.trim="formModel.certId"
              mask="###.###.###-##"
              type="text"
              :readonly="readonly"
              dense
              :placeholder="t('profile.placeholder.cpfCertId')"
              class="Sys_input_text"
              lazy-rules="ondemand"
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  t('message.required', {
                    fieldName: t('profile.label.cpfCertId'),
                  }),
                (val) =>
                  /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(val) ||
                  t('error.server.invalid_cert_id_format'),
                async (val) => {
                  let exists = await isPixCertIdExists(val);
                  return !exists || t('error.server.cert_id_exists');
                },
              ]"
            />
          </div>
        </div>

        <div class="Sys_Btn_Submit">
          <q-btn
            :label="t('common.submit')"
            :loading="submitting"
            :disable="readonly"
            rounded
            type="submit"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { reactive, toRaw, computed } from 'vue';
import { useI18n } from 'src/boot/i18n';
import { useUserStore } from 'src/store/userStore';
import { useConfigStore } from 'src/store/configStore';
import { useQuasar } from 'quasar';
import { useMutation } from '@vue/apollo-composable';
import { Mutation } from 'src/graphql';
import {
  MOBILE_COUNTRY_CODE,
  MOBILE_INPUT_MASK,
  RE_MOBILE_NUMBER,
} from 'src/utils/constants';
import { isPixCertIdExists } from 'src/api';

const acctTypes = [
  { label: 'CPF', value: 'cpf' },
  // { label: 'CNPJ', value: 'cnpj' },
  // { label: 'PHONE', value: 'phone' },
  // { label: 'EMAIL', value: 'email' },
];

const emit = defineEmits(['submit']);

const userStore = useUserStore();
const configStore = useConfigStore();

const readonly = computed(() => {
  if (!userStore.pixWallet.acctNo) return false;

  switch (configStore.sysConfig.updateBankcardMode) {
    case 'always_allow':
      return false;
    case 'allow_submit':
      return !!userStore.pixWallet.acctNo;
    case 'fixed_after_submit_withdraw':
      return userStore.user.totalApplyWithdrawOrders > 0;
    case 'fixed_after_withdraw_success':
      return userStore.user.totalSuccessWithdrawOrders > 0;
  }

  return false;
});

const formModel = reactive({
  acctType: userStore.pixWallet?.acctType || 'cpf',
  acctName: userStore.pixWallet?.acctName || null,
  acctNo: userStore.pixWallet?.acctNo || null,
  certId: userStore.pixWallet?.certId || null,
  contactPhone: userStore.pixWallet?.contactPhone || null,
  contactEmail: userStore.pixWallet?.contactEmail || null,
});

const { t } = useI18n();
const $q = useQuasar();

const { mutate: updatePixWallet, loading: submitting } = useMutation(
  Mutation.updatePixWallet,
);

const acctNoMask = computed(() => {
  switch (formModel.acctType) {
    case 'cpf':
      return '###########';
    case 'phone':
      return '###########';
    default:
      return '';
  }
});

async function onSubmit() {
  const attrs = toRaw(formModel);
  const { data } = await updatePixWallet({ attrs });

  userStore.setPixWallet(data.updatePixWallet);

  $q.notify({
    message: t('profile.message.pixWalletUpdated'),
    icon: 'mdi-check-circle',
    position: 'top',
    type: 'positive',
  });

  emit('submit');
}
</script>

<style lang="scss" scoped></style>
