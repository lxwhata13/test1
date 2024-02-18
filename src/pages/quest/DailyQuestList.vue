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
        <q-toolbar-title>{{ $t('routes.title.DailyQuestList') }}</q-toolbar-title>
        </q-toolbar>
    </q-header>
    <q-page class="Sys_page">
        <div class="header">
            <div class="box box_two">
                <p class="active">
                <router-link :to="{ name: 'DailyQuestList' }" replace>
                    {{ t('quest.title.dailyQuests') }}
                </router-link>
                </p>
                <p>
                <router-link :to="{ name: 'PeriodicQuestList' }" replace>
                    {{ t('quest.title.periodicQuests') }}
                </router-link>
                </p>
            </div>
        </div>

        <div class="content">
            <div class="q-pa-md scroll-y hide-scrollbar">
                <q-infinite-scroll class="list">
                    <div class="No_data" v-if="!loading && records.length == 0">
                        <p>&nbsp;</p>
                        {{ t('common.noData') }}
                    </div>
                    
                    <div v-for="rc in records" :key="rc.id" class="record">
                        <div :class="{icon_promotion: rc.value.conditionType == 'PROMOTION', 
                                        icon_betting: rc.value.conditionType == 'BETTING',
                                        icon_recharge: rc.value.conditionType == 'RECHARGE'}"></div>

                        <div class="mid">                                
                            <div class="top">
                                <p class="percent" v-if="rc.value.levels.length > 1">({{ `${Math.min(rc.value.curLevel + 1, rc.value.levels.length)}/${rc.value.levels.length}` }})</p>
                                <p class="title">{{rc.value.title}}</p>
                                <div v-if="rc.value.conditionType=='BETTING'" class="info" @click="showGamesInfo(rc.value)"></div>
                            </div>
                            <div>
                                <div v-html="rc.value.description"></div>
                            </div>
                            <div class="down">
                                <span>{{ calcPercentTxt(rc.value) }}</span>
                                <p>
                                    <i :style="`width: ${rc.value.curPercent}%`"></i>
                                </p>
                            </div>
                        </div>
                        <div class="right">
                            <div class="bonus"><p>{{t('quest.title.bonus')}}</p><p>{{` ${CURRENCY_SYMBOL}${rc.value.bonus/100}`}}</p></div>
                            <q-btn :class="{btn_receive: rc.value.curPercent < 100 ,
                                            btn_receive_active: rc.value.curPercent >= 100 && rc.value.status != 'RECEIVED',
                                            btn_received:rc.value.status == 'RECEIVED' }" @click="onClickReciveAwards(rc)">
                                <p>{{rc.value.status == "RECEIVED" ? t('quest.title.received') : rc.value.curPercent >= 100 ? t('quest.title.receive') : t('quest.title.unfinish')}}</p>
                            </q-btn>
                        </div>
                        
                    </div>
                    

                    <template v-slot:loading v-if="loading">
                        <div class="row justify-center q-my-md">
                        <q-spinner-dots color="primary" size="40px" />
                        </div>
                    </template>
                </q-infinite-scroll>
            </div>
        </div>
    </q-page>
</template>
<script setup>
import { computed,  ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar, throttle } from 'quasar';
import { useQuery } from '@vue/apollo-composable';
import { useI18n } from 'src/boot/i18n';
import { useUserStore } from 'src/store/userStore';
import { useConfigStore } from 'src/store/configStore';
import { Query, Mutation } from 'src/graphql';
import { apolloClient } from 'src/apolloClient';
import { CURRENCY_SYMBOL } from 'src/utils/constants';

const userStore = useUserStore();
const configStore = useConfigStore();
const { replace, go } = useRouter();
const { t } = useI18n();
const $q = useQuasar();

const { result, loading, refetch: refetchList } = useQuery(
    Query.listActivedQuestRecords,
    {
        variables: {},
        fetchPolicy: 'network-only',
    },
  
);

const records = computed(() => {
    let ret = [];
    let val = result.value?.listActivedQuestRecords;
    if (!val) return ret;

    let cfgs = val.configs;
    let dailies = val.dailies;
    
    for (let i = 0; i < cfgs.length; i++) {
        let record = ref({ counters: 0, curLevel: 0, status: 'RUNNING', curPercent: 0, bonus: 0 })
        
        let cfg = cfgs[i];
        for (var k in cfg) {
            record.value[k] = cfg[k];
        }
        
        record.value.bonus = calcBonus(record.value);
        if (cfg.kind == "DAILY") {
            for (let j = 0; j < dailies.length; j++) {
                let rc = dailies[j];
                if (rc.questId == cfg.id) {
                    record.value.counters = rc.counters;
                    record.value.curLevel = rc.curLevel;
                    record.value.status = rc.status;
                    record.value.bonus = calcBonus(record.value);
                    record.value.curPercent = calcPercent(record.value);
                    break;
                }
            }
            ret.push(record);
        }
    }

    return ret;
} );

const calcPercentTxt = (rc) => {
    let idx = rc.curLevel;
    let counters = rc.counters;
    let request = 0;
    if (idx >= rc.levels.length) {
        request = rc.levels[rc.levels.length - 1].request;
        counters = request;
    } else {
        request = rc.levels[idx].request;
    }

    counters = Math.min(counters, request);

    switch (rc.conditionType ) {
        case "PROMOTION":
            return `${counters} / ${request}`;
        case "BETTING":
            return `${counters/100} / ${request/100}`;
        case "RECHARGE":
            return `${counters / 100} / ${request / 100}`;
        default:
            return "";
    }
}

const calcPercent = (rc) => {
    let idx = rc.curLevel;
    if (idx >= rc.levels.length) {
        return 100;
    }

    let lv = rc.levels[idx];
    let p = +((rc.counters / lv.request * 100).toFixed(2));
    return Math.min(100, p);
}

const calcBonus = (rc => {
    let idx = rc.curLevel;
    if (idx >= rc.levels.length) {
        return 0;
    }

    let lv = rc.levels[idx];
    return lv.bonus;
})

const showGamesInfo = (rc) => {
    let gameNames = rc.includeGameIds.map((id) => {
        let game = configStore.games[id];
        if(game){
            return game.name;
        }
        return "";
    })
    $q.dialog({
        title: t('common.game'),
        message: `${t('common.game')}: ${gameNames.join(',')}`,
        persistent: true,
    })
}

const onClickReciveAwards = async (rc) => {
    if (rc.value.curPercent < 100 || rc.value.status == "RECEIVED") {
        return;
    }

    try {
        let {
            data: {redeemDailyQuestBonus: { user, record }} 
        } = await apolloClient.mutate({
            mutation: Mutation.redeemDailyQuestBonus,
            variables: { attrs: { quest_id: rc.value.id, level: rc.value.curLevel } },
            fetchPolicy: 'network-only',
        });


        rc.value.status = record.status;
        rc.value.curLevel = record.curLevel;
        rc.value.curPercent = calcPercent(rc.value);

        userStore.user.balance = user.balance;
        userStore.user.withdrawPoint = user.withdrawPoint
        userStore.user.effectiveWithdrawPoint = user.effectiveWithdrawPoint
        userStore.user.requiredWithdrawPoint= user.requiredWithdrawPoint
        userStore.user.requiredWithdrawPointFix = user.requiredWithdrawPointFix


        //refetchList();

        $q.notify({
            message: t('quest.message.receive_success'),
            timeout: 1000,
            icon: 'mdi-information',
            position: 'top',
            type: 'positive',
        });
        
    } catch (e) {
        console.log("error:", e);
    }

}

if(records.value.length>0){
    refetchList();
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  padding: 16px;
  .box {
    position: relative;
    width: 100%;
    display: flex;
    background-color: rgba(0, 0, 0, 0.1);
    box-shadow:
      0px -1px 1px rgba(255, 255, 255, 0.2) inset,
      0px 1px 3px rgba(0, 0, 0, 0.5) inset;
    border-radius: 10px;
    padding: 5px;
    p {
      position: relative;
      z-index: 3;
      flex: auto;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9);
      border-radius: 10px;
      a {
        display: block;
        width: 100%;
        text-align: center;
        color: #eee;
        padding: 8px 0px;
      }
      .q-btn {
        width: 100%;
        text-align: center;

        &::before,
        .q-focus-helper {
          display: none;
        }
        .q-btn__content {
          padding: 8px 0px;
        }
      }
    }
    .active {
      background:
        url(~assets/AppSkinD/images/System/Bg_02.png) no-repeat center top /
          100% auto,
        linear-gradient(#7868b7, #4a508b 49%, #3c417b 50%, #3a3f75);
      box-shadow:
        0px 1px 1px rgba(255, 255, 255, 0.1) inset,
        1px 1px 3px rgba(0, 0, 0, 0.5);
    }
  }
  .box_two {
    p {
      width: 50%;
    }
  }
  .box_three p {
    width: 33.33%;
  }
}

.content {
    display: flex;
    padding: 0px 0px 4px 0px;
    width: calc(100% - 32px);
    height: calc(100% - 148px);
    position: absolute;
    left: 15px;
    right: 15px;
    z-index: 1;

    .q-pa-md {
        width: 100%;
        z-index: 3;
        padding: 0px;
    }

    .list{
        .record {
            height: 98px;
            width: calc(100% - 2px);
            position: relative;
            border-radius: 8px;
            margin-top: 16px;
            padding: 5px 5px;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
            background: linear-gradient(to bottom, #3d4379, #31335a);
            box-shadow:
            1px 1px 1px rgba(255, 255, 255, 0.1) inset,
            1px 1px 3px rgba(0, 0, 0, 0.5);
            display: grid;
            grid-template-columns: 68px auto 88px;
            align-items: center;


            .icon_promotion{
                margin-left: 5px;
                width: 48px;
                height: 48px;
                background: url(~assets/AppSkinD/images/System/Icon_47.png) no-repeat center top /
                100% auto; 
            }

            .icon_betting{
                margin-left: 5px;
                width: 48px;
                height: 48px;
                background: url(~assets/AppSkinD/images/Footer/menu_01_on.png) no-repeat center top /
                    100% auto; 
            }

            .icon_recharge{
                margin-left: 5px;
                width: 48px;
                height: 48px;
                
            }


            .mid{
                display: grid;
                grid-template-rows: 28px auto 28px;

                .top{
                    display: flex;
                    justify-items: flex-start;
                    align-items: flex-center;

                    .percent{
                        width: 48px;
                        line-height: 24px;
                        vertical-align: middle;
                    }

                    .title{
                        line-height: 24px;
                        vertical-align: middle;
                    }
                    .info{
                        width: 24px;
                        height: 24px;
                        margin-left: 8px;
                        background: url(~assets/AppSkinD/images/System/Icon_54.png) no-repeat center top /
                        100% auto; 
                    }
                }

         
                .down{
                    text-align: right;
                    span{
                        padding-right: 10px;
                    }
                    p {
                        position: relative;
                        width: 95%;
                        height: 8px;
                        background: rgba(255, 255, 255, 0.1);
                        border-radius: 8px;
                        
                        i {
                            position: absolute;
                            display: inline-block;
                            height: 8px;
                            border-radius: 8px;
                            background-color: #e5e5e5;
                            background: linear-gradient(#eee, #6bc602);
                            left: 0px;
                            top: 0px;
                        }
                    }
                }
            }

            .right{
                display: grid;
                grid-template-rows: 38px auto;
                .bonus{
                    margin-left: -10px;
                    display: flex;
                    width: 100%;
                    align-items: flex-start;
                    :nth-child(1){
                        width: 50px;
                    }
                    :nth-child(2){
                        margin-left: 3px;
                        color :rgb(220, 140, 0);
                    }
                }
                
                .btn_receive{
                    width: 88px;
                    height: 38px;
                    border-radius: 8px;
                    background: linear-gradient(to bottom, #b7b7b7aa, #60606044);
                    border-top: 1px solid #ffffff88;
                    box-shadow: 0px 1px 2px #00000066;
                }

                .btn_receive_active{
                    width: 88px;
                    height: 38px;
                    border-radius: 8px;
                    background: linear-gradient(to bottom, #67f39aaa, #4bb87344);
                    border-top: 1px solid #ffffffbb;
                    box-shadow: 0px 1px 2px #00000066;
                }

                .btn_received{
                    width: 88px;
                    height: 38px;
                    background: transparent;
                }
            }
        }
    }


}
</style>