<template>
  <div>
    <img 
    :src="imageSrc" 
    alt="character-image" 
    class="character" 
    />
  </div>
</template>

<script>
import helpers from '@/utils/helpers';

export default {
  props: {
    equipItems: {
      type: Array,
      require: true
    }
  },
  methods: {
    items(arr) {
      return arr
    },
  },
  computed: {
    imageSrc() {
      const a = this.items(this.equipItems)
      let ImageUrl = ""
      console.log(a)
      if(a[0].slotEmptyStatus && a[1].slotEmptyStatus) {
        ImageUrl = helpers.getImgUrl("/character/character1.png")
      } else  {
        ImageUrl = helpers.getImgUrl("/character/character2.png")
      }
      return ImageUrl
    }
  }
};
</script>

<style scoped>
.character {
  height: 322px;
}
</style>