<template>
  <v-container class="mb-9">
    <h1 style="margin-top: -45px;" id="produits">Live<span style="color: red;">.</span></h1>
    <v-row>
      <v-col cols="8">
        <v-card class="mt-5" style="border-radius: 20px; width: 100%; background-color: #d9d9d9;">
          <v-row>
            <v-col cols="5.5" class="ml-9">
              <h5>{{ countdown }}</h5>

              <v-carousel class="mt-2" height="350" style="border-top-left-radius:15px;border-top-right-radius:15px;"
                hide-delimiters>
                <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src"></v-carousel-item>
              </v-carousel>
              <h3
                style="color: white; background-color: #e91e63; font-size: 20px; padding: 20px; border-bottom-left-radius:15px;border-bottom-right-radius:15px;">
                Prix Actuelle: <span class="ml-5">{{ prixInit }} $</span></h3>
            </v-col>
            <v-col cols="5.5">
              <h1 style="color: #e91e63;" class="mt-5">{{ nom }}</h1>
              <p class="mt-5">{{ description }}</p>
              <v-spacer></v-spacer>
              <h3 style="margin-top: 78px;">On n'attends plus que vous:</h3>
              <v-row>
                <v-col cols="9">
                  <v-text-field :rules="rules" class="mt-2" v-mask="['### ### ###']" label="Votre prix(en MGA)"
                    style="border-radius: 30px;" type="number" solo></v-text-field>
                </v-col>
                <v-col cols="1" class="mt-2">
                  <v-icon @click="test()" class="mt-3">mdi-send</v-icon>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card style="background-color: #d9d9d9; width: 100%; padding-right: -50px; border-radius: 15px;" class="mt-2">
          <v-card-title class="ml-10" style="color: #e91e63;">
            Commentaire en direct
          </v-card-title>
          <v-card-action>
            <v-container>
              <v-row>
                <v-col cols="2">
                  <Avatar />
                </v-col>
                <v-col cols="6.5">
                  <h5>Rakotoarimanana</h5>
                  <p style="font-size: 15px;">Je propose :</p>
                </v-col>
                <v-col cols="3.5">
                  <h1>33 $</h1>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row class="mt-2">
                <v-col cols="2">
                  <Avatar />
                </v-col>
                <v-col cols="6.5">
                  <h5>Rakotoarimanana</h5>
                  <p style="font-size: 15px;">Je propose :</p>
                </v-col>
                <v-col cols="3.5">
                  <h1>33 $</h1>
                </v-col>
              </v-row>
            </v-container>
          </v-card-action>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from 'axios';
import Avatar from '@/components/Avatar.vue';
// import Main from '@/components/Main.vue';
// import navBar from '../components/navBar.vue'
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
      image: []
    }
  },
  // components: { navBar, Main },
  methods: {
    test() {
      console.log('cliked')
    },
    startCountdown() {
      this.timer = setInterval(() => {
        this.updateCountdown();
      }, 1000);
    }, updateCountdown() {
      let time = this.countdown.split(':');
      let hours = parseInt(time[0]);
      let minutes = parseInt(time[1]);
      let seconds = parseInt(time[2]);



      if (hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(this.timer);
        this.class = alert
        // alert('kely sisa')
        // Ajouter ici des actions à effectuer lorsque le compte à rebours se termine
      } else {
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            }
          }
        }
        this.countdown = `${this.formatTime(hours)}:${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
      }
    },
    formatTime(time) {
      return time < 10 ? `0${time}` : time;
    },
    async getLive() {
      const response = await axios.get('http://localhost:5000/admin/getlive')
      try {
        const livepro = response.data[2]
        console.log(livepro)
        this.nom = livepro.nom,
          this.description = livepro.description
        this.prixInit = livepro.prixInit
        // const images = livepro.image
        // const items = images.map((imagePath)=>{
        //   return {src: imagePath}
        // })
        // this.image = items
        // console.log(images)
      }
      catch (err) {
        console.log(err)
      }
    }
  },
  mounted() {
    // this.startCountdown();
    this.getLive()
  },
  components: {
    Avatar
  }
})
</script>
<style></style>