<template>
  <v-container class="mb-9">
    <v-snackbar v-model="snackbar" top color="warning" :timeout="timeout">
      <b><v-icon class="mr-2">mdi-alert</v-icon>{{ text }}</b>
    </v-snackbar>
    <v-snackbar v-model="snackbarTrue" top color="success" :timeout="timeout">
      <b><v-icon class="mr-2">mdi-check</v-icon>{{ textTrue }}</b>
    </v-snackbar>
    <h1 id="produits" class="text-h1">En direct<span>.</span></h1>
    <v-row>
      <v-col cols="12" md="8">
        <v-card elevation="5" class="mt-8" style="border-radius: 20px; width: 100%; background-color: #e4e4e6;">
          <v-row>
            <v-col cols="12" md="5.5" class="ml-4 ml-md-0">
              <h5>{{ countdown }}</h5>
              <v-carousel class="mt-2" height="350" style="border-top-left-radius:15px;border-top-right-radius:15px;" hide-delimiters>
                <v-carousel-item v-for="(item, i) in image" :key="i" :src="`http://localhost:5000/${item.src}`"></v-carousel-item>
              </v-carousel>
              <h3 class="price-tag">Prix Actuel: <span class="ml-2">{{ prixInit }} €</span></h3>
            </v-col>
            <v-col cols="12" md="6.5">
              <h2 class="product-name">{{ nom }}</h2>
              <p class="product-description">{{ description }}</p>
              <v-text-field :rules="rules" class="mt-2" v-mask="['### ### ###']" label="Votre prix (en Euro)" style="border-radius: 30px;" v-model="newComment" type="number" solo></v-text-field>
              <v-btn @click="sendComment" class="mt-2" color="primary">Envoyer</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card elevation="5" class="mt-2" style="background-color: #e4e4e6; border-radius: 15px;">
          <v-card-title class="ml-4 ml-md-0" style="color: #e91e63;">Commentaires en direct</v-card-title>
          <v-card-actions>
            <v-container>
              <v-row v-for="comment in sortedComments" :key="comment.id">
                <v-col cols="2">
                  <Avatar />
                </v-col>
                <v-col cols="6">
                  <h5>{{ comment.nameL }}</h5>
                  <p style="font-size: 14px;">Je propose :</p>
                </v-col>
                <v-col cols="4">
                  <h2 class="comment-price">{{ comment.montant }} €</h2>
                </v-col>
                <v-divider></v-divider>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import Avatar from '@/components/Avatar.vue';
import io from 'socket.io-client'
const socket = io('http://localhost:5000')
// const STORAGE_KEY = 'countdownTime';

export default ({
  name: 'nodtiPage',
  data() {
    return {
      imgUrl: require('@/assets/1.jpg'),
      rules: [
        v => !!v || 'Le prix est obligatoire',
        v => /^\d+$/.test(v) || 'Le prix doit être un nombre'
      ],
      class: null,
      nom: '',
      description: '',
      prixInit: '',
      image: [],
      comments: [],
      newComment: '',
      user: '',
      userL: '',
      sortedComments: [],
      idLive: '',
      varTemp: '',
      snackbar: false,
      text: 'Le prix proposé doit être supérieur au prix initial',
      timeout: 3000,
      snackbarTrue: false,
      textTrue: 'Valeur ajouté avec success',
      countdown: '00:00:10', // Initial countdown value (5 seconds)
      timer: null, // Timer variable
      isTimerExpired: false,
    }
  },
  // components: { navBar, Main },
  methods: {
    sortCommentsByDate() {
      this.sortedComments = [...this.comments].sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    async getLive() {
      const response = await axios.get('http://localhost:5000/admin/getlive')
      try {
        const livepro = response.data[3]
        console.log('ceci est le livepro', livepro)
        this.nom = livepro.nom,
        this.idLive = livepro.idLive
        this.description = livepro.description
        this.prixInit = livepro.prixInit
        const imageLinks = livepro.image.split(',');
        const items = imageLinks.map((imagePath) => {
          return { src: imagePath.trim() }; // Utilisez trim() pour supprimer les espaces éventuels autour des liens
        });
        this.image = items;
        console.log('Liens des images:', imageLinks);
        this.startCountdown();
      }
      catch (err) {
        console.log(err)
      }
    },
    sendComment() {
      if (parseInt(this.newComment) > parseInt(this.prixInit)) {
        socket.emit('newComment', { user: this.user, montant: this.newComment, nameL: this.userL });
        socket.emit('updatePrice', { newPrice: this.newComment, idLive: this.idLive });
        this.snackbarTrue = true,
          this.newComment = ''
      }
      else {
        // alert('Le prix proposé doit être supérieur au prix initial.');
        this.snackbar = true
      }
    },
    startCountdown() {
      this.timer = setInterval(() => {
        const timeParts = this.countdown.split(':');
        let hours = parseInt(timeParts[0]);
        let minutes = parseInt(timeParts[1]);
        let seconds = parseInt(timeParts[2]);

        if (hours === 0 && minutes === 0 && seconds === 0) {
          // Timer has expired
          clearInterval(this.timer);
          this.isTimerExpired = true;
          // You can add logic here to handle timer expiration
        } else {
          if (seconds > 0) {
            seconds--;
          } else {
            if (minutes > 0) {
              minutes--;
              seconds = 59;
            } else {
              hours--;
              minutes = 59;
              seconds = 59;
            }
          }
          // Update the countdown display
          this.countdown = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
      }, 1000); // Update every second (1000 ms)
    },
  },
  mounted() {
    this.getLive()
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const userObject = JSON.parse(userData)
        this.user = userObject.IdUser
        this.userL = userObject.name
      } catch (err) {
        console.log(err)
      }
    }
    socket.on('updatePrice', (newPrice) => {
      this.prixInit = newPrice;
    });
  },
  components: {
    Avatar
  },
  created() {
    socket.on('newComment', (comment) => {
      this.comments.push(comment);
      this.sortCommentsByDate();
      localStorage.setItem('comments', JSON.stringify(this.comments));
    });

    const savedComments = localStorage.getItem('comments');
    if (savedComments) {
      this.comments = JSON.parse(savedComments);
      this.sortCommentsByDate(); // Appel de la fonction de tri au chargement des commentaires sauvegardés
    }
  },
})
</script>

<style scoped>
.text-h1 {
  margin-top: -15px;
  font-size: 20px;
  color: #e91e63;
}

.product-name {
  color: #e91e63;
  margin-top: 1.5rem;
  font-size: 24px; /* Augmentez la taille de la police */
}

.product-description {
  margin-top: 1.5rem;
}

.price-tag {
  color: white;
  background-color: #e91e63;
  font-size: 20px;
  padding: 10px 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.comment-price {
  font-size: 16px;
}

/* Polices Google */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}
</style>

