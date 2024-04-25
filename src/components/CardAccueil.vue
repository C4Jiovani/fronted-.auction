<template>
  <v-container>
    <v-row style="max-height: 450px; overflow-y: auto; margin-bottom: 10px; padding-bottom: 10px;">
      <v-col v-for="product in products" :key="product.IdPro" cols="4">
        <v-hover v-slot="{ hover }">
          <v-card color="grey lighten-4" max-width="350">
            <v-img :aspect-ratio="16 / 9" :src="`http://localhost:5000/${product.img}`">
              <v-expand-transition>
                <div v-if="hover" class="d-flex transition-fast-in-fast-out pink v-card--reveal text-h2 white--text"
                  style="height: 100%;">
                  {{ product.PrixInitial }}
                </div>
              </v-expand-transition>
            </v-img>
            <v-card-text class="pt-6" style="position: relative;">
              <h3 class="text-h5 font-weight-light pink--text mb-2">
                <b>{{ product.NomPro }}</b>
              </h3>
              <div class="">
                <b class="pr-3">Auteur:</b> {{ product.desc }}
              </div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'HelloWorld',
  data() {
    return {
      products: [],
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch('http://localhost:5000/admin/product');
        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.fetchProducts();
  },
}

</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}

::-webkit-scrollbar {
  width: 7px;
  height: 10px;
  background-color: #F5F5F5;
  color: pink;
}

::-webkit-scrollbar-thumb {
  background-color: pink;
}
</style>