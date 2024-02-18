<template>
  <q-page class="q-pa-md">
    <!-- Amazon is the largest online e-commerce company in the United States,
    located in Seattle, Washington. Amazon is one of the first companies on the
    Internet to start operating e-commerce. Amazon was established in 1995. At
    the beginning, it only operated online book sales. Now it has expanded to a
    wide range of other products and has become the world's largest online
    product variety Retailers and global Internet companies
    <br />
    <br />
    <q-img src="~assets/images/about/about_04.png" />
    <br />
    <br />
    {{ $t('site.name') }} is an important strategic partner of Amazon's
    cross-border e-commerce. Nine major sites in the world, eight major sites
    have been opened to global sellers. {{ $t('site.name') }}'s eight global
    sites have accumulated more than millions of corporate and institutional
    buyers. These buyers cover users in hospitals, laboratories, daycare centers
    and other users. According to the latest statistics of Amazon Business USA,
    compared with the same period in 2020, buyers in different market segments
    have achieved amazing growth in {{ $t('site.name') }} purchases in 2021 -->
    <div class="about_one">
      <div class="title">
        <span>
          <b>Why choose {{ $t('site.name') }}?</b>
        </span>
      </div>
      <br />
      <div class="text">
        <q-img src="~assets/images/about/about_05.png" />
        <br />
        <br />
        <p class="text-title"><b>Leading Technology</b></p>
        Open source code, free management software of miners and mining farm,
        official customized overclock firmware increases revenue significantly,
        blockchain data and technical service provider.
      </div>
      <div class="text">
        <q-img src="~assets/images/about/about_06.png" />
        <br />
        <br />
        <p class="text-title"><b>Convenient Management</b></p>
        Concise app and webpage operation, easy account registration with
        cell-phone number or email, independent alarm function, revenue address,
        miners grouping and watcher link of sharing data.
      </div>
      <div class="text">
        <q-img src="~assets/images/about/about_07.png" />
        <br />
        <br />
        <p class="text-title"><b>Revenue Assurance</b></p>
        Real and transparent mining data, advanced FPPS revenue model, powerful
        settlement center, punctual payment, rain or shine.
      </div>
      <div class="text">
        <q-img src="~assets/images/about/about_08.png" />
        <br />
        <br />
        <p class="text-title"><b>Professional Services</b></p>
        {{ $t('site.name') }} do have a professional customer service team, the
        highest standard of customized VIP services, and the top researchers
        analyze cases person to person in the industry.
      </div>
    </div>
  </q-page>
</template>

<script setup></script>
<style lang="scss" scoped>
.about_one .title {
  display: table;
  width: 100%;
  line-height: 50px;
  color: #0e4a6c;
  text-align: center;
  padding: 10px 0px 0px;
}
.about_one .title span {
  width: 100%;
  text-align: center;
  display: block;
  font-size: 18px;
  color: #85b044;
  text-shadow: 1px 1px 2px rgb(0 0 0 / 10%);
}
.about_one .text {
  width: 100%;
  font-size: 12px;
  line-height: 22px;
  color: #0e4a6c;
  padding: 0px 20px 20px;
}
.about_one .text img {
  max-width: 100%;
  margin: 0px auto;
}
</style>
