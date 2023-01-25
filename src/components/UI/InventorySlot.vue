<template>
  <div class="slot-container">
    <div :class="slotSizeClasses" @click="interactWithItem">
      <img :src="imageSource" :class="iconSizeClasses" alt="item-image" />
      <div v-if="item.charge > 1" :class="chargeIndicatorTextClasses">
        <p>{{ item.charge }}</p>
      </div>
      <div></div>
    </div>
    <transition name="slide">
      <interaction-menu
        v-if="isInteractionMenuActive"
        :item="item"
        @moveItem="moveItem"
        @deleteItem="deleteItem"
      />
    </transition>
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
    onTheBattleground: {
      type: Boolean,
    },
  },

  data() {
    return {
      isInteractionMenuActive: false,
    };
  },

  computed: {
    slotSizeClasses() {
      return [
        "slot",
        {
          slot_medium: this.slotSize === "medium",
          slot_small: this.slotSize === "small",
          slot_large: this.slotSize === "large",
          "slot_extra-medium": this.slotSize === "extra-medium",
          "slot_extra-large": this.slotSize === "extra-large",
        },
      ];
    },

    imageSource() {
      let source;
      this.item.slotEmptyStatus
        ? (source = require("@/images/empty.png"))
        : (source = helpers.getImgUrl(this.item.imageUrl));
      return source;
    },

    iconSizeClasses() {
      return {
        small: this.slotSize === "small",
        medium: this.slotSize === "extra-medium",
        large: this.slotSize === "extra-large",
      };
    },
    chargeIndicatorTextClasses() {
      return [
        "slot__charge-indicator",
        {
          "charge-indicator_small": this.item.onQuickInventory,
        },
      ];
    },
  },
  methods: {
    interactWithItem() {
      if (!this.item.slotEmptyStatus && !this.onTheBattleground) {
        this.isInteractionMenuActive = !this.isInteractionMenuActive;
      } else if (this.onTheBattleground) {
        this.$emit("useItem", this.item);
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
  position: relative;
}

.slot__charge-indicator {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 16px;
  bottom: 16px;
  width: 36px;
  height: 36px;
  background: #866241;
  border-radius: 50%;
  font-size: 24px;
  color: #f9c290;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.charge-indicator_small {
  right: 4px;
  bottom: 4px;
  font-size: 18px;
  width: 26px;
  height: 26px;
}

.slot_small {
  width: 66px;
  height: 66px;
}

.slot_medium {
  width: 130px;
  height: 130px;
}

.slot_extra-medium {
  width: 90px;
  height: 90px;
  background: #866241b0;
}

.slot_large {
  width: 100px;
  height: 200px;
}

.slot_extra-large {
  width: 195px;
  height: 195px;
}

.slot:hover {
  cursor: pointer;
  background: #c99668;
  transition-duration: 200ms;
}

.small {
  width: 60px;
}

.medium {
  width: 75px;
}

.large {
  width: 140px;
}

.slide-enter, .slide-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
.slide-enter-active, .slide-leave-active {
  transition: all .5s;
}
/* .slide-enter-to
.slide-leave */
</style>
