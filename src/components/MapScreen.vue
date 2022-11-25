<template>
  <div class="map-screen">
    <location-list @openModal="changeModalStatus" />
    <the-map>
      <selected-location v-if="isModalActive" @hideModal="changeModalStatus" />
    </the-map>
    <div class="map-screen__map-legend">
      <div v-for="(indicator, index) in indicatorColors" :key="index" class="map-legend__list">
        <div
          class="map-legend__indicator"
          :class="{
            'map-legend__indicator_passed': indicator.color === 'green', 
            'map-legend__indicator_not-passed': indicator.color === 'yellow', 
            'map-legend__indicator_legendary': indicator.color === 'red'
            }"
        ></div>
        <h3 class="map-legend__text">{{indicator.title}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import LocationList from "@/components/LocationList.vue";
import TheMap from "@/components/TheMap.vue";
import SelectedLocation from "@/components/SelectedLocation.vue";

export default {
  components: {
    LocationList,
    TheMap,
    SelectedLocation,
  },
  data() {
    return {
      indicatorColors: [
        {
          title: "Passed location",
          color: "green",
        },
        {
          title: "Location not passed",
          color: "yellow",
        },
        {
          title: "Legendary battle",
          color: "red",
        },
      ],
      isModalActive: false,
    };
  },
  methods: {
    changeModalStatus() {
      this.isModalActive = !this.isModalActive;
    },
  },
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
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>