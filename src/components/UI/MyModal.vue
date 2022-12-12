<template>
  <div class="modal" @click="hideModal">
    <div class="modal__window" @click.stop></div>
  </div>
</template>

<script>
export default {
  name: "my-modal",
  methods: {},
};
</script>

<style scoped>
.modal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
}

.modal__window {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin: 315px auto;
  width: 566px;
  height: 454.66px;
  background: #6c4d30;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}
</style>