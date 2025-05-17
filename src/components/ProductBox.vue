<template>
  <div class="column is-3">
    <div class="box">
      <figure class="image mb-4">
        <img :src="thumbnailUrl" alt="">
      </figure>

      <h3 class="is-size-4">{{ product.name }}</h3>
      <p class="is-size-6 has-text-grey">${{ product.price }}</p>

      <router-link :to="product.get_absolute_url" class="button is-dark mt-4">
        View details
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProductBox',
  props: {
    product: Object
  },
  computed: {
    thumbnailUrl() {
      return this.product.get_thumbnail
        ? axios.defaults.baseURL + this.product.get_thumbnail
        : 'https://via.placeholder.com/150'
    }
  }
}
</script>


<style scoped>
    .image{
      margin-top: -1.25rem;
      margin-left: -1.25rem;
      margin-right: -1.25rem;
    }
</style>
