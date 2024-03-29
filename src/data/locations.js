import weapons from "./items/weapons"
import armor from "./items/armor"
import enemies from "./enemies"
import items from "./items/items"

export default [
  {
    id: 1,
    name: "Edge Of The Forest",
    description: "The first forest is full of dangerous enemies wishing your death. However, this is only the beginning of your path ...",
    difficult: "Easy",
    recommendedLevel: 1,
    numberOfEnemies: 1,
    position: "bottom: 300px; left: 380px;",
    passedStatus: false,
    imageUrl: "/locations/forest1.png",
    enemies: {
      firstEnemy: enemies.firstViking
    },
    droppedItems: [weapons.knightsSpear, armor.knightsArmor, items.healingPotion, items.attackPotion],
    earnedExperience: 1400,
  },
  {
    id: 2,
    name: "Mori's Mount",
    description: "Mori is the daughter of the very first king of these lands. It was in honor of the future queen that he named this mountain. Now the forest at the foot of the mountain belongs to a band of Scandinavian barbarians led by Gisle. Hope you get out of there alive",
    difficult: "Medium",
    recommendedLevel: 2,
    numberOfEnemies: 2,
    position: "bottom: 380px; left: 480px;",
    passedStatus: false,
    imageUrl: "/locations/forest2.png",
    enemies: {
      firstEnemy: enemies.firstViking,
      secondEnemy: enemies.secondViking,
    },
    droppedItems: [weapons.executionersAxe, armor.executionersArmor, items.healingPotion, items.healingPotion, items.attackPotion],
    earnedExperience: 1600,
  },
  {
    id: 3,
    name: "Great Forest",
    description: "The Great Forest is full of great, and long forgotten secrets. Since it is closest to the castle captured by the barbarians, the forest is very well guarded. Be careful walking through it.",
    difficult: "Hard",
    recommendedLevel: 3,
    numberOfEnemies: 2,
    position: "bottom: 370px; right: 500px;",
    passedStatus: false,
    imageUrl: "/locations/forest3.png",
    enemies: {
      firstEnemy: enemies.thirdViking,
      secondEnemy: enemies.firstSamurai,
    },
    droppedItems: [weapons.kingSword, armor.kingArmor, items.healingPotion, items.attackPotion, items.healingPotion, items.healingPotion],
    earnedExperience: 2000,
  },
  {
    id: 4,
    name: "Mashtur Village",
    description: "The village of Mashtur was once the main supplier of grains and vegetables to the kingdom, due to which the population lived in abundance. This would have continued further, only the barbarians killed the king, and they preferred to take the grain by force rather than buy it. Therefore, half of the population was killed, the rest fell into slavery to the barbarians, who made this village their outpost",
    difficult: "Medium",
    recommendedLevel: 3,
    numberOfEnemies: 2,
    position: "bottom: 270px; right: 600px;",
    passedStatus: false,
    imageUrl: "/locations/village1.png",
    enemies: {
      firstEnemy: enemies.secondSamurai,
      secondEnemy: enemies.thirdSamurai,
    },
    droppedItems: [items.healingPotion, items.attackPotion, items.healingPotion],
    earnedExperience: 1000,
  }
]