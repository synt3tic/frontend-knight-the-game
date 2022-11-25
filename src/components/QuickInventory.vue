<template>
  <div class="quick-inventory">
    <h3 class="quick-inventory__header">Quick Inventory</h3>
    <button @click="showModal" class="quick-inventory__button">?</button>
    <div class="quick-inventory__slots">
      <inventory-slot
        v-for="item in quickInventorySlots"
        :key="item.id"
        slotSize="small"
        :item="item"
        @moveItem="moveItem"
        @deleteItem="deleteItem"
      ></inventory-slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    quickInventorySlots: {
      type: Array,
      require: true,
    },
  },
  methods: {
    moveItem(item) {
      this.$emit("moveItem", item);
    },
    deleteItem(item) {
      this.$emit("deleteItem", item);
    },
  },
};
</script>

<style scoped>
.quick-inventory {
  display: flex;
  align-items: center;
  gap: 33px;
  width: 708px;
  height: 105px;
  background: #866241;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}

.quick-inventory__header {
  margin-left: 24px;
  font-weight: 400;
  font-size: 24px;
  display: flex;
  align-items: center;
  color: #f9c290;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.quick-inventory__button {
  width: 34.5px;
  height: 34.5px;
  background: #f9c290;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  border: none;
  font-family: "Alike Angular";
  font-weight: 400;
  font-size: 20px;
  color: #866241;
}

.quick-inventory__button:hover {
  cursor: pointer;
  color: #f9c290;
  background: #866241;
  border: solid 1px #f9c290;
}

.quick-inventory__slots {
  display: flex;
  gap: 13.5px;
}
</style>