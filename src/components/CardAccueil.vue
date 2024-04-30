<template>
  <v-container>
    <h1 class="gradient-text"> Bonjour {{ user }}</h1>
    <h1 class="mt-15 pro" id="produits">En vente prochainement </h1>
    <caroussel class="mt-5"/>
    <h1 class="mt-10">Nos articles disponibles</h1>
    <v-row class="mt-5 pb-10" style="margin-bottom: 10px; padding-bottom: 10px;">
      <v-col v-for="product in products" :key="product.IdPro" cols="4">
        <v-hover v-slot="{ hover }">
          <v-card color="grey lighten-4" max-width="350">
            <v-img :aspect-ratio="16 / 16" :src="`http://localhost:5000/${product.img}`">
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
    <h1> Nos partenaires </h1>
  </v-container>
</template>

<script>
import caroussel from '@/components/caroussel.vue'
// import axios from 'axios';

export default {
  name: 'HelloWorld',
  data() {
    return {
      products: [],
      drawer: null,
      user: '',
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
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const userObject = JSON.parse(userData)
        this.user = userObject.name
        console.log(userObject.name)
      }
      catch (err) {
        console.log(err)
      }
    }
  },
  components: { caroussel }
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

.gradient-text {
  margin-top: -35px;
  font-size: 3rem;
  color: transparent;
  background: linear-gradient(to right, #4e83ef, #9b72cb, #d96570);
  position: absolute;
  background-clip: text;
}

</style>