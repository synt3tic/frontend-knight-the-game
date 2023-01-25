<template>
  <div class="map">
    <location-modal
      v-if="isModalActive"
      :location="currentLocation"
      @hideModal="$emit('hideModal')"
      @hideHeader="$emit('hideHeader')"
    />
    <div
      v-for="location in locations"
      :key="location.id"
      :style="location.position"
      :class="locationPointsClasses(location)"
      @click="$emit('showModal', location)"
    ></div>
  </div>
</template>

<script>
import LocationModal from "./LocationModal.vue";

export default {
  components: {
    LocationModal,
  },
  props: {
    locations: {
      type: Array,
    },
    isModalActive: {
      type: Boolean,
    },
    currentLocation: {
      type: Object,
    },
  },
  methods: {
    locationPointsClasses(location) {
      return [
        "map__locations-points",
        {
          "map__locations-points_passed": location.passedStatus,
        },
      ];
    },
  },
};
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

.map__locations-points {
  position: absolute;
  width: 21px;
  height: 21px;
  background: #ff9b41;
  border: 1px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  z-index: -1;
}

.map__locations-points_passed {
  background: #94ff41;
}

.map__locations-points:hover {
  cursor: pointer;
  background: #b86319;
  transition-duration: 200ms;
}
</style>
