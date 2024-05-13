<template>
  <v-row>
    <v-col cols="12" md="7" class="container-model">
      <br /><br /><br />
      <p class="bigTitle typewriter">Plongez dans l'excitation des Enchères</p>
      <p class="subtitle mt-4 " style="color: #666666">
        Découvrez des trésors uniques sur notre plateforme en ligne
      </p>
      <v-hover v-slot="{ hover }" open-delay="50">
        <v-btn
          color="#ab0767"
          dark
          class="mt-6 text-capitalize button"
          rounded
          large
          @click="redirectionPageConnexion"
          :elevation="hover ? 5 : 2"
          :class="{ 'on-hover': hover }"
        >
          <b>Se Connecter</b>
          <v-icon class="ml-3 pt-3 pb-3">mdi-arrow-right</v-icon>
        </v-btn>
      </v-hover>
    </v-col>
    <img :src="require('@/assets/curseur.png')" class="image-absolute" alt="" style="margin-left: -70px;" width="50px" height="50px" />
    <v-col cols="12" md="5" class="text-center">
      <img :src="require('@/assets/imgAccueil.png')" alt="" class="img-fluid" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      typewriterText: "",
      fullText: "Plongez dans l'excitation des Enchères",
      currentIndex: 0,
      typingSpeed: 100,
    };
  },
  methods: {
    redirectionPageConnexion() {
      // Redirection vers la page "pageConnexion.vue"
      this.$router.push("/login");
    },
    startTypewriter() {
      const intervalId = setInterval(() => {
        this.typewriterText += this.fullText[this.currentIndex];
        this.currentIndex++;
        if (this.currentIndex === this.fullText.length) {
          clearInterval(intervalId);
        }
      }, this.typingSpeed);
    },
  },
  mounted() {
    this.startTypewriter();
  },
};
</script>

<style scoped>
.bigTitle {
  font-size: 4rem; /* Taille de police pour les grands écrans */
  font-weight: bolder;
  color: #0d0d0d;
  line-height: 1.2;
}

.subtitle {
  color: #222222;
  font-size: 1rem; /* Taille de police pour les grands écrans */
  line-height: 1.5;
}

.text-center {
  text-align: center;
}

.image-absolute{
    margin: 20% auto;
}
.img-fluid {
  max-width: 100%; /* L'image s'adapte à la largeur de son conteneur */
  height: auto; /* Garde le rapport hauteur/largeur de l'image */
}

.typewriter {
  overflow: hidden; /* Masquer le texte qui déborde */
  margin: 0 auto; /* Centrer le texte horizontalement */
}

@media only screen and(max-width: 768px) {
  /* Styles pour les écrans de taille moyenne */
  .bigTitle {
    font-size: 2.5rem;
  }

  .container-model {
    margin: 20px;
  }
  .subtitle {
    font-size: 1.25rem;
    width: 100px;
  }
  .image-absolute{
    display: none;
}
  .button {
    font-size: 12px;
  }
}

@media only screen and (max-width: 576px) {
  /* Styles pour les petits écrans */
  .bigTitle {
    font-size: 2rem;
  }
  .container-model {
    margin: 20px;
  }

.image-absolute{
    display: none;
}
  .subtitle {
    font-size: 1rem;
    width: 300px;
  }
  .button {
    font-size: 12px;
  }
}
@media only screen and (width: 1042px) {
  /* Styles pour les petits écrans */
  .bigTitle {
    font-size: 2rem;
    text-align: center;
  }
  
  .container-model {
    text-align: center;
    margin: 20px;
  }

  .subtitle {
    font-size: 1rem;
    text-align: center;
    width: 300px;
  }
  .button {
    font-size: 12px;
    text-align: center;
  }
}
</style>
