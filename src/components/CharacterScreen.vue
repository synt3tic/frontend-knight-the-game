<template>
  <div class="character-screen">
    <div class="character-screen__container">
      <h2 class="character-screen__header-text">Character</h2>
      <div class="character-container">
        <div class="character-container__character">
          <the-character />
        </div>
        <div class="character-container__equip">
          <inventory-slot v-for="slot in 2" :key="slot" slotSize="large" />
        </div>
      </div>
      <quick-inventory />
      <character-information />
    </div>
    <div class="character-screen__container">
      <h2 class="character-screen__header-text">Inventory</h2>
      <div class="character-screen__slots">
        <inventory-slot v-for="slot in inventorySlotsAmount" :key="slot" slotSize="medium" />
      </div>
    </div>
  </div>
</template>

<script>
import QuickInventory from "@/components/QuickInventory.vue";
import CharacterInformation from "@/components/CharacterInformation.vue";
import TheCharacter from "@/components/TheCharacter.vue";
import config from "@/config";

export default {
  components: {
    QuickInventory,
    CharacterInformation,
    TheCharacter,
  },
  computed: {
    inventorySlotsAmount() {
      return config.inventorySlotsAmount;
    },
    characterEquipSlotsAmount() {
      return config.characterEquipSlotsAmount;
    },
  },
};
</script>

<style scoped>
.character-screen {
  display: flex;
  justify-content: center;
  margin-top: 54px;
  gap: 54px;
}

.character-screen__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 877.5px;
  height: 883.5px;
  background: #7a5737;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  gap: 30px;
  color: #f9c290;
}

.character-screen__header-text {
  margin: 30px 0 0 0;
  font-weight: 400;
  font-size: 36px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.character-container {
  display: flex;
  width: 708px;
  height: 357px;
  gap: 24px;
}

.character-container__character {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 476px;
  height: 357px;
  background: #866241;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}

.character-container__equip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  width: 208.5px;
  height: 357px;
  background: #866241;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}

.character-screen__slots {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
}
</style>