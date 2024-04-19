<template>
  <v-container>
    <v-row style="max-height: 450px; overflow-y: auto; margin-bottom: 10px; padding-bottom: 10px;">
      <v-col v-for="(card, index) in elementCard" :key="index" cols="4">
        <v-hover v-slot="{ hover }">
          <v-card color="grey lighten-4" max-width="350">
            <v-img :aspect-ratio="16 / 9" :src="card.img">
              <v-expand-transition>
                <div v-if="hover" class="d-flex transition-fast-in-fast-out pink v-card--reveal text-h2 white--text"
                  style="height: 100%;">
                  {{ card.PrixInitial }}
                </div>
              </v-expand-transition>
            </v-img>
            <v-card-text class="pt-6" style="position: relative;">
              <h3 class="text-h5 font-weight-light pink--text mb-2">
                {{ card.NomPro }}
              </h3>
              <div class="font-weight-light text-h8 mb-2">
                {{ card.desc }}
              </div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data() {
    return {
      elementCard: [
      ]
    };
  },
  methods: {
    async getAllprods() {
      try {
        const response = await axios.get('http://localhost:5000/admin/product');
        // const token = localStorage.getItem('token')
        this.elementCard = response.data; // Mettre à jour elementCard avec les données reçues
        // console.log(token); // Optionnel : afficher les données dans la console pour vérification
      } catch (err) {
        alert('Une erreur s\'est produite lors de la récupération des produits.');
        console.error(err); // Afficher l'erreur dans la console pour le débogage
      }
    }
  },
  mounted() {
    this.getAllprods();
  }
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
