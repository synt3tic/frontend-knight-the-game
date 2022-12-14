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
  position: relative;
  width: 1235px;
  height: 878px;
  background: url(../images/map.png);
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 15px;
}
</style>