<template>
  <div class="main">
    <h2 class="main__header">Locations</h2>
    <div class="main__location">
      <h3 class="location__text" @click="openLocation">Location</h3>
      <div class="location__indicator"></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openLocation() {
      console.log("xui");
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 284.11px;
  height: 877.5px;
  background: #7a5737;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}

.main__header {
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  color: #f9c290;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.main__header:hover {
  cursor: default;
}

.main__location {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 249.72px;
  height: 52.5px;
}

.location__text {
  font-weight: 400;
  font-size: 21px;
  color: #f9c290;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.location__text:hover {
  cursor: pointer;
  color: #c99668;
}

.location__indicator {
  width: 21px;
  height: 21px;
  background: #ff9b41;
  border: 1px solid #000000;
  border-radius: 50%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.location__indicator_passed {
  background: #94ff41;
}

.location__indicator_legendary {
  background: #ff4141;
}
</style>