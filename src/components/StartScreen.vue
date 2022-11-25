<template>
  <div class="main">
    <h1 class="main__header">
      FRONTEND KNIGHT
      <br />THE GAME
    </h1>
    <img class="main__image" src="../images/start-page-image.png" alt="knight-image" />
    <my-button @click="startGame" class="main__button">START</my-button>
  </div>
</template>

<script>
export default {
  methods: {
    startGame() {
      this.$router.push("/character");
      this.$emit("startGame");
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__link {
  font-family: "Alike Angular";
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 0%;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding-right: 90px;
  padding-left: 90px;
  color: #f9c290;
  text-decoration: none;
}

.header__link:hover {
  color: #cf7523;
}

.header__name {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  width: 688px;
  height: 87px;
  background: rgba(117, 83, 52, 0.75);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 15px 15px;
  font-size: 36px;
  font-weight: 400;
  color: #f9c290;
  text-shadow: 3px 4px 4px rgba(0, 0, 0, 0.25);
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
}

.main__header {
  text-align: center;
  font-family: "Almendra SC", serif;
  font-weight: 400;
  font-size: 36px;
  color: #f9c290;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.main__image {
  width: 656px;
  height: 349px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.main__button {
  width: 256px;
  height: 74px;
  font-weight: 400;
  font-size: 36px;
}
</style>