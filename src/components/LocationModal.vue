<template>
  <div class="modal" @click="hideModal">
    <div class="modal__window" @click.stop>
      <h2 class="modal__header">{{  location.name  }}</h2>
      <div class="modal__location-description">
        <img class="location__image" :src="locationImage" alt="location-image" />
        <div class="location__description">
          <p class="description__text">{{  location.description  }}</p>
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
                v-for="(value, index) in locationInfoValues"
                :key="index"
                :class="getTextClasses(value)"
              >{{  value  }}</h4>
            </div>
          </div>
        </div>
        <div class="location-info__enemies">
          <h3 class="text__header">Enemies</h3>
          <div
          class="enemies__images"
          >
            <img 
            v-for="(image, index) in location.enemiesImages" 
            :key="index"
            :src="getImageUrl(image)" 
            alt="enemy-image" />
          </div>
        </div>
      </div>
      <my-button class="modal__button">Start</my-button>
    </div>
  </div>
</template>

<script>
import helpers from '@/utils/helpers';

export default {
  props: {
    location: {
      type: Object,
    }
  },
  data() {
    return {
      locationInfoHeaders: [
        "Difficult",
        "Recommended Level",
        "Number of opponents",
        "Status",
      ],
    };
  },
  methods: {
    hideModal() {
      this.$emit("hideModal");
    },
    getImageUrl(imageSrc) {
      return helpers.getImgUrl(imageSrc)
    },
    getTextClasses(value) {
      return ["text", {
        text_green: value === "Easy" || value === "Passed",
        text_yellow: value === "Medium",
        text_red: value === "Hard",
      }]
    }
  },
  computed: {
    locationImage() {
      return helpers.getImgUrl(this.location.imageUrl)
    },
    locationInfoValues() {
      const values = [
        this.location.difficult, 
        this.location.recommendedLevel, 
        this.location.numberOfEnemies,
      ]
      if(this.location.passedStatus){
        values.push("Passed")
      } else {
        values.push("Not Passed")
      }
      return values
    },
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
  border-radius: 15px;
}

.modal__window {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
  width: 897px;
  height: 736px;
  background: rgba(122, 87, 55, 0.95);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
}

.modal__header {
  font-weight: 400;
  font-size: 32px;
  color: #f9c290;
  margin: 0;
}

.modal__location-description {
  display: flex;
  gap: 40px;
}

.location__image {
  width: 484px;
  height: 272px;
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));
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
  font-size: 20px;
  line-height: 120%;
  letter-spacing: 0.02em;
  color: #f9c290;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
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
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.text__list {
  display: flex;
  justify-content: space-between;
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
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.text_green {
  color: #94ff41;
}

.text_yellow {
  color: #ffdc41;
}

.text_red {
  color: #ff4141;
  
}

.list__value {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-left: 28px;
  text-align: end;
}

.location-info__enemies {
  display: flex;
  flex-direction: column;
  width: 307.5px;
  height: 180px;
}
.enemies__images {
  display: flex;
  justify-content: center;
}

.modal__button {
  width: 240px;
  height: 52.5px;
  font-weight: 400;
  font-size: 28px;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}
</style>