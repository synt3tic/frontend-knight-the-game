
const itemsList = [
  {
    item: {
      name: "Healing Potion",
      descripton: 'Restores 25 health when used. Replenishes automatically after each battle.',
      restoresHealth: 25,
      charge: 1,
      quickStatus: true,
      onQuickInventory: false,
      imageUrl: '/icons/healingPotion.png'
    },
  },
  {
    item: {
      item: "Enegry Potion",
      descripton: 'Restores 20 energy when used. Replenishes automatically after each battle.',
      restoresEnergy: 20,
      charge: 1,
      quickStatus: true,
      onQuickInventory: false,
      imageUrl: '/icons/energyPotion.png'
    },
  },
  {
    item: {
      item: "Attack Potion",
      descripton: 'Increases damage to the enemy by 25% for 5 seconds.',
      increaseDamage: 25,
      charge: 1,
      quickStatus: true,
      onQuickInventory: false,
      imageUrl: '/icons/attackPotion.png'
    },
  },
  {
    item: {
      name: "Knights Armor",
      armor: 10,
      regeneration: 3,
      imageUrl: '/icons/knightsArmor.png',
      equipStatus: true,
      isEquip: false,
      quickStatus: false,
      index: 1,
    },
  },
  {
    item: {
      name: "Knights Spear",
      damage: 15,
      criticalDamage: 1,
      imageUrl: '/icons/knightsSpear.png',
      equipStatus: true,
      isEquip: false,
      quickStatus: false,
      index: 0,
    }
  },
  {
    item: {
      name: "Executioner's Axe",
      damage: 24,
      criticalDamage: 15,
      imageUrl: '/icons/executionersAxe.png',
      equipStatus: true,
      isEquip: false,
      quickStatus: false,
      index: 0,
    },
  },
  {
    item: {
      name: "King Sword",
      damage: 36,
      criticalDamage: 23,
      imageUrl: '/icons/kingSword.png',
      equipStatus: true,
      isEquip: false,
      quickStatus: false,
      index: 0,
    },
  },
  {
    item: {
      name: "Executioners Armor",
      armor: 10,
      regeneration: 3,
      imageUrl: '/icons/executionersArmor.png',
      equipStatus: true,
      isEquip: false,
      quickStatus: false,
      index: 1,
    },
  },
  {
    item: {
      name: "King Armor",
      armor: 10,
      regeneration: 3,
      imageUrl: '/icons/kingArmor.png',
      equipStatus: true,
      isEquip: false,
      quickStatus: false,
      index: 1,
    },
  },
]

export default itemsList