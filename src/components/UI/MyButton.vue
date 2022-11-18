<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button",
};
</script>

<style scoped>
.button {
  background: #f9c290;
  border-radius: 15px;
  border: none;
  font-family: "Alike Angular", normal;
  line-height: 0%;
  color: #7a5737;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.button:hover {
  cursor: pointer;
  background: #7a5737;
  color: #f9c290;
  border: solid 1px #f9c290;
}
</style>