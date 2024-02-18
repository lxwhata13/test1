<template>
  <q-page class="Sys_page Sys_page_Bankcard">
    <q-form @submit="onSubmit">
      <div class="profile_form">
        <div class="profile_form_list">
          <div class="list_input list_input_select">
            <p class="label text-capitalize">
              {{ $t("profile.label.selectBank") }}
            </p>
            <q-select
              class="profile_select"
              v-model="formModel.bankCode"
              :options="banks"
              :placeholder="t('profile.placeholder.selectBank')"
              behavior="menu"
              lazy-rules="ondemand"
              emit-value
              map-options
              :popup-content-style="{ backgroundColor: '#111F41' }"
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  $t('message.required', { fieldName: $t('profile.label.bank') }),
              ]"
            />
          </div>
          <div class="list_input">
            <p class="label text-capitalize">
              {{ t("profile.label.bankAccountName") }}
            </p>
            <q-input
              class="Sys_input_text"
              autocorrect="off"
              autocapitalize="off"
              autocomplete="off"
              spellcheck="false"
              dense
              v-model="formModel.acctName"
              :placeholder="t('profile.placeholder.bankAccountName')"
              lazy-rules="ondemand"
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  $t('message.required', {
                    fieldName: $t('profile.label.bankAccountName'),
                  }),
              ]"
            />
          </div>
          <div class="list_input">
            <p class="label text-capitalize">
              {{ t("profile.label.bankAccountNo") }}
            </p>
            <q-input
              class="Sys_input_text"
              autocorrect="off"
              autocapitalize="off"
              autocomplete="off"
              spellcheck="false"
              v-model="formModel.acctNo"
              :placeholder="t('profile.placeholder.bankAccountNo')"
              lazy-rules="ondemand"
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  $t('message.required', {
                    fieldName: $t('profile.label.bankAccountNo'),
                  }),
              ]"
            />
          </div>
          <div class="list_input list_input_phone">
            <p class="label text-capitalize">
              {{ t("profile.label.contactPhone") }}
            </p>
            <q-input
              class="Sys_input_text"
              :mask="MOBILE_INPUT_MASK"
              v-model="formModel.contactPhone"
              type="text"
              dense
              autocorrect="off"
              autocapitalize="off"
              autocomplete="off"
              spellcheck="false"
              :placeholder="t('profile.placeholder.contactPhone')"
              lazy-rules="ondemand"
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  $t('message.required', {
                    fieldName: $t('profile.label.contactPhone'),
                  }),
                (val) =>
                  RE_MOBILE_NUMBER.test(val) || $t('account.message.invalidMobile'),
              ]"
            >
              <template v-slot:prepend>
                <span>+{{ MOBILE_COUNTRY_CODE }}</span>
              </template>
            </q-input>
          </div>

          <div class="list_input">
            <p class="label text-capitalize">
              {{ t("profile.label.contactEmail") }}
            </p>
            <q-input
              class="Sys_input_text"
              v-model="formModel.contactEmail"
              autocorrect="off"
              autocapitalize="off"
              autocomplete="off"
              spellcheck="false"
              :placeholder="t('profile.placeholder.contactEmail')"
              lazy-rules="ondemand"
              type="email"
              dense
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  $t('message.required', {
                    fieldName: $t('profile.label.contactEmail'),
                  }),
                (val) => RE_EMAIL.test(val) || $t('message.invalidEmail'),
              ]"
            />
          </div>

          <div class="Sys_Btn_Submit">
            <q-btn
              :label="$t('common.submit')"
              :loading="submitting"
              :disable="readonly"
              rounded
              type="submit"
            />
          </div>
        </div>
      </div>
    </q-form>
    <StickyCustomerService />
  </q-page>
</template>

<script setup>
import {
  MOBILE_COUNTRY_CODE,
  MOBILE_INPUT_MASK,
  RE_MOBILE_NUMBER,
  RE_EMAIL,
} from "src/utils/constants";
import { reactive, toRaw } from "vue";
import { useI18n } from "src/boot/i18n";
import { useUserStore } from "src/store/userStore";
import { useQuasar } from "quasar";
import { useMutation } from "@vue/apollo-composable";
import { Mutation } from "src/graphql";
import StickyCustomerService from "src/components/StickyCustomerService.vue";

const userStore = useUserStore();
const { t } = useI18n();
const $q = useQuasar();

const formModel = reactive({
  bankCode: userStore.bankcard?.bankCode,
  acctName: userStore.bankcard?.acctName,
  acctNo: userStore.bankcard?.acctNo,
  contactPhone: userStore.bankcard?.contactPhone,
  contactEmail: userStore.bankcard?.contactEmail,
});

const banks = [
  {
    value: "2001",
    label: "BANXICO",
  },
  {
    value: "37006",
    label: "BANCOMEXT",
  },
  {
    value: "37009",
    label: "BANOBRAS",
  },
  {
    value: "37019",
    label: "BANJERCITO",
  },
  {
    value: "37135",
    label: "NAFIN",
  },
  {
    value: "37166",
    label: "BaBien",
  },
  {
    value: "37168",
    label: "HIPOTECARIA FED",
  },
  {
    value: "40002",
    label: "BANAMEX",
  },
  {
    value: "40012",
    label: "BBVA BANCOMER",
  },
  {
    value: "40014",
    label: "SANTANDER",
  },
  {
    value: "40021",
    label: "HSBC",
  },
  {
    value: "40030",
    label: "BAJIO",
  },
  {
    value: "40036",
    label: "INBURSA",
  },
  {
    value: "40042",
    label: "MIFEL",
  },
  {
    value: "40044",
    label: "SCOTIABANK",
  },
  {
    value: "40058",
    label: "BANREGIO",
  },
  {
    value: "40059",
    label: "INVEX",
  },
  {
    value: "40060",
    label: "BANSI",
  },
  {
    value: "40062",
    label: "AFIRME",
  },
  {
    value: "40072",
    label: "BANORTE",
  },
  {
    value: "40106",
    label: "BANK OF AMERICA",
  },
  {
    value: "40108",
    label: "MUFG",
  },
  {
    value: "40110",
    label: "JP MORGAN",
  },
  {
    value: "40112",
    label: "BMONEX",
  },
  {
    value: "40113",
    label: "VE POR MAS",
  },
  {
    value: "40126",
    label: "CREDIT SUISSE",
  },
  {
    value: "40127",
    label: "AZTECA",
  },
  {
    value: "40128",
    label: "AUTOFIN",
  },
  {
    value: "40129",
    label: "BARCLAYS",
  },
  {
    value: "40130",
    label: "COMPARTAMOS",
  },
  {
    value: "40132",
    label: "MULTIVA BANCO",
  },
  {
    value: "40133",
    label: "ACTINVER",
  },
  {
    value: "40136",
    label: "INTERCAM BANCO",
  },
  {
    value: "40137",
    label: "BANCOPPEL",
  },
  {
    value: "40138",
    label: "ABC CAPITAL",
  },
  {
    value: "40140",
    label: "CONSUBANCO",
  },
  {
    value: "40141",
    label: "VOLKSWAGEN",
  },
  {
    value: "40143",
    label: "CIBANCO",
  },
  {
    value: "40145",
    label: "BBASE",
  },
  {
    value: "40147",
    label: "BANKAOOL",
  },
  {
    value: "40148",
    label: "PAGATODO",
  },
  {
    value: "40150",
    label: "INMOBILIARIO",
  },
  {
    value: "40151",
    label: "DONDE",
  },
  {
    value: "40152",
    label: "BANCREA",
  },
  {
    value: "40154",
    label: "BANCO FINTERRA",
  },
  {
    value: "40155",
    label: "ICBC",
  },
  {
    value: "40156",
    label: "SABADELL",
  },
  {
    value: "40157",
    label: "SHINHAN",
  },
  {
    value: "40158",
    label: "MIZUHO BANK",
  },
  {
    value: "40160",
    label: "BANCO S3",
  },
  {
    value: "90600",
    label: "MONEXCB",
  },
  {
    value: "90601",
    label: "GBM",
  },
  {
    value: "90602",
    label: "MASARI",
  },
  {
    value: "90605",
    label: "VALUE",
  },
  {
    value: "90608",
    label: "VECTOR",
  },
  {
    value: "90613",
    label: "MULTIVA CBOLSA",
  },
  {
    value: "90616",
    label: "FINAMEX",
  },
  {
    value: "90617",
    label: "VALMEX",
  },
  {
    value: "90620",
    label: "PROFUTURO",
  },
  {
    value: "90630",
    label: "CB INTERCAM",
  },
  {
    value: "90631",
    label: "CI BOLSA",
  },
  {
    value: "90634",
    label: "FINCOMUN",
  },
  {
    value: "90638",
    label: "AKALA",
  },
  {
    value: "90646",
    label: "STP",
  },
  {
    value: "90648",
    label: "TACTIV CB",
  },
  {
    value: "90652",
    label: "CREDICAPITAL",
  },
  {
    value: "90653",
    label: "KUSPIT",
  },
  {
    value: "90656",
    label: "UNAGRA",
  },
  {
    value: "90659",
    label: "ASP INTEGRA OPC",
  },
  {
    value: "90670",
    label: "LIBERTAD",
  },
  {
    value: "90677",
    label: "CAJA POP MEXICA",
  },
  {
    value: "90680",
    label: "CRISTOBAL COLON",
  },
  {
    value: "90683",
    label: "CAJA TELEFONIST",
  },
  {
    value: "90685",
    label: "FONDO (FIRA)",
  },
  {
    value: "90686",
    label: "INVERCAP",
  },
  {
    value: "90689",
    label: "FOMPED",
  },
  {
    value: "90706",
    label: "ARCUS",
  },
  {
    value: "90901",
    label: "CLS",
  },
  {
    value: "90902",
    label: "INDEVAL",
  },
  {
    value: "90903",
    label: "CoDi Valida",
  },
];

const emit = defineEmits(["submit"]);
const { mutate: updateBankcard, loading: submitting } = useMutation(
  Mutation.updateBankcard
);

async function onSubmit() {
  const attrs = toRaw(formModel);
  const bankInfo = banks.find(({ value }) => value === attrs.bankCode);
  const { data } = await updateBankcard({
    attrs: {
      ...attrs,
      bankName: bankInfo.label,
    },
  });

  userStore.setBankcard(data.updateBankcard);

  $q.notify({
    message: t("profile.message.bankcardUpdated"),
    icon: "mdi-check-circle",
    position: "top",
    type: "positive",
  });

  emit("submit");
}
</script>

<style lang="scss" scoped></style>
