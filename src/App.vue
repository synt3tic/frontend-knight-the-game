<template>
  <header class="header" v-if="headerVisibleStatus">
    <router-link class="header__link" to="/character">Character</router-link>
    <div>
      <h1 class="header__name">Frontend Knight</h1>
    </div>
    <router-link class="header__link" to="/map">Map</router-link>
  </header>
  <router-view 
    @startGame="changeHeaderVisibleStatus" 
    @hideHeader="changeHeaderVisibleStatus"
    @showHeader="changeHeaderVisibleStatus"
  />
</template>

<script>
export default {
  data() {
    return {
      headerVisibleStatus: false,
    };
  },
  methods: {
    changeHeaderVisibleStatus() {
      this.headerVisibleStatus = !this.headerVisibleStatus;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Alike+Angular&family=Comfortaa:wght@300&family=Questrial&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Alike+Angular&family=Almendra+SC&family=Comfortaa:wght@300&family=Questrial&display=swap");

body {
  background-color: rgba(134, 98, 65);
  font-family: "Alike Angular", serif;
  margin: 0;
}

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
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  padding-right: 90px;
  padding-left: 90px;
  color: #f9c290;
  text-decoration: none;
}

.header__link:hover {
  color: #cf7523;
  transition-duration: 200ms;
}

.header__name {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  width: 688px;
  height: 87px;
  background: rgba(117, 83, 52, 0.75);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0 0 15px 15px;
  font-size: 36px;
  font-weight: 400;
  color: #f9c290;
  text-shadow: 3px 4px 4px rgba(0, 0, 0, 0.25);
}

.router-link-active {
  color: #cf7523;
}
</style>