<template>
  <div class="main">
    <div class="main__block">
      <h2 class="main__text">Character</h2>
      <div class="character-block">
        <div class="character-block__character"></div>
        <div class="character-block__equip"></div>
      </div>
      <quick-inventory></quick-inventory>
      <character-information></character-information>
    </div>
    <div class="main__block">
      <h2 class="main__text">Inventory</h2>
      <div class="main__slots">
        <inventory-slot v-for="slot in 25" :key="slot" :slotSize="'large'"></inventory-slot>
      </div>
    </div>
  </div>
</template>

<script>
import QuickInventory from "@/components/QuickInventory.vue";
import CharacterInformation from "@/components/CharacterInformation.vue";

export default {
  components: {
    QuickInventory,
    CharacterInformation,
  },
};
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  margin-top: 54px;
  gap: 54px;
}

.main__block {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 877.5px;
  height: 883.5px;
  background: #7a5737;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  color: #f9c290;
}

.main__text {
  margin: 25px;
  font-weight: 400;
  font-size: 36px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.character-block {
  display: flex;
  width: 708px;
  height: 357px;
  gap: 24px;
}

.character-block__character {
  width: 476px;
  height: 357px;
  background: #866241;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}

.character-block__equip {
  width: 208.5px;
  height: 357px;
  background: #866241;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}

.main__slots {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
}
</style>