<template>
  <div class="modal">
    <div class="modal__window">
      <h2 class="modal__header">Location 1</h2>
      <div class="modal__location-description">
        <img class="location__image" src="../images/background.png" alt="location-image" />
        <div class="location__description">
          <p class="description__text">Here is a description of the specific location.</p>
        </div>
      </div>
      <div class="modal__location-info">
        <div class="location-info__text">
          <h3 class="text__header">Information</h3>
          <div class="text__list">
            <div class="list__header">
              <h4
                v-for="(header, index) in locationInfoHeaders"
                :key="index"
                class="text"
              >{{header}}</h4>
            </div>
            <div class="list__value">
              <h4
                v-for="(header, index) in locationInfoValues"
                :key="index"
                class="text"
                :class="{ text__green: header === 'Easy' || header === 'Passed'}"
              >{{header}}</h4>
            </div>
          </div>
        </div>
        <div class="location-info__opponents">
          <h3 class="text__header">Opponents</h3>
          <div class="opponents__images"></div>
        </div>
      </div>
      <my-button class="modal__button">Start</my-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      locationInfoHeaders: [
        "Difficult",
        "Recommended Level",
        "Number of opponents",
        "Status",
      ],
      locationInfoValues: ["Easy", "1", "2", "Not Passed"],
    };
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url(../images/map.png);
  border-radius: 15px;
}

.modal__window {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  width: 897px;
  height: 736px;
  background: rgba(122, 87, 55, 0.95);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}

.modal__header {
  font-weight: 400;
  font-size: 32px;
  color: #f9c290;
}

.modal__location-description {
  display: flex;
  gap: 40px;
}

.location__image {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 15px;
}

.location__description {
  display: flex;
  justify-content: center;
  width: 285px;
  height: 271.5px;
  background: rgba(249, 194, 144, 0.07);
  border-radius: 15px;
}

.description__text {
  font-weight: 400;
  font-size: 24px;
  line-height: 120%;
  letter-spacing: 0.02em;
  color: #f9c290;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 245px;
  height: 230px;
}

.modal__location-info {
  display: flex;
  gap: 112px;
  width: 808.5px;
  height: 222px;
  background: rgba(249, 194, 144, 0.07);
  border-radius: 15px;
}

.location-info__text {
  display: flex;
  flex-direction: column;
  gap: 11px;
  width: 300px;
  height: 172px;
}

.text__header {
  margin-top: 20px;
  margin-bottom: 0;
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  color: #f9c290;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.text__list {
  display: flex;
}

.list__header {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-left: 28px;
}

.text {
  margin: 0;
  font-weight: 400;
  font-size: 16px;
  color: #f9c290;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.text__green {
  color: #94ff41;
}

.list__value {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-left: 28px;
  text-align: end;
}

.location-info__opponents {
  width: 307.5px;
  height: 180px;
}

.opponents__images {
  display: flex;
}

.modal__button {
  width: 240px;
  height: 52.5px;
  font-weight: 400;
  font-size: 20px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>