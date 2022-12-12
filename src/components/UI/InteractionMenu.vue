<template>
  <div :class="interactionMenuClasses">
    <my-button @click="moveItem">{{  buttonText  }}</my-button>
    <my-button @click="deleteItem">Delete item</my-button>
  </div>
</template>

<script>
export default {
  name: "interaction-menu",
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    interactionMenuClasses() {
      return [
        "interaction-menu", 
        {
          "interaction-menu_small": this.item.onQuickInventory,
          "interaction-menu_large": this.item.isEquip,
        }
      ]
    },
    buttonText() {
      let result;
      if (this.item.quickStatus) {
        result = "To Quick Inventory";
      } else if (this.item.onQuickInventory || this.item.isEquip) {
        result = "To Inventory";
      } else if (!this.item.isEquip) {
        result = "Equip";
      }
      return result;
    },
  },
  methods: {
    moveItem() {
      this.$emit("moveItem", this.item);
    },
    deleteItem() {
      this.$emit("deleteItem", this.item);
    },
  },
};
</script>

<style scoped>
.interaction-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  width: 300px;
  height: 210px;
  background: #866241;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  position: absolute;
  left: 130px;
  top: 50px;
  z-index: 1;
}

.interaction-menu_small {
  left: 65px;
  top: 20px;
}

.interaction-menu_large {
  left: 72px;
  top: 20px;
}
</style>