<template>
  <div class="information-container">
    <div v-for="info in characterInformation" :key="info.name" class="information-container__text">
      <div>{{info.name}}</div>
      <div>{{info.value}}</div>
    </div>
  </div>
</template>

<script>
import config from "@/data/config";

export default {
  props: {
    equipItems: {
      type: Array,
    },
  },
  data() {
    return {
      characterInformation: [
        {
          name: "Damage",
        },
        {
          name: "Armor",
        },
        {
          name: "Regeneration",
        },
        {
          name: "Critical Damage",
        },
        {
          name: "Level",
        },
      ],
    };
  },

  mounted() {
    this.characterInformation[0].value = config.charactersBaseDamage;
    this.characterInformation[1].value = config.charactersBaseArmor;
    this.characterInformation[2].value = config.charactersBaseRegeneration;
    this.characterInformation[3].value =
      config.charactersBaseCriticalDamageChance;
    this.characterInformation[4].value = config.charactersBaseLevel;
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
  gap: 40px;
  height: 46px;
  font-size: 20px;
  width: 204px;
  height: 46px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>