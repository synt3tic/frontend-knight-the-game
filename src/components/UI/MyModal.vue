<template>
  <div class="modal">
    <div class="modal__window">
      <h1 class="window__header">{{  modalContent.title  }}</h1>
      <my-button 
        v-for="(text, index) in modalContent.buttonTextList" 
        :key="index"
        @click="closeModal(text)"
      >{{  text  }}</my-button>
    </div>
  </div>
  
</template>

<script>
export default {
  name: "my-modal",
  props: {
    modalContent: {
      type: Object,
      require: true,
    }
  },
  methods: {
    closeModal(text) {
      if(text === "Continue") {
        this.$emit("hideModal")
      } else if(text === "Return to Main Menu") {
        this.$router.push("/map")
        this.$emit("showHeader")
      } else {
        this.$emit("restartGame")
      }
    }
  }
}
</script>

<style scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  display: flex;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1080px;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.modal__window {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: max-content;
  padding: 45px;
  gap: 18px;
  width: 490px;
  background: rgba(175, 148, 132, 0.95);
  border-radius: 15px;
}

.window__header {
  margin: 0 0 20px 0;
  font-size: 36px;
  color: #6C4D30;
  text-shadow: 0 4 4 rgba(0, 0, 0, 0.25);
}
</style>