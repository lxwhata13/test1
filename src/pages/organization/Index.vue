<template>
  <q-page class="Sys_page">
    <ul class="About_one">
      <li><img src="~assets/images/System_Qapp/icon-1.png" alt="" /></li>
      <li>Version: v1.0.1</li>
    </ul>
    <div class="About_two">
      <!--  -->
      <p>
        Chongpangpang APP is a pet interest comprehensive platform under the BBK
        Group. Pet Pang Pang focuses on pet ecology, deeply cultivates pet
        lovers, gathers pet content, builds a bridge for hundreds of millions of
        pet lovers, pet owners, and pet service businesses, and strives to
        create a comprehensive platform for pet interests and define new
        professional standards for the pet industry.
      </p>
      <br />
      <p>
        Chongpangpang will link hundreds of millions of pet people and pet
        services, making petting more worry-free.
      </p>
      <!--  -->
    </div>
    <div class="About_three">
      <ul>
        <li>
          <p>
            Customer Service
            <span>Service@gmail.com</span>
          </p>
        </li>
        <li>
          <router-link to="/organization/New_about_terms">
            Terms of Service
          </router-link>
        </li>
        <li>
          <router-link to="/organization/New_about_privacy">
            Privacy Policy
          </router-link>
        </li>
      </ul>
    </div>
    <!-- <q-separator class="q-separator-dotted" />
    <div class="q-ma-none full-width flex flex-center q-py-xl dark">
      <q-img no-spinner no-transition :ratio="750 / 350" src="~assets/images/System/Logo_01.png" />
    </div>
    <q-list class="full-width q-mt-none q-px-md dark">
      <q-separator class="q-separator-dotted" />
      <template v-for="(link, index) in links" :key="index">
        <q-item clickable v-ripple class="q-px-none" :to="link.to">
          <q-item-section>{{ link.title }}</q-item-section>
          <q-item-section side>
            <icon v-if="!link.desc" name="jiantou" type="class" style="font-size: 0.7rem; color: #345270" />
            <q-item-label v-else>
              {{ link.desc }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-separator-dotted" v-if="index + 1 < links.length" />
      </template>
    </q-list> -->
  </q-page>
</template>

<script setup>
import { useUserStore } from 'src/store/userStore';
import { useI18n } from 'src/boot/i18n';

const userStore = useUserStore();
const { t } = useI18n();

const links = [
  {
    title: t('routes.title.TermsOfService'),
    color: 'blue',
    to: { name: 'TermsOfService' },
  },
  {
    title: t('routes.title.BusinessModel'),
    color: 'deep-purple',
    to: { name: 'BusinessModel' },
  },
  // {
  //   title: t('routes.title.CompanyProfile'),
  //   color: 'pink',
  //   to: { name: 'CompanyProfile' },
  // },
  {
    title: t('common.version'),
    color: 'indigo-13',
    desc: 'v1.0.1',
  },
];
</script>
