<template>
  <q-dialog v-model="showDialog" persistent class="Sys_dialog">
    <q-card>
      <q-card-section class="Sys_dialog_title">
        <div class="name">{{ $t("home.title.downloadIos") }}</div>
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="scroll">
        <div class="Sys_dialog_content">
          <img src="~assets/AppSkinD/upload/download.png" alt="" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup></script>
