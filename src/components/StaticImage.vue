<template>
  <img :src="images[url] || url" />
</template>

<script>
const files = [
  'Head/Head_00.png',
  'Head/Head_01.png',
  'Head/Head_02.png',
  'Head/Head_03.png',
  'Head/Head_04.png',
  'Head/Head_05.png',
  'Head/Head_06.png',
  'Head/Head_07.png',
  'Head/Head_08.png',
  'Head/Head_09.png',
  'Head/Head_10.png',
  'Head/Head_11.png',
  'Head/Head_12.png',
  'Head/Head_13.png',
  'Head/Head_14.png',
  'Head/Head_15.png',
  'Head/Head_16.png',
  'Head/Head_17.png',
  'Head/Head_18.png',
  'Head/Head_19.png',
  'Head/Head_20.png',
  'Head/Head_21.png',
  'Head/Head_22.png',
  'Head/Head_23.png',
  'Head/Head_24.png',
  'Head/Head_25.png',
  'Head/Head_26.png',
  'Head/Head_27.png',
  'Head/Head_28.png',
  'Head/Head_29.png',
  'Head/Head_30.png',
  'Head/Head_31.png',
  'Head/Head_32.png',
  'Head/Head_33.png',
  'Head/Head_34.png',
  'Head/Head_35.png',
  'Head/Head_36.png',
];

const images = {};

for (let file of files) {
  images[file] = require(
    `assets/images${/^(\/)/.test(file) ? '' : '/'}${file}`,
  );
}

export default {
  props: ['url'],
  setup() {
    return {
      images,
    };
  },
};
</script>
