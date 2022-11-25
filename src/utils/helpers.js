export default {
  getImgUrl: function (imageName) {
    return require('@/images' + imageName)
  },
  newItem: function (item) {
    return { ...{}, ...item };
  },
  findEmptySlot: function (arr) {
    const emptySlot = arr.find((el) => {
      return el.slotEmptyStatus;
    });
    return emptySlot
  },
  emptySlot: function (item) {
    return {
      id: item.id,
      slotEmptyStatus: true,
    }
  }
}