<template>
  <div class="modal">
    <div class="modal__window">
      <h1 class="window__header">VICTORY</h1>
      <div class="window__content">
        <div class="content__items-received">
          <h2 class="items-received__header">Items received</h2>
          <div class="items-received__items">
            <dropped-item
              v-for="(item, index) in currentLocation.droppedItems"
              :key="index"
              :item="item"
            />
          </div>
        </div>
        <div class="content__buttons">
          <my-button
            v-for="(button, index) in buttonsContent"
            :key="index"
            @click="leaveBattleground(button.route)"
            >{{ button.text }}</my-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DroppedItem from "./DroppedItem.vue";
import helpers from "@/utils/helpers";
import locations from "@/data/locations";
import items from "@/data/items/items";
import characterProgress from "@/data/characterProgress";

export default {
  components: {
    DroppedItem,
  },
  props: {
    currentLocation: {
      type: Object,
    },
  },
  data() {
    return {
      buttonsContent: [
        {
          text: "Inventory",
          route: "/character",
        },
        {
          text: "Map",
          route: "/map",
        },
      ],
    };
  },
  methods: {
    findEmptySlot(arr) {
      return arr.find((el) => el.slotEmptyStatus);
    },
    leaveBattleground(route) {
      let inventoryList = helpers.getFromLocalStorage("inventoryList");
      this.currentLocation.droppedItems.forEach((item) => {
        const sameItem = inventoryList.find((el) => el.name === item.name);
        if (!sameItem) {
          const emptySlotId = this.findEmptySlot(inventoryList).id;
          inventoryList = inventoryList.map((el) => {
            if (el.id === emptySlotId) {
              el = item;
              el.id = emptySlotId;
              return el;
            } else {
              return el;
            }
          });
        } else {
          inventoryList = inventoryList.map((el) => {
            if (el.name === sameItem.name) {
              el.charge += 1;
              return el;
            } else {
              return el;
            }
          });
        }
      });
      helpers.putInLocalStorage("inventoryList", inventoryList);
      if (!locations[this.currentLocation.id - 1].passedStatus) {
        characterProgress[1].value += this.currentLocation.earnedExperience;
      }
      locations.forEach((el) => {
        if (el.id === this.currentLocation.id) {
          el.passedStatus = true;
          el.droppedItems = [items.healingPotion, items.attackPotion];
        }
      });
      this.$router.push(route);
      this.$emit("showHeader");
    },
  },
};
</script>

<style>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  display: flex;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 5;
  padding: 0 15px;
}

.modal__window {
  padding: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  background: rgba(175, 148, 132, 0.95);
  border-radius: 15px;
  gap: 15px;
}

.window__header {
  margin: 0;
  font-size: 40px;
  font-weight: 400;
  color: #6c4d30;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.window__content {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.content__items-received {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 30px;
  background: rgba(122, 87, 55, 0.6);
  border-radius: 15px;
  width: 100%;
}

.items-received__header {
  margin: 0;
  color: #f9c290;
  font-weight: 400;
  font-size: 30px;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.items-received__items {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
}

.content__buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}
</style>
