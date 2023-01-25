<template>
  <div class="information-container">
    <div
      v-for="info in updateCurrentCharacteristics"
      :key="info.name"
      class="information-container__text"
    >
      <div>{{ info.name }}</div>
      <div>{{ info.value }}</div>
    </div>
    <div
      v-for="(value, index) in characterProgress"
      :key="index"
      class="information-container__text"
    >
      <div>{{ value.name }}</div>
      <div>{{ value.value }}</div>
    </div>
  </div>
</template>

<script>
import config from "@/data/config";
import helpers from "@/utils/helpers";
import characterProgress from "@/data/characterProgress";

export default {
  props: {
    equipItems: {
      type: Array,
    },
  },
  data() {
    return {
      characterProgress: [],
      characterInformation: [],
      characteristic: [
        "damage",
        "armor",
        "healthPoints",
        "criticalDamage",
        "accuracy",
        "missChance",
      ],
    };
  },
  mounted() {
    this.characterInformation = config.basicCharacterStats;
    this.characterProgress = characterProgress;
    this.calculateCharacterProgress()
  },
  methods: {
    calculateСhangedCharacteristics(items) {
      const updatedCharacterCharacteristics = {};
      items.forEach((el) => {
        for (let key in el) {
          if (this.characteristic.includes(key)) {
            if (key in updatedCharacterCharacteristics) {
              updatedCharacterCharacteristics[key] += el[key];
            } else {
              updatedCharacterCharacteristics[key] = el[key];
            }
          }
        }
      });
      return updatedCharacterCharacteristics;
    },
    calculateCharacterProgress() {
      if(characterProgress[1].value >= 1000) {
        characterProgress[0].value += 1
        characterProgress[1].value -= 1000
      }
    }
  },
  computed: {
    updateCurrentCharacteristics() {
      const increasedCharacteristics = this.calculateСhangedCharacteristics(
        this.equipItems
      );
      const updatedCharacterInformation = this.characterInformation.map(
        (el) => {
          const currentIncreasedProperty = increasedCharacteristics[el.key];
          const newCharacteristics = { ...el };
          newCharacteristics.value += currentIncreasedProperty;
          return newCharacteristics;
        }
      );
      helpers.putInLocalStorage("characteristics", updatedCharacterInformation);
      return updatedCharacterInformation;
    },
  },
};
</script>

<style scoped>
.information-container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 708px;
  height: 222px;
  background: #866241;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}

.information-container__text {
  display: flex;
  justify-content: space-between;
  align-self: flex-start;
  margin-left: 40px;
  gap: 40px;
  height: 46px;
  font-size: 20px;
  width: 204px;
  height: 46px;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
