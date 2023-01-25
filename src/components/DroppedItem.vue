<template>
  <div class="item-card">
    <div class="item-card__icon">
      <img :src="imageSrc" alt="item-icon" />
    </div>
    <div class="item-card__description">
      <h4 class="description__header">{{ item.name }}</h4>
      <p class="description__info">{{ item.description }}</p>
    </div>
  </div>
</template>

<script>
import helpers from "@/utils/helpers";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imageSrc() {
      return helpers.getImgUrl(this.item.imageUrl);
    },
  },
};
</script>

<style scoped>
.item-card {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  width: 330px;
  height: 125px;
  background: rgba(249, 194, 144, 0.95);
  border-radius: 15px;
  color: #6c4d30;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.item-card__description {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  width: 190px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.item-card__icon {
  align-self: center;
}

.description__header {
  margin: 0;
  font-weight: 500;
  font-size: 20px;
}

.description__info {
  font-size: 14px;
  color: #815c3a;
}
</style>
