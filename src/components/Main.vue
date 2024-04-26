<template>
    <div>
        <v-app-bar app color="darken-3" default elevation="0">
            <div class="d-flex align-center">
                <v-img alt="auction logo" class="shrink mr-2" contain src="../assets/IHM logo.png"
                    transition="scale-transition" width="100" />
            </div>
            <v-spacer></v-spacer>
            <router-link style="text-decoration: none; color: black; opacity: 80%;" class="mt-4" to="/accueil">
                <p> Accueil</p>
            </router-link>
            <v-spacer></v-spacer>
            <router-link style="text-decoration: none; color: black; opacity: 80%;" class="mt-4" to="live">
                <p> En direct</p>
            </router-link>
            <v-spacer></v-spacer>
            <router-link style="text-decoration: none; color: black; opacity: 80%;" class="mt-4" to="history">
                <p>Historiques</p>
            </router-link>
            <v-icon @click="logout()">mdi-logout</v-icon>
            <v-spacer></v-spacer>
            <v-badge bordered dense content="5" class="mr-5" overlap color="pink">
                <v-icon @click.stop="drawer = !drawer">mdi-bell</v-icon>
            </v-badge>
            <Avatar />
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" app right temporary width="400">
            <NotificationView></NotificationView>
        </v-navigation-drawer>
    </div>
</template>

<script>
import axios from 'axios'
import NotificationView from '@/views/NotificationView.vue';
import Avatar from '../components/Avatar.vue'
export default ({
    name: 'AccueilVue',
    data() {
        return {
            drawer: null,
        }
    },
    components: { Avatar, NotificationView },
    methods: {
        async logout() {
            try {
                await axios.post('http://localhost:5000/user/logout')
                localStorage.removeItem('accessToken');
                localStorage.removeItem('userData');
                this.$router.replace('/login');
                alert('OK')
            }
            catch (err) {
                console.log(err)
                alert('KO')
            }
        }
    }
})
</script>