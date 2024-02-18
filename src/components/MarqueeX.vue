<template>
  <div class="outbox marquee-outbox">
    <div class="inbox" ref="inbox">
      <div class="box" ref="messageBox" style="transform: translateX(1000px)">
        "Heyler777" tiene muchos juegos, mucha diversión y mucha diversión para todos en
        esta plataforma.
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from "vue";

export default defineComponent({
  name: "MarqueeX",
  props: {
    message: String,
  },

  setup() {
    let inbox = ref(null);
    let messageBox = ref(null);
    let timer = null;
    let initOffset = 322;

    onMounted(() => {
      let offset = initOffset;

      timer = setInterval(() => {
        if (messageBox.value) {
          offset--;
          if (offset < -messageBox.value.clientWidth) {
            offset = initOffset;
          }
          messageBox.value.style = "transform: translateX(" + offset + "px)";
        }
      }, 16);
    });

    onUnmounted(() => {
      timer ? clearInterval(timer) : "";
    });

    return {
      messageBox,
      inbox,
    };
  },
});
</script>

<style lang="scss" scoped>
body.body--dark {
  .box {
    color: white;
  }
}
.marquee-outbox.outbox {
  position: relative;
  height: 35px;
  overflow: hidden;

  .inbox {
    position: absolute;
    font-size: 0;
    white-space: nowrap;

    .box {
      display: inline-block;
      font-family: "Montserrat-Regular";
      height: 2rem;
      font-size: 14px;
      line-height: 2rem;
      vertical-align: middle;

      img {
        width: 14px;
        height: 14px;
      }
    }
  }
}
</style>
