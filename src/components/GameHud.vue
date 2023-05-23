<template>
  <div class="hud">
    <div class="hud__state hud__state_icon">
      <img
        src="../images/health-icon.svg"
        alt="health-icon"
        class="state-icon"
      />
      <img
        src="../images/energy-icon.svg"
        alt="energy-icon"
        class="state-icon"
      />
    </div>
    <div class="hud__state hud__state_values">
      <div class="state-text">{{ currentHealthPoints }}/{{ healthPoints }}</div>
      <div class="state-text">120/130</div>
    </div>
    <inventory-slot
      v-for="(item, index) in quickInventorySlots"
      :key="index"
      :item="item"
      :onTheBattleground="true"
      :itemBeenUsed="itemBeenUsed"
      slotSize="extra-medium"
      @useItem="useItem"
    />
  </div>
</template>

<script>
import helpers from "@/utils/helpers";

export default {
  data() {
    return {
      quickInventorySlots: null,
    };
  },
  props: {
    currentHealthPoints: {
      type: Number,
    },
    itemBeenUsed: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    healthPoints() {
      const characteristics = JSON.parse(
        localStorage.getItem("characteristics")
      );
      return characteristics[2].value;
    },
  },
  methods: {
    useItem(item) {
      if (!this.itemBeenUsed) {
        if (item.charge > 1) {
          this.quickInventorySlots = this.quickInventorySlots.map((el) => {
            if (item.id === el.id) {
              item.charge -= 1;
              return item;
            } else {
              return el;
            }
          });
        } else {
          this.quickInventorySlots = this.quickInventorySlots.map((el) => {
            if (item.id === el.id) {
              return {
                id: item.id,
                slotEmptyStatus: true,
              };
            } else {
              return el;
            }
          });
        }
        helpers.putInLocalStorage(
          "quickInventoryList",
          this.quickInventorySlots
        );
        this.$emit("useItem", item);
      }
    },
  },
  mounted() {
    this.quickInventorySlots = JSON.parse(
      localStorage.getItem("quickInventoryList")
    );
  },
};
</script>

<style scoped>
.hud {
  display: flex;
  align-items: center;
  gap: 15px;
  width: 690px;
  height: 112px;
  background: rgba(249, 194, 144, 0.6);
  border-radius: 15px 15px 0 0;
}

.hud__state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15px;
  gap: 15px;
}
.hud__state_icon {
  margin-left: 15px;
}

.hud__state_values {
  gap: 28px;
  margin-right: 15px;
}

.state-icon {
  width: 30px;
  height: 30px;
}

.state-text {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  text-align: right;
}
</style>
