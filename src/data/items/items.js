
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
      name: 'Legendary Armor',
      armor: 10,
      regeneration: 3,
      imageUrl: '/icons/legendaryArmor.png',
      equipStatus: true,
      isEquip: false,
      quickStatus: false,
      index: 1,
    },
  }
]

export default itemsList