<template>
    <div class="page-product">
        <div class="columns is-multiline">
            <div class="column is-9">
                <figure class="image mb-6">
                    <img v-bind:src="product.get_image" alt="">
                </figure>

                <h1 class="title">{{ product.name  }}</h1>

                <p>{{ product.description }}</p>
            </div>

            <div class="column is-3">
                <h2 class="subtitle">Information</h2>

                <p><strong>Price:</strong>${{ product.price }}</p>

               <div class="field has-addons mt-6">
                  <div class="control">
                    <input type="number" class="input" min="1" v-model="quantity">
                  </div>

                  <div class="control">
                    <a class="button is-dark" @click="addToCart">Add to cart</a>
                  </div>
               </div> 
            </div>
        </div>
    </div>

</template>
<script>
import axios from 'axios'
import { toast } from 'bulma-toast'

export default {
  name: 'Product',
  data() {
    return {
      product: {},
      quantity: 1,
    };
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    async getProduct() {
      this.$store.commit('setIsLoading', false);

      const category_slug = this.$route.params.category_slug;
      const product_slug = this.$route.params.product_slug;

      try {
        const response = await axios.get(`https://backend-nrep.onrender.com/api/v1/products/${category_slug}/${product_slug}`);
        this.product = response.data;
        document.title =this.product.name + ' |Djackets'
      } catch (error) {
        console.error(error);
      } finally {
        this.$store.commit('setIsLoading', false);
      }
    },
    addToCart() {
      if (isNaN(this.quantity) || this.quantity < 1) {
        this.quantity = 1;
      }

      const item = {
        product: this.product,
        quantity: this.quantity,
      };

      this.$store.commit('addToCart', item);

      //  Make sure 'toast' is defined.  It's not a standard Vue.js method.
      //  You likely need to import it or use a plugin.  For example:
      //  import { toast } from 'bulma-toast';  (if you're using bulma-toast)
      toast({
        message: 'The product was added to the cart',
        type: 'is-success',
        dismissible: true,
        pauseOnHover: true,
        duration: 2000,
        position: 'bottom-right',
      });
    },
  },
};
</script>
