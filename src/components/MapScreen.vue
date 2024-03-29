<template>
  <div class="map-screen">
    <location-list 
      :locations="locations"
      @showModal="showModal"
      :currentLocation="currentLocation"
    />
    <the-map 
      :locations="locations" 
      :isModalActive="isModalActive"
      :currentLocation="currentLocation"
      @showModal="showModal"
      @hideModal="hideModal"
      @hideHeader="$emit('hideHeader')"
    />
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
import config from "@/data/config";

export default {
  components: {
    LocationList,
    TheMap,
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
      this.currentLocation = null
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
</style>