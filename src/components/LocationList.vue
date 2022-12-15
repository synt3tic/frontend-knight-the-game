<template>
  <div class="main">
    <h2 class="main__header">Locations</h2>
    <div 
      v-for="location in locations"
      :key="location.id"
      :class="getLocationClasses(location)"
      @click="$emit('showModal', location)"
    >
      <h3 class="location__text">{{  location.name  }}</h3>
      <div :class="getIndicatorClasses(location)"></div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    locations: {
      type: Array,
    },
    currentLocation: {
      type: Object,
    },
  },
  methods: {
    getIndicatorClasses(location) {
      return ["location__indicator", {
        location__indicator_passed: location.passedStatus
      }]
    },
    getLocationClasses(location) {
      return ["main__location", {
        main__location_changed: location === this.currentLocation
      }]
    }
  }
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  width: 285px;
  height: 878px;
  background: #7a5737;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  z-index: 2;
}

.main__header {
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  color: #f9c290;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.main__header:hover {
  cursor: default;
}

.main__location {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: inherit;
  width: 250px;
  height: 53px;
  transition-duration: 200ms;
}

.main__location:hover {
  cursor: pointer;
  background: rgba(134, 98, 65, 0.69);
  transition-duration: 200ms;
  width: inherit;
}

.main__location_changed {
  background: rgba(134, 98, 65, 0.69);
  width: inherit;
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
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.location__indicator_passed {
  background: #94ff41;
}
</style>