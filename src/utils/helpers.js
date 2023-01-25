export default {
  getImgUrl(imageName) {
    return require('@/images' + imageName)
  },
  putInLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
  },
}