<template>
  <div>
    <v-card class="navbar" elevation="0" style="width: 55px;">
      <div style="border-radius: 50px; background-color: #d9d9d9;">
        <center>
          <router-link to="/accueil">
            <v-card-text class="mt-2 pt-10">
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon color="#ff5c87" v-bind="attrs" v-on="on">mdi-home</v-icon>
                </template>
                <span>Accueil</span>
              </v-tooltip>
            </v-card-text>
          </router-link>
          <router-link to="/notification">
            <v-card-text :class="{ 'active-icon': $route.name === 'notification' }" class="mt-2">
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-badge bordered dot overlap color="pink"> <v-icon v-bind="attrs"
                      v-on="on">mdi-bell</v-icon></v-badge>
                </template>
                <span>Notification</span>
              </v-tooltip>
            </v-card-text>
          </router-link>
          <router-link to="/live">
            <v-card-text :class="{ 'active-icon': $route.name === 'live' }" class="mt-2">
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on">mdi-antenna</v-icon>
                </template>
                <span>Live</span>
              </v-tooltip>
            </v-card-text>
          </router-link>
          <router-link to="/history">
            <v-card-text :class="{ 'active-icon': $route.name === 'history' }" class="mt-2">
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on">mdi-history</v-icon>
                </template>
                <span>Historiques</span>
              </v-tooltip>
            </v-card-text>
          </router-link>
          <router-link to="/">
            <v-card-text :class="{ 'active-icon': $route.name === 'login' }" class="mt-2 pb-10">
              <v-icon @click="logout()">mdi-logout</v-icon>
            </v-card-text>
          </router-link>
        </center>
      </div>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',

  data: () => ({
  }),
  methods: {
    async logout() {
      try {
        await axios.post('http://localhost:5000/user/logout')
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userData');
        this.$router.replace('/login');
        // alert('OK')
      }
      catch (err) {
        console.log(err)
        alert('KO')
      }
    }
  }
}
</script>

<style>
.active-icon {
  color: #ff5c87;
}
</style>
