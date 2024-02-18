<template>
  <q-page class="Sys_page">
    <div class="Location Pc">
      <ul>
        <li>
          <q-btn flat round dense @click="$router.go(-1)" />
        </li>
        <li>{{ t("routes.title.Vip") }}</li>
      </ul>
    </div>
    <div class="user_one vip_one Mo">
      <ul>
        <li>
          <q-img src="~assets/AppSkinD/upload/Head_00.9cdd4cb7.png" />
        </li>
        <li>
          <p>tester</p>
          <p>ID: 262367</p>
        </li>
      </ul>
    </div>
    <div class="vip_two">
      <div class="vip_two_box">
        <ul>
          <li><img src="~assets/AppSkinD/images/Vip/VIP0.png" alt="" /></li>
          <li>{{ $t("vip.slogan", { level: 1 }) }}</li>
          <li>
            <p class="text-capitalize">{{ $t("vip.depositAmount") }}</p>
            <p>10 / 100</p>
            <p>
              <span style="width: 10%"></span>
            </p>
          </li>
          <li>
            <p class="text-capitalize">{{ $t("vip.codificationVolume") }}</p>
            <p>1 / 5</p>
            <p>
              <span style="width: 20%"></span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <!--  -->
    <div class="VipBox">
      <div class="vip_title text-capitalize">
        {{ $t("vip.title.vipLevelReward") }}
      </div>
      <div class="TabGames_one vip-three">
        <q-tabs v-model="tab" inline-label outside-arrows mobile-arrows>
          <q-tab dark>
            <ol class="ul_open">
              <li>
                <p><img src="~assets/AppSkinD/images/Vip/level_00.png" /></p>
                <p>MXN 0</p>
              </li>
              <li>&nbsp;</li>
            </ol>
          </q-tab>
          <q-tab dark>
            <ol class="ul_open">
              <li>
                <p><img src="~assets/AppSkinD/images/Vip/level_01.png" /></p>
                <p>MXN 5</p>
              </li>
              <li>&nbsp;</li>
            </ol>
          </q-tab>
          <q-tab dark>
            <ol class="ul_active">
              <li>
                <p><img src="~assets/AppSkinD/images/Vip/level_02.png" /></p>
                <p>MXN 10</p>
              </li>
              <li>&nbsp;</li>
            </ol>
          </q-tab>
          <q-tab dark>
            <ol>
              <li>
                <p><img src="~assets/AppSkinD/images/Vip/level_03.png" /></p>
                <p>MXN 20</p>
              </li>
              <li>&nbsp;</li>
            </ol>
          </q-tab>
          <q-tab dark>
            <ol>
              <li>
                <p><img src="~assets/AppSkinD/images/Vip/level_04.png" /></p>
                <p>MXN 50</p>
              </li>
              <li>&nbsp;</li>
            </ol>
          </q-tab>
          <q-tab dark>
            <ol>
              <li>
                <p><img src="~assets/AppSkinD/images/Vip/level_05.png" /></p>
                <p>MXN 100</p>
              </li>
              <li>&nbsp;</li>
            </ol>
          </q-tab>
          <q-tab dark>
            <ol>
              <li>
                <p><img src="~assets/AppSkinD/images/Vip/level_06.png" /></p>
                <p>MXN 500</p>
              </li>
              <li>&nbsp;</li>
            </ol>
          </q-tab>
          <q-tab dark>
            <ol>
              <li>
                <p><img src="~assets/AppSkinD/images/Vip/level_07.png" /></p>
                <p>MXN 2000</p>
              </li>
              <li>&nbsp;</li>
            </ol>
          </q-tab>
          <q-tab dark>
            <ol>
              <li>
                <p><img src="~assets/AppSkinD/images/Vip/level_08.png" /></p>
                <p>MXN 5000</p>
              </li>
              <li>&nbsp;</li>
            </ol>
          </q-tab>
          <q-tab dark>
            <ol>
              <li>
                <p><img src="~assets/AppSkinD/images/Vip/level_09.png" /></p>
                <p>MXN 8000</p>
              </li>
              <li>&nbsp;</li>
            </ol>
          </q-tab>
          <q-tab dark>
            <ol>
              <li>
                <p><img src="~assets/AppSkinD/images/Vip/level_10.png" /></p>
                <p>MXN 10000</p>
              </li>
              <li>&nbsp;</li>
            </ol>
          </q-tab>
        </q-tabs>
      </div>
    </div>
    <!--  -->
    <div class="VipBox">
      <div class="vip_title">{{ $t("vip.title.allVips") }}</div>
      <div class="TabGames_one vip_four">
        <q-tabs v-model="tab" inline-label outside-arrows mobile-arrows>
          <q-tab>
            <div class="vip_four_slide">
              <div class="one">
                <img src="~assets/AppSkinD/images/Vip/level_00.png" />
                Miembro VIP 0
              </div>
              <div class="title text-capitalize">
                {{ $t("vip.title.updateCondition") }}:
              </div>
              <div class="two">
                <ul>
                  <li class="text-capitalize">{{ $t("vip.depositAmount") }}</li>
                  <li>MXN 0</li>
                </ul>
                <ul>
                  <li class="text-capitalize">
                    {{ $t("vip.codificationVolume") }}
                  </li>
                  <li>MXN 0</li>
                </ul>
              </div>
              <div class="title text-capitalize">
                {{ $t("vip.title.levelPrivileges") }}:
              </div>
              <div class="text">
                <p>Número de Retiros: 1 veces/día</p>
                <p>Cantidad Máxima de Retiro: MXN 500</p>
                <p>Cargo por Retiro: 5 %</p>
              </div>
              <div class="title text-capitalize">Recarga Garantizada para Miembros VIP: </div>
              <div class="text"> Días restantes para recargar en Reales Brasileños</div>
            </div>
          </q-tab>
          
          <q-tab>
            <div class="vip_four_slide">
              <div class="one">
                <img src="~assets/AppSkinD/images/Vip/level_01.png" />
                Miembro VIP 1
              </div>
              <div class="title text-capitalize">
                {{ $t("vip.title.updateCondition") }}:
              </div>
              <div class="two">
                <ul>
                  <li class="text-capitalize">{{ $t("vip.depositAmount") }}</li>
                  <li>MXN 100</li>
                </ul>
                <ul>
                  <li class="text-capitalize">
                    {{ $t("vip.codificationVolume") }}
                  </li>
                  <li>MXN 500</li>
                </ul>
              </div>
              <div class="title text-capitalize">
                {{ $t("vip.title.levelPrivileges") }}:
              </div>
              <div class="text">
                <p>Número de Retiros: 2 veces/día</p>
                <p>Cantidad Máxima de Retiro: MXN 1500</p>
                <p>Cargo por Retiro: 4 %</p>
              </div>
              <div class="title text-capitalize">Recarga Garantizada para Miembros VIP: </div>
              <div class="text"> Días restantes para recargar en Reales Brasileños</div>
            </div>
          </q-tab>
          
          <q-tab>
            <div class="vip_four_slide">
              <div class="one">
                <img src="~assets/AppSkinD/images/Vip/level_02.png" />
                Miembro VIP 2
              </div>
              <div class="title text-capitalize">
                {{ $t("vip.title.updateCondition") }}:
              </div>
              <div class="two">
                <ul>
                  <li class="text-capitalize">{{ $t("vip.depositAmount") }}</li>
                  <li>MXN 500</li>
                </ul>
                <ul>
                  <li class="text-capitalize">
                    {{ $t("vip.codificationVolume") }}
                  </li>
                  <li>MXN 300</li>
                </ul>
              </div>
              <div class="title text-capitalize">
                {{ $t("vip.title.levelPrivileges") }}:
              </div>
              <div class="text">
                <p>Número de Retiros: 2 veces/día</p>
                <p>Cantidad Máxima de Retiro: MXN 3000</p>
                <p>Cargo por Retiro: 4 %</p>
              </div>
              <div class="title text-capitalize">Recarga Garantizada para Miembros VIP: </div>
              <div class="text"> Días restantes para recargar en Reales Brasileños</div>
            </div>
          </q-tab>
          
          <q-tab>
            <div class="vip_four_slide">
              <div class="one">
                <img src="~assets/AppSkinD/images/Vip/level_03.png" />
                Miembro VIP 3
              </div>
              <div class="title text-capitalize">
                {{ $t("vip.title.updateCondition") }}:
              </div>
              <div class="two">
                <ul>
                  <li class="text-capitalize">{{ $t("vip.depositAmount") }}</li>
                  <li>MXN 2000</li>
                </ul>
                <ul>
                  <li class="text-capitalize">
                    {{ $t("vip.codificationVolume") }}
                  </li>
                  <li>MXN 20000</li>
                </ul>
              </div>
              <div class="title text-capitalize">
                {{ $t("vip.title.levelPrivileges") }}:
              </div>
              <div class="text">
                <p>Número de Retiros: 2 veces/día</p>
                <p>Cantidad Máxima de Retiro: MXN 5000</p>
                <p>Cargo por Retiro: 4 %</p>
              </div>
              <div class="title text-capitalize">Recarga Garantizada para Miembros VIP: </div>
              <div class="text"> Días restantes para recargar en Reales Brasileños</div>
            </div>
          </q-tab>
          
          <q-tab>
            <div class="vip_four_slide">
              <div class="one">
                <img src="~assets/AppSkinD/images/Vip/level_04.png" />
                Miembro VIP 4
              </div>
              <div class="title text-capitalize">
                {{ $t("vip.title.updateCondition") }}:
              </div>
              <div class="two">
                <ul>
                  <li class="text-capitalize">{{ $t("vip.depositAmount") }}</li>
                  <li>MXN 5000</li>
                </ul>
                <ul>
                  <li class="text-capitalize">
                    {{ $t("vip.codificationVolume") }}
                  </li>
                  <li>MXN 50000</li>
                </ul>
              </div>
              <div class="title text-capitalize">
                {{ $t("vip.title.levelPrivileges") }}:
              </div>
              <div class="text">
                <p>Número de Retiros: 3 veces/día</p>
                <p>Cantidad Máxima de Retiro: MXN 5000</p>
                <p>Cargo por Retiro: 3.5 %</p>
              </div>
              <div class="title text-capitalize">Recarga Garantizada para Miembros VIP: </div>
              <div class="text"> Días restantes para recargar en Reales Brasileños</div>
            </div>
          </q-tab>
          
          <q-tab>
            <div class="vip_four_slide">
              <div class="one">
                <img src="~assets/AppSkinD/images/Vip/level_05.png" />
                Miembro VIP 5
              </div>
              <div class="title text-capitalize">
                {{ $t("vip.title.updateCondition") }}:
              </div>
              <div class="two">
                <ul>
                  <li class="text-capitalize">{{ $t("vip.depositAmount") }}</li>
                  <li>MXN 20000</li>
                </ul>
                <ul>
                  <li class="text-capitalize">
                    {{ $t("vip.codificationVolume") }}
                  </li>
                  <li>MXN 200000</li>
                </ul>
              </div>
              <div class="title text-capitalize">
                {{ $t("vip.title.levelPrivileges") }}:
              </div>
              <div class="text">
                <p>Número de Retiros: 3 veces/día</p>
                <p>Cantidad Máxima de Retiro: MXN 5000</p>
                <p>Cargo por Retiro: 3.5 %</p>
              </div>
              <div class="title text-capitalize">Recarga Garantizada para Miembros VIP: </div>
              <div class="text"> Días restantes para recargar en Reales Brasileños</div>
            </div>
          </q-tab>
          
          <q-tab>
            <div class="vip_four_slide">
              <div class="one">
                <img src="~assets/AppSkinD/images/Vip/level_06.png" />
                Miembro VIP 6
              </div>
              <div class="title text-capitalize">
                {{ $t("vip.title.updateCondition") }}:
              </div>
              <div class="two">
                <ul>
                  <li class="text-capitalize">{{ $t("vip.depositAmount") }}</li>
                  <li>MXN 50000</li>
                </ul>
                <ul>
                  <li class="text-capitalize">
                    {{ $t("vip.codificationVolume") }}
                  </li>
                  <li>MXN 500000</li>
                </ul>
              </div>
              <div class="title text-capitalize">
                {{ $t("vip.title.levelPrivileges") }}:
              </div>
              <div class="text">
                <p>Número de Retiros: 3 veces/día</p>
                <p>Cantidad Máxima de Retiro: MXN 1000</p>
                <p>Cargo por Retiro: 3.5 %</p>
              </div>
              <div class="title text-capitalize">Recarga Garantizada para Miembros VIP: </div>
              <div class="text"> Días restantes para recargar en Reales Brasileños</div>
            </div>
          </q-tab>
          
          <q-tab>
            <div class="vip_four_slide">
              <div class="one">
                <img src="~assets/AppSkinD/images/Vip/level_07.png" />
                Miembro VIP 7
              </div>
              <div class="title text-capitalize">
                {{ $t("vip.title.updateCondition") }}:
              </div>
              <div class="two">
                <ul>
                  <li class="text-capitalize">{{ $t("vip.depositAmount") }}</li>
                  <li>MXN 100000</li>
                </ul>
                <ul>
                  <li class="text-capitalize">
                    {{ $t("vip.codificationVolume") }}
                  </li>
                  <li>MXN 1000000</li>
                </ul>
              </div>
              <div class="title text-capitalize">
                {{ $t("vip.title.levelPrivileges") }}:
              </div>
              <div class="text">
                <p>Número de Retiros: 4 veces/día</p>
                <p>Cantidad Máxima de Retiro: MXN 1000</p>
                <p>Cargo por Retiro: 3.5 %</p>
              </div>
              <div class="title text-capitalize">Recarga Garantizada para Miembros VIP: </div>
              <div class="text"> Días restantes para recargar en Reales Brasileños</div>
            </div>
          </q-tab>
          
          <q-tab>
            <div class="vip_four_slide">
              <div class="one">
                <img src="~assets/AppSkinD/images/Vip/level_08.png" />
                Miembro VIP 8
              </div>
              <div class="title text-capitalize">
                {{ $t("vip.title.updateCondition") }}:
              </div>
              <div class="two">
                <ul>
                  <li class="text-capitalize">{{ $t("vip.depositAmount") }}</li>
                  <li>MXN 500000</li>
                </ul>
                <ul>
                  <li class="text-capitalize">
                    {{ $t("vip.codificationVolume") }}
                  </li>
                  <li>MXN 5000000</li>
                </ul>
              </div>
              <div class="title text-capitalize">
                {{ $t("vip.title.levelPrivileges") }}:
              </div>
              <div class="text">
                <p>Número de Retiros: 4 veces/día</p>
                <p>Cantidad Máxima de Retiro: MXN 1000</p>
                <p>Cargo por Retiro: 3 %</p>
              </div>
              <div class="title text-capitalize">Recarga Garantizada para Miembros VIP: </div>
              <div class="text"> Días restantes para recargar en Reales Brasileños</div>
            </div>
          </q-tab>
          
          <q-tab>
            <div class="vip_four_slide">
              <div class="one">
                <img src="~assets/AppSkinD/images/Vip/level_09.png" />
                Miembro VIP 9
              </div>
              <div class="title text-capitalize">
                {{ $t("vip.title.updateCondition") }}:
              </div>
              <div class="two">
                <ul>
                  <li class="text-capitalize">{{ $t("vip.depositAmount") }}</li>
                  <li>MXN 1000000</li>
                </ul>
                <ul>
                  <li class="text-capitalize">
                    {{ $t("vip.codificationVolume") }}
                  </li>
                  <li>MXN 5000000</li>
                </ul>
              </div>
              <div class="title text-capitalize">
                {{ $t("vip.title.levelPrivileges") }}:
              </div>
              <div class="text">
                <p>Número de Retiros: 5 veces/día</p>
                <p>Cantidad Máxima de Retiro: MXN 10000</p>
                <p>Cargo por Retiro: 3 %</p>
              </div>
              <div class="title text-capitalize">Recarga Garantizada para Miembros VIP: </div>
              <div class="text"> Días restantes para recargar en Reales Brasileños</div>
            </div>
          </q-tab>
          
          <q-tab>
            <div class="vip_four_slide">
              <div class="one">
                <img src="~assets/AppSkinD/images/Vip/level_09.png" />
                Miembro VIP 9
              </div>
              <div class="title text-capitalize">
                {{ $t("vip.title.updateCondition") }}:
              </div>
              <div class="two">
                <ul>
                  <li class="text-capitalize">{{ $t("vip.depositAmount") }}</li>
                  <li>MXN 5000000</li>
                </ul>
                <ul>
                  <li class="text-capitalize">
                    {{ $t("vip.codificationVolume") }}
                  </li>
                  <li>MXN 5000000</li>
                </ul>
              </div>
              <div class="title text-capitalize">
                {{ $t("vip.title.levelPrivileges") }}:
              </div>
              <div class="text">
                <p>Número de Retiros: 5 veces/día</p>
                <p>Cantidad Máxima de Retiro: MXN 20000</p>
                <p>Cargo por Retiro: 3 %</p>
              </div>
              <div class="title text-capitalize">Recarga Garantizada para Miembros VIP: </div>
              <div class="text"> Días restantes para recargar en Reales Brasileños</div>
            </div>
          </q-tab>




        </q-tabs>
      </div>
    </div>

    <PcCopyright />
    <StickyCustomerService />
  </q-page>
</template>

<script setup>
import { computed } from "vue";
import { throttle, useQuasar } from "quasar";
import { useI18n } from "src/boot/i18n";
import { useUserStore } from "src/store/userStore";
import { useConfigStore } from "src/store/configStore";
import { Mutation } from "src/graphql";
import { useMutation } from "@vue/apollo-composable";
import StaticImage from "src/components/StaticImage.vue";
import StickyCustomerService from "src/components/StickyCustomerService.vue";
import PcCopyright from "src/components/PcCopyright.vue";

import ImgVip0 from "assets/AppSkinD/images/Vip/VIP0.png";
import ImgVip1 from "assets/AppSkinD/images/Vip/VIP1.png";
import ImgVip2 from "assets/AppSkinD/images/Vip/VIP2.png";
import ImgVip3 from "assets/AppSkinD/images/Vip/VIP3.png";
import ImgVip4 from "assets/AppSkinD/images/Vip/VIP4.png";
import ImgVip5 from "assets/AppSkinD/images/Vip/VIP5.png";
import ImgVip6 from "assets/AppSkinD/images/Vip/VIP6.png";
import ImgVip7 from "assets/AppSkinD/images/Vip/VIP7.png";
import ImgVip8 from "assets/AppSkinD/images/Vip/VIP8.png";
import ImgVip9 from "assets/AppSkinD/images/Vip/VIP9.png";
import ImgVip10 from "assets/AppSkinD/images/Vip/VIP10.png";
import ImgVip11 from "assets/AppSkinD/images/Vip/VIP11.png";
import ImgVip12 from "assets/AppSkinD/images/Vip/VIP12.png";
import ImgVip13 from "assets/AppSkinD/images/Vip/VIP13.png";
import ImgVip14 from "assets/AppSkinD/images/Vip/VIP14.png";
import ImgVip15 from "assets/AppSkinD/images/Vip/VIP15.png";

import ImgLevel0 from "assets/AppSkinD/images/Vip/level_00.png";
import ImgLevel1 from "assets/AppSkinD/images/Vip/level_01.png";
import ImgLevel2 from "assets/AppSkinD/images/Vip/level_02.png";
import ImgLevel3 from "assets/AppSkinD/images/Vip/level_03.png";
import ImgLevel4 from "assets/AppSkinD/images/Vip/level_04.png";
import ImgLevel5 from "assets/AppSkinD/images/Vip/level_05.png";
import ImgLevel6 from "assets/AppSkinD/images/Vip/level_06.png";
import ImgLevel7 from "assets/AppSkinD/images/Vip/level_07.png";
import ImgLevel8 from "assets/AppSkinD/images/Vip/level_08.png";
import ImgLevel9 from "assets/AppSkinD/images/Vip/level_09.png";
import ImgLevel10 from "assets/AppSkinD/images/Vip/level_10.png";
import ImgLevel11 from "assets/AppSkinD/images/Vip/level_11.png";
import ImgLevel12 from "assets/AppSkinD/images/Vip/level_12.png";
import ImgLevel13 from "assets/AppSkinD/images/Vip/level_13.png";
import ImgLevel14 from "assets/AppSkinD/images/Vip/level_14.png";
import ImgLevel15 from "assets/AppSkinD/images/Vip/level_15.png";
import { CURRENCY_NAME } from "src/utils/constants";

const vipImages = [
  ImgVip0,
  ImgVip1,
  ImgVip2,
  ImgVip3,
  ImgVip4,
  ImgVip5,
  ImgVip6,
  ImgVip7,
  ImgVip8,
  ImgVip9,
  ImgVip10,
  ImgVip11,
  ImgVip12,
  ImgVip13,
  ImgVip14,
  ImgVip15,
];

const logoImages = [
  ImgLevel0,
  ImgLevel1,
  ImgLevel2,
  ImgLevel3,
  ImgLevel4,
  ImgLevel5,
  ImgLevel6,
  ImgLevel7,
  ImgLevel8,
  ImgLevel9,
  ImgLevel10,
  ImgLevel11,
  ImgLevel12,
  ImgLevel13,
  ImgLevel14,
  ImgLevel15,
];

const userStore = useUserStore();
const configStore = useConfigStore();
const $q = useQuasar();
const { t } = useI18n();
</script>

<style lang="scss" scoped></style>
