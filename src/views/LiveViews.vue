<template>
  <v-container class="mb-9">
    <h1 style="margin-top: -15px; font-size: 20px; color: #e91e63;" id="produits">En direct<span style="color: black;">.</span></h1>
    <v-row>
      <v-col cols="8">
        <v-card elevation="5" class="mt-8" style="border-radius: 20px; width: 100%; background-color: #e4e4e6;">
          <v-row>
            <v-col cols="5.5" class="ml-9">
              <h5>{{ countdown }}</h5>

              <v-carousel class="mt-2" height="350" style="border-top-left-radius:15px;border-top-right-radius:15px;"
                hide-delimiters>
                <!-- <v-carousel-item></v-carousel-item> -->
                <v-carousel-item v-for="(item, i) in image" :key="i" :src="`http://localhost:5000/${item.src}`"
                  style="width: 350px;"></v-carousel-item>
              </v-carousel>
              <h3
                style="color: white; background-color: #e91e63; font-size: 20px; padding: 10px 15px; border-bottom-left-radius:15px;border-bottom-right-radius:15px;">
                Prix Actuelle: <span class="ml-5" >{{ prixInit }} €</span></h3>
            </v-col>
            <v-col cols="5.5">
              <h1 style="color: #e91e63;" class="mt-5">{{ nom }}</h1>
              <p class="mt-5">{{ description }}</p>
              <v-spacer></v-spacer>
              <h3 style="margin-top: 78px;">On n'attends plus que vous:</h3>
              <v-row>
                <v-col cols="9">
                  <v-text-field :rules="rules" class="mt-2" v-mask="['### ### ###']" label="Votre prix(en Euro)"
                    style="border-radius: 30px;" v-model="newComment" type="number" solo></v-text-field>
                </v-col>
                <v-col cols="1" class="mt-2">
                  <v-icon @click="sendComment" class="mt-3">mdi-send</v-icon>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
        elevation="5"
          style="background-color: #e4e4e6; width: 100%; padding-right: -50px; border-radius: 15px; height: 470px;overflow-y: auto"
          class="mt-2">
          <v-card-title class="ml-10" style="color: #e91e63;">
            Commentaire en direct
          </v-card-title>
          <v-card-actions>
            <v-container>
              <v-row v-for="comment in sortedComments" :key="comment.id">
                <v-col cols="2">
                  <Avatar />
                </v-col>
                <v-col cols="6">
                  <h5>{{ comment.nameL }}</h5>
                  <p style="font-size: 15px;">Je propose :</p>
                </v-col>
                <v-col cols="4">
                <p></p>
                  <h1 style="font-size: 16px;">{{ comment.montant }} €</h1>
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
      varTemp: ''
    }
  },
  // components: { navBar, Main },
  methods: {
    test() {
      // socket.emit('comment', { message: 'Mon nouveau commentaire' });
      alert('cliked')
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
        this.newComment = ''
      }
      else {
        alert('Le prix proposé doit être supérieur au prix initial.');
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
      this.comments.push(comment)
      this.sortedComments = [...this.comments].sort((a, b) => new Date(b.date) - new Date(a.date));
      localStorage.setItem('comments', JSON.stringify(this.comments));
    })
    const savedComments = localStorage.getItem('comments');
    if (savedComments) {
      this.comments = JSON.parse(savedComments);
      this.sortedComments = [...this.comments].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  }
})
</script>
<style>

</style>