<template>
  <v-container class="mb-9">
    <v-snackbar v-model="snackbar" top color="warning" :timeout="timeout">
      <b><v-icon class="mr-2">mdi-alert</v-icon>{{ text }}</b>
    </v-snackbar>
    <v-snackbar v-model="snackbarTrue" top color="success" :timeout="timeout">
      <b><v-icon class="mr-2">mdi-check</v-icon>{{ textTrue }}</b>
    </v-snackbar>
    <h5 id="produits" >En direct<span>.</span></h5>
    <v-row class="my-4">
      <v-col cols="12" md="8">
        <v-card elevation="5" class="px-4 py-6" style="border-radius: 20px; width: 100%; background-color: #e4e4e6;">
          <v-row>
            <v-col cols="12" md="5.5" class="ml-4 ml-md-0">
              <h5 class="mb-4">{{ countdown }}</h5>
              <v-carousel class="mt-2" height="300" style="border-radius:15px;">
                <v-carousel-item v-for="(item, i) in image" :key="i" :src="`http://localhost:5000/${item.src}`"></v-carousel-item>
              </v-carousel>
              <h3 class="price-tag">Prix Actuel: <span class="ml-2">{{ prixInit }} €</span></h3>
            </v-col>
            <v-col cols="12" md="6.5">
              <h2 class="product-name">{{ nom }}</h2>
              <p class="product-description">{{ description }}</p>
              <v-text-field :rules="rules" class="mt-4" v-mask="['### ### ###']" label="Votre prix (en Euro)" style="border-radius: 30px;" v-model="newComment" type="number" solo></v-text-field>
              <v-btn @click="sendComment" class="mt-4" color="primary">Envoyer</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card elevation="5" class="px-4 py-6" style="background-color: #e4e4e6; border-radius: 15px;">
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

export default ({
  name: 'nodtiPage',
  data() {
    return {
      imgUrl: require('@/assets/1.jpg'),
      rules: [
        v => !!v || 'Le prix est obligatoire',
        v => /^\d+$/.test(v) || 'Le prix doit être un nombre'
      ],
      countdown: '00:00:05',
      timer: null,
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
      textTrue: 'Valeur ajoutée avec succès',
    }
  },
  methods: {
    sortCommentsByDate() {
      this.sortedComments = [...this.comments].sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    startCountdown() {
      this.timer = setInterval(() => {
        this.updateCountdown();
      }, 1000);
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
    }
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
    if    (savedComments) {
      this.comments = JSON.parse(savedComments);
      this.sortCommentsByDate(); // Appel de la fonction de tri au chargement des commentaires sauvegardés
    }
  },
})
</script>

<style scoped>
#produits {
  margin-top: -15px;
  font-size: 20px;
  color: #e91e63;
}

.product-name {
  color: #e91e63;
  margin-top: 1.5rem;
  font-size: 20px;
}

.product-description {
  margin-top: 1rem;
  font-size: 16px;
}

.price-tag {
  color: white;
  background-color: #e91e63;
  font-size: 18px;
  padding: 10px 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.comment-price {
  font-size: 14px;
}
</style>

