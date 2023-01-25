<template>
  <div class="battleground" :style="backgroundImage">
    <div v-if="timerStatus" class="battleground__timer">
      <h1>{{ timerValue }}</h1>
    </div>
    <my-modal
      v-if="isModalActive || currentHealthPoints === 0"
      :modalContent="modalContent"
      @hideModal="changePauseModalStatus"
      @showHeader="$emit('showHeader')"
      @restartGame="startGame"
    />
    <victory-modal
      v-if="victoryState"
      :currentLocation="currentLocation"
      @showHeader="$emit('showHeader')"
    />
    <button
      v-if="currentHealthPoints > 0"
      :class="pauseButtonClasses"
      @click="changePauseModalStatus"
    />
    <h2 v-show="isAttackPotionBeenUsed" class="battleground__boost-indicator">
      Attack Boost for 3 seconds
    </h2>
    <game-hud
      :itemBeenUsed="isAttackPotionBeenUsed"
      :currentHealthPoints="currentHealthPoints"
      @useItem="useItem"
    />
    <div class="battleground__characters">
      <div class="characters">
        <div class="characters__attack-status">
          {{
            attackStatusText(
              currentDamageReceived,
              isHeroAttacked,
              isEnemyCriticalDamageDealt
            )
          }}
        </div>
        <div
          :style="healthBarColor(healthPointsValue, currentHealthPoints)"
          class="characters__health-bar"
        >
          {{ heroHealthPoints }}
        </div>
        <img
          :src="characterImageSrc"
          alt="character-image"
          :class="characterImageClasses"
        />
      </div>
      <div class="characters">
        <div class="characters__attack-status">
          {{
            attackStatusText(
              currentDamageDealt,
              isEnemyAttacked,
              isHeroCriticalDamageDealt
            )
          }}
        </div>
        <div
          :style="
            healthBarColor(enemyHealthPointsValue, currentEnemyHealthPoint)
          "
          class="characters__health-bar"
        >
          {{ enemyHealthPoints }}
        </div>
        <img
          :src="enemyImageSrc"
          alt="enemy-image"
          :class="enemyImageClasses"
          @click="attackEnemy"
        />
        <p v-if="isEnemyAttacked" class="characters__wait-attack">WAIT</p>
      </div>
    </div>
  </div>
</template>

<script>
import helpers from "@/utils/helpers";
import config from "@/data/config";
import GameHud from "@/components/GameHud.vue";
import VictoryModal from "@/components/VictoryModal.vue";

export default {
  data() {
    return {
      currentLocation: null,
      hero: null,
      enemy: null,
      isModalActive: false,
      isGameOnPause: false,
      timerStatus: false,
      timerValue: null,
      healthPointsValue: null,
      currentHealthPoints: null,
      enemyHealthPointsValue: null,
      currentEnemyHealthPoint: null,
      isEnemyAttacked: false,
      isHeroAttacked: false,
      currentDamageDealt: null,
      currentDamageReceived: null,
      isHeroCriticalDamageDealt: false,
      isEnemyCriticalDamageDealt: false,
      isAttackPotionBeenUsed: false,
      victoryState: false,
      currentStage: 1,
    };
  },
  components: {
    GameHud,
    VictoryModal,
  },
  computed: {
    backgroundImage() {
      const location = helpers.getFromLocalStorage("currentLocation");
      return `background-image: url(${helpers.getImgUrl(location.imageUrl)});`;
    },
    enemyImageSrc() {
      const enemies = helpers.getFromLocalStorage("currentLocation").enemies;
      if (this.currentStage < 2) {
        if (this.isEnemyAttacked && this.currentDamageDealt) {
          return helpers.getImgUrl(enemies.firstEnemy.attackedImageUrl);
        } else {
          return helpers.getImgUrl(enemies.firstEnemy.imageUrl);
        }
      } else {
        if (this.isEnemyAttacked && this.currentDamageDealt) {
          return helpers.getImgUrl(enemies.secondEnemy.attackedImageUrl);
        } else {
          return helpers.getImgUrl(enemies.secondEnemy.imageUrl);
        }
      }
    },
    characterImageSrc() {
      const equipSlots = helpers.getFromLocalStorage("characterEquipSlots");
      const currentEquip = equipSlots[0].name + equipSlots[1].name;
      if (this.isHeroAttacked && this.currentDamageReceived) {
        return helpers.getImgUrl(
          `/character/${config.coupleOfEquip[currentEquip]}attacked.png`
        );
      } else {
        return helpers.getImgUrl(
          `/character/${config.coupleOfEquip[currentEquip]}.png`
        );
      }
    },
    enemyImageClasses() {
      return [
        "enemy__image",
        {
          enemy__image_died: this.currentEnemyHealthPoint === 0,
          enemy__image_attacked:
            this.isEnemyAttacked && this.currentDamageDealt > 0,
        },
      ];
    },
    characterImageClasses() {
      return [
        "character__image",
        {
          character__image_died: this.currentHealthPoints === 0,
          character__image_attacked:
            this.isHeroAttacked && this.currentDamageReceived > 0,
        },
      ];
    },
    pauseButtonClasses() {
      return [
        "battleground__pause-button",
        {
          "battleground__pause-button_active": this.isModalActive,
        },
      ];
    },
    enemyHealthPoints() {
      return `${this.currentEnemyHealthPoint} / ${this.enemyHealthPointsValue}`;
    },
    heroHealthPoints() {
      return `${this.currentHealthPoints} / ${this.healthPointsValue}`;
    },
    modalContent() {
      let content;
      if (this.currentHealthPoints > 0) {
        content = config.pauseModalContent;
      } else {
        content = config.characterDiedModalContent;
      }
      return content;
    },
  },
  methods: {
    changePauseModalStatus() {
      this.isModalActive = !this.isModalActive;
      this.isGameOnPause = !this.isGameOnPause;
      if (!this.isGameOnPause) {
        this.timerStatus = true;
        this.timerValue = 3;
        this.timer();
      }
    },
    timer() {
      if (this.timerValue) {
        return setTimeout(() => {
          --this.timerValue;
          this.timer();
        }, 1000);
      }
      this.timerStatus = false;
      this.enemyStrike();
    },
    healthBarColor(healthPoints, currentHealthPoints) {
      let result;
      if (
        currentHealthPoints < healthPoints &&
        currentHealthPoints >= healthPoints * 0.75
      ) {
        result = "background: #D9FF41";
      } else if (
        currentHealthPoints < healthPoints * 0.75 &&
        currentHealthPoints >= healthPoints * 0.5
      ) {
        result = "background: #FFBE41";
      } else if (
        currentHealthPoints < healthPoints * 0.5 &&
        currentHealthPoints >= healthPoints * 0.25
      ) {
        result = "background: #FF9141";
      } else if (currentHealthPoints < healthPoints * 0.25) {
        result = "background: #FF4141";
      } else {
        result = "background: #94FF41";
      }
      return result;
    },
    attackStatusText(currentDamage, isAttacked, criticalDamage) {
      let result;
      if (!isAttacked) {
        result = "⠀";
      } else if (currentDamage === 0 && isAttacked) {
        result = "Miss";
      } else if (currentDamage > 0 && isAttacked && criticalDamage) {
        result = "CRITICAL";
      } else if (currentDamage > 0 && isAttacked) {
        result = `-${currentDamage}`;
      }
      return result;
    },
    damageCalculation(
      isHeroDealDamage,
      Damage,
      Accuracy,
      Armor,
      criticalDamage
    ) {
      const criticalDamageMultiplier = Math.random() + 2;
      let damageValue;
      if (Math.random() * 100 <= Accuracy) {
        if (Math.random() * 100 <= criticalDamage) {
          damageValue =
            Damage * ((100 - Armor) / 100) * criticalDamageMultiplier;
          if (isHeroDealDamage) {
            this.isHeroCriticalDamageDealt = true;
          } else {
            this.isEnemyCriticalDamageDealt = true;
          }
        } else {
          damageValue = Damage * ((100 - Armor) / 100);
        }
      } else {
        damageValue = 0;
      }
      return Math.floor(damageValue);
    },
    attackEnemy() {
      if (!this.isEnemyAttacked) {
        this.isEnemyAttacked = true;
        this.currentDamageDealt = this.damageCalculation(
          true,
          this.hero[0].value,
          this.hero[4].value,
          this.enemy.armor,
          this.hero[3].value
        );
        this.currentEnemyHealthPoint -= this.currentDamageDealt;
        if (this.currentEnemyHealthPoint <= 0) {
          if (this.currentStage < 2 && this.currentLocation.enemies.secondEnemy) {
            this.currentEnemyHealthPoint = 0;
            this.timerStatus = true;
            this.timerValue = 3;
            this.timer();
            setTimeout(() => {
              this.currentStage = 2;
              this.enemy = this.currentLocation.enemies.secondEnemy;
              this.enemyHealthPointsValue = this.enemy.healthPoints;
              this.currentEnemyHealthPoint = this.enemy.healthPoints;
            }, 2000);
          } else {
            this.currentEnemyHealthPoint = 0;
            this.victoryState = true;
          }
        }
        setTimeout(() => {
          this.isEnemyAttacked = false;
          this.currentDamageDealt = null;
          this.isHeroCriticalDamageDealt = false;
        }, 800);
      }
    },
    enemyStrike() {
      if (!this.isGameOnPause) {
        if (
          this.currentEnemyHealthPoint > 0 &&
          this.timerValue === 0 &&
          this.currentHealthPoints > 0
        ) {
          this.isHeroAttacked = true;
          this.currentDamageReceived = this.damageCalculation(
            false,
            this.enemy.damage,
            this.enemy.accuracy,
            this.hero[1].value,
            this.enemy.criticalDamageChance
          );
          this.currentHealthPoints -= this.currentDamageReceived;
          if (this.currentHealthPoints < 0) {
            this.currentHealthPoints = 0;
          }
          setTimeout(() => {
            this.isHeroAttacked = false;
            setTimeout(() => {
              this.enemyStrike();
            }, this.enemy.attackTimeout);
          }, 500);
        }
      }
    },
    useItem(item) {
      if (item.restoresHealth) {
        this.currentHealthPoints += item.restoresHealth;
      } else if (item.increaseDamage) {
        let damageIncrease = (this.hero[0].value * item.increaseDamage) / 100;
        this.hero[0].value += damageIncrease;
        this.isAttackPotionBeenUsed = true;
        setTimeout(() => {
          this.hero[0].value -= damageIncrease;
          this.isAttackPotionBeenUsed = false;
        }, item.timeOfAction);
      }
    },
    startGame() {
      this.hero = helpers.getFromLocalStorage("characteristics");
      this.currentLocation = helpers.getFromLocalStorage("currentLocation");
      this.enemy = this.currentLocation.enemies.firstEnemy;
      this.healthPointsValue = this.hero[2].value;
      this.currentHealthPoints = this.healthPointsValue;
      this.enemyHealthPointsValue = this.enemy.healthPoints;
      this.currentEnemyHealthPoint = this.enemyHealthPointsValue;
      this.isModalActive = false;
      this.isGameOnPause = false;
      this.timerStatus = true;
      this.timerValue = 3;
      this.currentStage = 1;
      this.timer();
    },
  },
  mounted() {
    this.startGame();
  },
};
</script>

<style scoped>
.battleground {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  position: relative;
  width: 1920px;
  height: 1080px;
}

.battleground__timer {
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgb(0, 0, 0, 0.4);
  z-index: 5;
  font-size: 200px;
  color: #724717;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.battleground__timer:hover {
  cursor: default;
}
.battleground__pause-button {
  width: 90px;
  height: 90px;
  border: none;
  background-image: url(../images/pause-button.svg);
  border-radius: 50%;
  position: absolute;
  top: 16px;
  left: 16px;
  transition-duration: 300ms;
  opacity: 0.6;
  z-index: 2;
}

.battleground__pause-button:hover {
  cursor: pointer;
  transform: rotate(90deg);
  transition-duration: 300ms;
  opacity: 1;
}

.battleground__pause-button_active {
  transform: rotate(90deg);
}

.battleground__boost-indicator {
  position: absolute;
  top: 16px;
  left: 155px;
  font-size: 34px;
  color: #ad0202;
}

.battleground__characters {
  display: flex;
  gap: 150px;
}

.characters {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.character__image {
  transition-duration: 100ms;
  height: 500px;
}

.character__image_attacked {
  transition-duration: 100ms;
  transform: rotate(-4deg);
}

.character__image_died {
  transition-duration: 100ms;
  position: absolute;
  bottom: 0;
  transform: rotate(-90deg);
}

.enemy__image {
  height: 500px;
  transform: scale(-1, 1);
}

.enemy__image_attacked {
  transition-duration: 100ms;
  transform: scale(-1, 1) rotate(-4deg);
}

.enemy__image_died {
  position: absolute;
  bottom: 0;
  transform: scale(-1, 1) rotate(-90deg);
}

.enemy__image:hover {
  opacity: 0.85;
  cursor: url(../images/cursor-sword.png), auto;
}

.characters__health-bar {
  cursor: default;
  width: 250px;
  height: 25px;
  border: 1px solid #000000;
  border-radius: 15px;
  text-align: center;
}

.characters__attack-status {
  font-family: "Alike Angular";
  font-size: 32px;
  color: #d82424;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.characters__wait-attack {
  position: absolute;
  font-family: "Alike Angular";
  font-size: 64px;
  color: #ff0000;
  top: 150px;
  left: 46%;
}
</style>
