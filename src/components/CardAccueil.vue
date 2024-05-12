<template>
  <v-container>
    <center><h1 class="title-Card" style="margin-top: -10px;color: #e91e63; font-size: 1.7vw;">Nos articles disponibles</h1></center>
    <v-row class="mt-5 pb-10 container-Card" style="clmargin-bottom: 10px; padding-bottom: 10px;">
      <v-col v-for="product in products" :key="product.IdPro" cols="12" sm="6" md="4" lg="3">
        <v-hover v-slot="{ hover }">
          <v-card color="grey lighten-4">
            <v-img :aspect-ratio="16 / 9" :src="`http://localhost:5000/${product.img}`">
              <v-expand-transition>
                <div v-if="hover" class="d-flex transition-fast-in-fast-out pink v-card--reveal text-h2 white--text"
                  style="height: 100%;">
                  {{ product.PrixInitial }}
                </div>
              </v-expand-transition>
            </v-img>
            <v-card-text class="pt-6" style="position: relative;">
              <h3 class="font-weight-bold mb-2" color="dark" style="font-size:1vw;">
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
    <center><h1 class="mt-5 pro Title-slide" id="produits" style="color: #e91e63; font-size: 1.7vw;">En vente prochainement </h1></center>
    <caroussel class="mt-8"/>
    <center><h1 class="mt-7 pro Title-partenaire" style="color: #e91e63; font-size: 1.7vw;">Nos partenaires </h1></center>
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
        this.user = userObject.userName
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

.gradient-text {
  margin-top: -35px;
  font-size: 3rem;
  color: transparent;
  background: linear-gradient(to right, #4e83ef, #9b72cb, #d96570);
  position: absolute;
  background-clip: text;
}

@media only screen and (max-width: 360px) {
  .title-Card {
    font-size: 4vw !important; /* Taille du texte pour les écrans de petite taille */
  }
  .Title-slide {
    font-size: 4vw !important; /* Taille du texte pour les écrans de petite taille */
  }
  .Title-partenaire {
    font-size: 4vw !important; /* Taille du texte pour les écrans de petite taille */
  }
}

@media  screen and (min-width: 768px) and (max-width: 991px) {
  .v-card__title {
    font-size: 1.8vw;
  }
}

@media  screen and (min-width: 992px) and (max-width: 1199px) {
  .v-card__title {
    font-size: 2vw;
  }
}

@media  (min-width: 1200px) {
  .v-card__title {
    font-size: 2.5vw;
  }
}

</style>
