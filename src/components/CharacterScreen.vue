<template>
  <div class="character-screen">
    <div class="character-screen__container">
      <h2 class="character-screen__header-text">Character</h2>
      <div class="character-container">
        <div class="character-container__character">
          <img :src="imageSrc" alt="character-image" class="character" />
        </div>
        <div class="character-container__equip">
          <inventory-slot
            v-for="item in characterEquipSlots"
            :key="item.id"
            :item="item"
            slotSize="large"
            @moveItem="moveItem"
            @deleteItem="deleteItem"
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
          :item="item"
          slotSize="medium"
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
import config from "@/data/config";
import helpers from "@/utils/helpers";

export default {
  components: {
    QuickInventory,
    CharacterInformation,
  },
  data() {
    return {
      inventorySlots: [],
      characterEquipSlots: [
        {
          id: 1,
          name: "empty",
          slotEmptyStatus: true,
          damage: 0,
          criticalDamage: 0,
          armor: 0,
          healthPoints: 0,
          accuracy: 0,
          missChance: 0,
        },
        {
          id: 2,
          name: "empty",
          slotEmptyStatus: true,
          armor: 0,
          healthPoints: 0,
          damage: 0,
          criticalDamage: 0,
          accuracy: 0,
          missChance: 0,
        },
      ],
      quickInventorySlots: [],
    };
  },

  computed: {
    imageSrc() {
      let result = "";
      const currentEquip =
        this.characterEquipSlots[0].name + this.characterEquipSlots[1].name;
      result = helpers.getImgUrl(
        `/character/${config.coupleOfEquip[currentEquip]}.png`
      );
      return result;
    },
  },

  methods: {
    checkEquipItems(weapon, armor) {
      return (
        this.characterEquipSlots[0].name === weapon &&
        this.characterEquipSlots[1].name === armor
      );
    },

    newItem(item) {
      return { ...item };
    },

    findEmptySlot(arr) {
      return arr.find((el) => el.slotEmptyStatus);
    },

    newEmptySlot(item) {
      return {
        id: item.id,
        slotEmptyStatus: true,
      };
    },

    moveItemToQuickInventory(item) {
      const sameItem = this.quickInventorySlots.find(
        (el) => el.name === item.name
      );
      item.onQuickInventory = true;
      item.quickStatus = false;
      if (sameItem) {
        this.quickInventorySlots = this.quickInventorySlots.map((el) => {
          if (el.id === sameItem.id) {
            el.charge += item.charge;
            return el;
          } else {
            return el;
          }
        });
      } else {
        const emptySlotId = this.findEmptySlot(this.quickInventorySlots).id;
        this.quickInventorySlots = this.quickInventorySlots.map((el) => {
          if (el.id === emptySlotId) {
            el = this.newItem(item);
            el.id = emptySlotId;
            return el;
          } else {
            return el;
          }
        });
      }

      this.inventorySlots = this.inventorySlots.map((el) => {
        if (el.id === item.id) {
          return (el = this.newEmptySlot(item));
        } else {
          return el;
        }
      });
      helpers.putInLocalStorage("quickInventoryList", this.quickInventorySlots);
      helpers.putInLocalStorage("inventoryList", this.inventorySlots);
    },

    moveItemToInventory(item) {
      const sameItem = this.inventorySlots.find((el) => el.name === item.name);
      const emptySlotId = this.findEmptySlot(this.inventorySlots).id;
      item.onQuickInventory = false;
      item.quickStatus = true;
      if (sameItem) {
        this.inventorySlots = this.inventorySlots.map((el) => {
          if (el.id === sameItem.id) {
            el.charge += item.charge;
            return el;
          } else {
            return el;
          }
        });
      } else {
        this.inventorySlots = this.inventorySlots.map((el) => {
          if (el.id === emptySlotId) {
            el = this.newItem(item);
            el.id = emptySlotId;
            return el;
          } else {
            return el;
          }
        });
      }

      this.quickInventorySlots = this.quickInventorySlots.map((el) => {
        if (el.id === item.id) {
          return (el = this.newEmptySlot(item));
        } else {
          return el;
        }
      });
      helpers.putInLocalStorage("quickInventoryList", this.quickInventorySlots);
      helpers.putInLocalStorage("inventoryList", this.inventorySlots);
    },

    equipWithAnItem(item) {
      const emptySlotId = this.findEmptySlot(this.inventorySlots).id;
      item.isEquip = true;
      this.inventorySlots = this.inventorySlots.map((el) => {
        item.equipStatus = false;
        if (el.id === item.id) {
          return (el = this.newEmptySlot(item));
        } else {
          return el;
        }
      });
      this.inventorySlots = this.inventorySlots.map((el) => {
        if (el.id === emptySlotId) {
          el = this.characterEquipSlots[item.index];
          el.id = emptySlotId;
          el.isEquip = false;
          el.equipStatus = true;
          return el;
        } else {
          return el;
        }
      });
      this.characterEquipSlots[item.index] = item;
      helpers.putInLocalStorage(
        "characterEquipSlots",
        this.characterEquipSlots
      );
      helpers.putInLocalStorage("inventoryList", this.inventorySlots);
    },

    takeOffEquip(item) {
      const emptySlotId = this.findEmptySlot(this.inventorySlots).id;
      this.inventorySlots = this.inventorySlots.map((el) => {
        if (el.id === emptySlotId) {
          el = this.newItem(item);
          el.id = emptySlotId;
          el.isEquip = false;
          el.equipStatus = true;
          return el;
        } else {
          return el;
        }
      });
      this.characterEquipSlots[item.index] = {
        name: "empty",
        id: [item.id],
        slotEmptyStatus: true,
        damage: 0,
        criticalDamage: 0,
        armor: 0,
        healthPoints: 0,
        accuracy: 0,
        missChance: 0,
      };
      helpers.putInLocalStorage(
        "characterEquipSlots",
        this.characterEquipSlots
      );
      helpers.putInLocalStorage("inventoryList", this.inventorySlots);
    },

    deleteItemFromQuickInventory(item) {
      this.quickInventorySlots = this.quickInventorySlots.map((el) => {
        if (el.id === item.id) {
          return (el = this.newEmptySlot(item));
        } else {
          return el;
        }
      });
      helpers.putInLocalStorage("quickInventoryList", this.quickInventorySlots);
    },

    moveItem(item) {
      if (item.quickStatus && !item.onQuickInventory) {
        this.moveItemToQuickInventory(item);
      } else if (item.onQuickInventory) {
        this.moveItemToInventory(item);
      } else if (!item.isEquip) {
        this.equipWithAnItem(item);
      } else if (item.isEquip) {
        this.takeOffEquip(item);
      }
    },

    deleteItemFromEquipInventory(item) {
      this.characterEquipSlots[item.index] = {
        name: "empty",
        id: [item.id],
        slotEmptyStatus: true,
        damage: 0,
        criticalDamage: 0,
        armor: 0,
        healthPoints: 0,
      };
      helpers.putInLocalStorage(
        "characterEquipSlots",
        this.characterEquipSlots
      );
    },

    deleteItemFromInventory(item) {
      this.inventorySlots = this.inventorySlots.map((el) => {
        if (el.id === item.id) {
          return (el = this.newEmptySlot(item));
        } else {
          return el;
        }
      });
      helpers.putInLocalStorage("inventorySlots", this.inventorySlots);
    },

    deleteItem(item) {
      if (item.onQuickInventory) {
        this.deleteItemFromQuickInventory(item);
      } else if (item.isEquip) {
        this.deleteItemFromEquipInventory(item);
      } else {
        this.deleteItemFromInventory(item);
      }
    },
  },

  mounted() {
    this.inventorySlots = config.inventorySlots;
    this.quickInventorySlots = config.quickInventorySlots;

    if (localStorage.inventoryList) {
      this.inventorySlots = JSON.parse(localStorage.getItem("inventoryList"));
    } else {
      helpers.putInLocalStorage("inventoryList", this.inventorySlots);
    }
    if (localStorage.quickInventoryList) {
      this.quickInventorySlots = JSON.parse(
        localStorage.getItem("quickInventoryList")
      );
    } else {
      helpers.putInLocalStorage("quickInventoryList", this.quickInventorySlots);
    }
    if (localStorage.characterEquipSlots) {
      this.characterEquipSlots = JSON.parse(
        localStorage.getItem("characterEquipSlots")
      );
    } else {
      helpers.putInLocalStorage(
        "characterEquipSlots",
        this.characterEquipSlots
      );
    }
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
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  gap: 30px;
  color: #f9c290;
}

.character-screen__header-text {
  margin: 30px 0 0 0;
  font-weight: 400;
  font-size: 36px;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
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

.character {
  height: 322px;
}

.character-container__equip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  width: 280px;
  height: 357px;
  background: #866241;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}

.character-screen__slots {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
}
</style>
