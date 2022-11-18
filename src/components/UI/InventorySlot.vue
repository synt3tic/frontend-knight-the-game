<template>
  <div
    class="slot"
    :class="{
      slot_large: slotSize === 'large', 
      slot_medium: slotSize === 'medium'}"
  ></div>
</template>

<script>
export default {
  props: {
    slotSize: {
      type: String,
      required: true,
    },
  },
  name: "inventory-slot",
};
</script>

<style scoped>
.slot {
  background: #f9c290;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}

.slot_medium {
  width: 66px;
  height: 66px;
}

.slot_large {
  width: 130px;
  height: 130px;
}

.slot:hover {
  cursor: pointer;
  background: #c99668;
}
</style>