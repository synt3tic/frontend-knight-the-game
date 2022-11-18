<template>
  <div class="info-block">
    <div v-for="info in characterInformation" :key="info.name" class="text-info">
      <div>{{info.name}}</div>
      <div>{{info.value}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      characterInformation: [
        {
          name: "Damage",
          value: 15,
        },
        {
          name: "Armor",
          value: 10,
        },
        {
          name: "Regeneration",
          value: 1,
        },
        {
          name: "Critical Damage",
          value: 5,
        },
        {
          name: "Level",
          value: 1,
        },
      ],
    };
  },
};
</script>

<style scoped>
.info-block {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 708px;
  height: 222px;
  margin-top: 30px;
  background: #866241;
  box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}

.text-info {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  height: 46px;
  font-size: 20px;
  width: 203.82px;
  height: 45.54px;
}
</style>