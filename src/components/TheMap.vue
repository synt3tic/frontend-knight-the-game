<template>
  <div class="map">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.map {
  width: 1235.4px;
  height: 877.5px;
  background: url(../images/map.png);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 15px;
}
</style>