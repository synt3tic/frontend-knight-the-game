<template>
  <div class="slot-container">
    <div
      :class="slotSizeClasses"
      @click="openInteractionMenu"
    >
      <img 
      :src="imageSource"
      :class="{small: item.onQuickInventory}"
      alt="item-image" 
      />
    </div>
    <interaction-menu
      v-if="isInteractionMenuActive"
      :item="item"
      @moveItem="moveItem"
      @deleteItem="deleteItem"
    />
  </div>
</template>

<script>
import helpers from "@/utils/helpers";

export default {
  props: {
    slotSize: {
      type: String,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isInteractionMenuActive: false,
    };
  },

  computed: {
    slotSizeClasses() {
      return ['slot', {
        slot_medium: this.slotSize === "medium",
        slot_small: this.slotSize === "small",
        slot_large: this.slotSize === "large"
      }]
    },

    imageSource() {
      let source;
      this.item.slotEmptyStatus
        ? (source = require("@/images/empty.png"))
        : (source = helpers.getImgUrl(this.item.imageUrl));
      return source;
    },
  },
  methods: {
    openInteractionMenu() {
      if (!this.item.slotEmptyStatus) {
        this.isInteractionMenuActive = !this.isInteractionMenuActive;
      }
    },
    moveItem(item) {
      this.$emit("moveItem", item);
      this.isInteractionMenuActive = false;
    },
    deleteItem(item) {
      this.$emit("deleteItem", item);
      this.isInteractionMenuActive = false;
    },
  },
  name: "inventory-slot",
};
</script>

<style scoped>
.slot-container {
  position: relative;
}

.slot {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9c290;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}

.slot_small {
  width: 66px;
  height: 66px;
}

.slot_medium {
  width: 130px;
  height: 130px;
}

.slot_large {
  width: 100px;
  height: 200px;
}

.slot:hover {
  cursor: pointer;
  background: #c99668;
}

.small {
  width: 60px;
}
</style>