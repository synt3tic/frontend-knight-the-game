<template>
  <div class="character-screen">
    <div class="character-screen__container">
      <h2 class="character-screen__header-text">Character</h2>
      <div class="character-container">
        <div class="character-container__character">
          <the-character />
        </div>
        <div class="character-container__equip">
          <inventory-slot
            v-for="item in characterEquipSlots"
            :key="item.id"
            slotSize="large"
            :item="item"
            @moveItem="moveItem"
          />
        </div>
      </div>
      <quick-inventory
        :quickInventorySlots="quickInventorySlots"
        @moveItem="moveItem"
        @deleteItem="deleteItem"
      />
      <character-information :equipItems="characterEquipSlots" />
    </div>
    <div class="character-screen__container">
      <h2 class="character-screen__header-text">Inventory</h2>
      <div class="character-screen__slots">
        <inventory-slot
          v-for="item in inventorySlots"
          :key="item.id"
          slotSize="medium"
          :item="item"
          @moveItem="moveItem"
          @deleteItem="deleteItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import QuickInventory from "@/components/QuickInventory.vue";
import CharacterInformation from "@/components/CharacterInformation.vue";
import TheCharacter from "@/components/TheCharacter.vue";
import items from "@/data/items/items";
import armor from "@/data/items/armor";
import weapon from "@/data/items/weapons";
import helpers from "@/utils/helpers";

export default {
  data() {
    return {
      inventorySlots: [
        {
          id: 1,
          slotEmptyStatus: true,
        },
        {
          id: 2,
          slotEmptyStatus: true,
        },
        {
          id: 3,
          slotEmptyStatus: true,
        },
        {
          id: 4,
          slotEmptyStatus: true,
        },
        {
          id: 5,
          slotEmptyStatus: true,
        },
        {
          id: 6,
          slotEmptyStatus: true,
        },
        {
          id: 7,
          slotEmptyStatus: true,
        },
        {
          id: 8,
          slotEmptyStatus: true,
        },
        {
          id: 9,
          slotEmptyStatus: true,
        },
        {
          id: 10,
          slotEmptyStatus: true,
        },
        {
          id: 11,
          slotEmptyStatus: true,
        },
        {
          id: 12,
          slotEmptyStatus: true,
        },
        {
          id: 13,
          slotEmptyStatus: true,
        },
        {
          id: 14,
          slotEmptyStatus: true,
        },
        {
          id: 15,
          slotEmptyStatus: true,
        },
        {
          id: 16,
          slotEmptyStatus: true,
        },
        {
          id: 17,
          slotEmptyStatus: true,
        },
        {
          id: 18,
          slotEmptyStatus: true,
        },
        {
          id: 19,
          slotEmptyStatus: true,
        },
        {
          id: 20,
          slotEmptyStatus: true,
        },
        {
          id: 21,
          slotEmptyStatus: true,
        },
        {
          id: 22,
          slotEmptyStatus: true,
        },
        {
          id: 23,
          slotEmptyStatus: true,
        },
        {
          id: 24,
          slotEmptyStatus: true,
        },
        {
          id: 25,
          slotEmptyStatus: true,
        },
      ],
      characterEquipSlots: [
        {
          id: 1,
          slotEmptyStatus: true,
          damage: 0,
        },
        {
          id: 2,
          slotEmptyStatus: true,
        },
      ],
      quickInventorySlots: [
        {
          id: 1,
          slotEmptyStatus: true,
        },
        {
          id: 2,
          slotEmptyStatus: true,
        },
        {
          id: 3,
          slotEmptyStatus: true,
        },
        {
          id: 4,
          slotEmptyStatus: true,
        },
        {
          id: 5,
          slotEmptyStatus: true,
        },
      ],
    };
  },

  mounted() {
    for (let i = 0; i < items.length; i++) {
      this.inventorySlots[i] = { ...this.inventorySlots[i], ...items[i].item };
      this.inventorySlots[i].slotEmptyStatus = false;
    }
    this.characterEquipSlots = this.characterEquipSlots.map((el) => {
      if (el.id === 2) {
        el.slotEmptyStatus = false;
        el = { ...el, ...armor.defaultArmor };
        el.isEquip = true;
        return el;
      } else if (el.id === 1) {
        el.slotEmptyStatus = false;
        el = { ...el, ...weapon.defaultSword };
        el.isEquip = true;
        return el;
      } else {
        return el;
      }
    });
  },

  methods: {
    moveItem(item) {
      if (item.quickStatus && !item.onQuickInventory) {
        item.onQuickInventory = true;
        item.quickStatus = false;
        this.quickInventorySlots = this.quickInventorySlots.map((el) => {
          if (el.id === helpers.findEmptySlot(this.quickInventorySlots).id) {
            el = helpers.newItem(item);
            el.id = helpers.findEmptySlot(this.quickInventorySlots).id;
            return el;
          } else {
            return el;
          }
        });
        this.inventorySlots = this.inventorySlots.map((el) => {
          if (el.id === item.id) {
            return (el = helpers.emptySlot(item));
          } else {
            return el;
          }
        });
      } else if (item.onQuickInventory) {
        item.onQuickInventory = false;
        item.quickStatus = true;
        this.inventorySlots = this.inventorySlots.map((el) => {
          if (el.id === helpers.findEmptySlot(this.inventorySlots).id) {
            el = helpers.newItem(item);
            el.id = helpers.findEmptySlot(this.inventorySlots).id;
            return el;
          } else {
            return el;
          }
        });
        this.quickInventorySlots = this.quickInventorySlots.map((el) => {
          if (el.id === item.id) {
            return (el = helpers.emptySlot(item));
          } else {
            return el;
          }
        });
      } else if (!item.isEquip) {
        item.isEquip = true;
        item.equipStatus = false;
        this.inventorySlots = this.inventorySlots.map((el) => {
          if (el.id === item.id) {
            return (el = helpers.emptySlot(item));
          } else {
            return el;
          }
        });
        this.inventorySlots = this.inventorySlots.map((el) => {
          if (el.id === helpers.findEmptySlot(this.inventorySlots).id) {
            el = this.characterEquipSlots[item.index];
            el.id = helpers.findEmptySlot(this.inventorySlots).id;
            el.isEquip = false;
            el.equipStatus = true;
            return el;
          } else {
            return el;
          }
        });
        this.characterEquipSlots[item.index] = item;
      } else if (item.isEquip) {
        this.inventorySlots = this.inventorySlots.map((el) => {
          if (el.id === helpers.findEmptySlot(this.inventorySlots).id) {
            el = helpers.newItem(item);
            el.id = helpers.findEmptySlot(this.inventorySlots).id;
            el.isEquip = false;
            el.equipStatus = true;
            return el;
          } else {
            return el;
          }
        });
        this.characterEquipSlots[item.index] = {
          id: 2,
          slotEmptyStatus: true,
        };
      }
    },

    deleteItem(item) {
      if (item.onQuickInventory) {
        this.quickInventorySlots = this.quickInventorySlots.map((el) => {
          if (el.id === item.id) {
            return (el = helpers.emptySlot(item));
          } else {
            return el;
          }
        });
      } else {
        this.inventorySlots = this.inventorySlots.map((el) => {
          if (el.id === item.id) {
            return (el = helpers.emptySlot(item));
          } else {
            return el;
          }
        });
      }
    },
  },

  components: {
    QuickInventory,
    CharacterInformation,
    TheCharacter,
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