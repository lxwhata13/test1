<template>
  <q-header>
    <q-toolbar>
      <q-btn
        flat
        round
        dense
        @click="
          () =>
            configStore.prevRoute ? go(-1) : replace({ name: 'UserCenter' })
        "
        class="icon_left"
      />
      <q-toolbar-title>Pager</q-toolbar-title>
    </q-toolbar>
  </q-header>
  <q-page class="Sys_page">
    <div class="Wallets_one">
      <p>por favor,use o PIX para Pagar：BRL30</p>
    </div>
    <div class="Wallets_qr">
      <ul>
        <li>
          Abra o app com sua chave PIX cadastrada, escolha Pagar com Pix e
          escaneie o QR Codeou copie e cole o código. Este código QR só pode ser
          pago uma vez, se você precisar pagar novamente, solicite novamente
        </li>
        <li><img src="~assets/images/System_Qapp/Pic_13.png" alt="" /></li>
        <li class="Sys_Btn_Submit Sys_Btn_Submit_qr">
          <q-btn type="submit">Copiar código PIX</q-btn>
        </li>
      </ul>
    </div>
    <div class="Wallets_tips">Por favor, pague em 10 minutos.</div>
  </q-page>
</template>

<script setup>
import { reactive, computed, toRaw } from 'vue';
import { useI18n } from 'src/boot/i18n';
import { useRouter } from 'vue-router';
import { useUserStore } from 'src/store/userStore';
import { useConfigStore } from 'src/store/configStore';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { Query, Mutation } from 'src/graphql';

const { t } = useI18n();
const { go, replace } = useRouter();

const userStore = useUserStore();
const configStore = useConfigStore();

const { result } = useQuery(Query.listRechargeBonuses);

const bonuses = computed(() => {
  return result.value?.listRechargeBonuses ?? [];
});

const formModel = reactive({
  channelId:
    configStore.sysConfig.choosePayChannelMethod === 'manual'
      ? configStore.payChannels[0].id
      : null,
  amount: null,
  acceptRechargeBonus: true,
  returnUrl: `${window.location.protocol}//${window.location.host}/`,
});

const { result: bonusResult } = useQuery(Query.calcRechargeBonus, formModel);

const extraBonus = computed(() => {
  return bonusResult.value?.calcRechargeBonus ?? 0;
});

const { mutate: channelRecharge } = useMutation(Mutation.channelRecharge);

const handleSubmit = async () => {
  const variables = toRaw(formModel);
  const { data } = await channelRecharge({
    ...variables,
    amount: Math.round(variables.amount * 100),
  });

  location.href = data.channelRecharge.redirectUrl;
};
</script>

<style lang="scss" scoped></style>
