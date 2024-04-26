<template>
    <v-container>
      <h1 style="margin-top: -45px;" id="produits">Live<span style="color: red;">.</span></h1>
      <v-row>
        <v-col cols="11">
          <v-card class="mt-5" style="border-radius: 20px; background-color: #d9d9d9;">
            <v-row>
              <v-col cols="5" class="ml-9">
                <h5>{{countdown}}</h5>
                <v-img class="mt-2" style="border-top-left-radius:15px;border-top-right-radius:15px;"
                  :src="imgUrl" height="350"></v-img>
                <h3
                  style="color: white; background-color: #e91e63; font-size: 20px; padding: 20px; border-bottom-left-radius:15px;border-bottom-right-radius:15px;">
                  Prix Actuelle:</h3>
              </v-col>
              <v-col cols="6">
                <h1 style="color: #e91e63;" class="mt-5">Le portrait des hackers</h1>
                <p class="mt-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae, tempore quo! Error
                  blanditiis
                  inventore autem voluptatem esse optio rerum dolor alias libero harum! Recusandae ducimus temporibus
                  vitae mollitia odit, error adipisci sed tenetur cum quibusdam maiores tempora consequuntur iusto quasi
                  saepe laboriosam praesentium odio necessitatibus consequatur. Autem earum exercitationem incidunt!</p>
                <v-spacer></v-spacer>
                <h3 style="margin-top: 78px;">On n'attends plus que vous:</h3>
                <v-row>
                  <v-col cols="11">
                    <v-text-field :rules="rules" v-mask="['### ### ###']" label="Votre prix(en MGA)"
                      style="border-radius: 30px;" type="number" solo></v-text-field>
                  </v-col>
                  <v-col cols="1" class="mt-2">
                    <v-icon @click="test()">mdi-send</v-icon>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>
<script>
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
      class: null
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
  },
  mounted() {
    this.startCountdown();
  },
})
</script>
<style></style>