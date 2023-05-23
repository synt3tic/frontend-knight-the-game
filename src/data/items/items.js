export default {
  healingPotion: {
    name: "Healing Potion",
    description: 'Restores 25 health when used.',
    restoresHealth: 25,
    charge: 1,
    quickStatus: true,
    onQuickInventory: false,
    imageUrl: '/icons/healingPotion.png'
  },
  attackPotion: {
    name: "Attack Potion",
    description: 'Increases damage to the enemy by 25% for 5 seconds.',
    increaseDamage: 25,
    timeOfAction: 3000,
    charge: 1,
    quickStatus: true,
    onQuickInventory: false,
    imageUrl: '/icons/attackPotion.png'
  },
}

