<template>
  <div class="map-screen">
    <location-list :locations="locations" @showModal="showModal" />
    <the-map>
      <location-modal
        v-if="isModalActive"
        :location="currentLocation"
        @hideModal="hideModal"
      />
      <div 
        v-for="location in locations" 
        :key="location.id"
        :style="location.position"
        class="locations-points"
        @click="showModal(location)"
      ></div>
    </the-map>
    <div class="map-screen__map-legend">
      <div 
        v-for="(indicator, index) in indicatorColors" 
        :key="index" 
        class="map-legend__list"
      >
        <div :class="getIndicatorsClasses(indicator)"></div>
        <h3 class="map-legend__text">{{indicator.title}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import LocationList from "@/components/LocationList.vue";
import TheMap from "@/components/TheMap.vue";
import locations from '@/data/locations';
import LocationModal from "./LocationModal.vue";
import config from "@/data/config";

export default {
  components: {
    LocationList,
    TheMap,
    LocationModal,
  },
  data() {
    return {
      indicatorColors: null,
      isModalActive: false,
      currentLocation: null,
      locations: null,
    };
  },
  methods: {
    showModal(location) {
      this.isModalActive = true
      this.currentLocation = location
    },

    hideModal() {
      this.isModalActive = false
    },

    getIndicatorsClasses(indicator) {
      return ["map-legend__indicator", {
        "map-legend__indicator_passed": indicator.color === 'green', 
        "map-legend__indicator_not-passed": indicator.color === 'yellow', 
        "map-legend__indicator_legendary": indicator.color === 'red'
      }]
    },
  },
  mounted() {
    this.locations = locations
    this.indicatorColors = config.indicatorsColors
  }
};
</script>

<style scoped>
.map-screen {
  display: flex;
  justify-content: center;
  margin-top: 38px;
  gap: 19px;
}

.map-screen__map-legend {
  display: flex;
  flex-direction: column;
  width: 284.11px;
  height: 877.5px;
  background: #7a5737;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}

.map-legend__list {
  display: flex;
  align-items: center;
  gap: 13px;
}

.map-legend__indicator {
  margin-left: 5px;
  width: 24px;
  height: 24px;
  border: 1px solid #000000;
  border-radius: 50%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.map-legend__indicator_passed {
  background: #94ff41;
}

.map-legend__indicator_not-passed {
  background: #ff9b41;
}

.map-legend__indicator_legendary {
  background: #ff4141;
}

.map-legend__text {
  font-weight: 400;
  font-size: 20px;
  color: #f9c290;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.map-legend__text:hover {
  cursor: default;
}

.locations-points {
  position: absolute;
  width: 21px;
  height: 21px;
  background: #FF9B41;
  border: 1px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  z-index: -1;
}

.locations-points:hover {
  cursor: pointer;
  background: #b86319;
  transition-duration: 200ms;
}
</style>