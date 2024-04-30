<template>
    <div>
        <v-dialog v-model="dialog" max-width="290">
            <v-card>
                <v-card-title class="text-h5 ml-10">
                    Se deconnecter
                </v-card-title>

                <v-card-text>
                    Voulez-vous vraiment vous deconnecter?
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn class="text-capitalize mb-5" text @click="dialog = false">
                        Annuler
                    </v-btn>
                    <v-btn color="pink" class="text-capitalize mb-5" outlined @click="logout()">
                        Se Déconnecter
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-app-bar app color="darken-3" default elevation="0">
            <div class="d-flex align-center">
                <v-img alt="auction logo" class="shrink mr-2" contain src="../assets/IHM logo.png"
                    transition="scale-transition" width="100" />
            </div>
            <v-spacer></v-spacer>
            <router-link style="text-decoration: none; color: black; opacity: 80%; margin-left: 30px" class="mt-4"
                to="/accueil">
                <p class="elements"> Accueil</p>
            </router-link>
            <router-link style="text-decoration: none; color: black; opacity: 80%; margin-left: 30px" class="mt-4"
                to="live">
                <p class="elements"> En direct</p>
            </router-link>
            <router-link style="text-decoration: none; color: black; opacity: 80%; margin-left: 30px" class="mt-4"
                to="history">
                <p class="elements">Historiques</p>
            </router-link>
            <v-spacer></v-spacer>
            <v-badge bordered dense dot :value="badge" class="mr-10" overlap color="pink">
                <v-icon @click.stop="reverse()">mdi-bell</v-icon>
            </v-badge>
            <Avatar v-bind="attrs" v-on="on" />
            <template>
                <div class="text-center">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn :ripple="false" plain v-bind="attrs" v-on="on" class="text-capitalize">
                                {{ user }}
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item>
                                <v-list-item-title><v-icon>mdi-cog</v-icon> Paramètre</v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title @click.stop="dialog = true"
                                    style="cursor: pointer;"><v-icon>mdi-logout</v-icon>
                                    Déconnexion</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </template>
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
            user: '',
            dialog: false,
            notif: [],
            badge: null
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
            }
            catch (err) {
                console.log(err)
            }
        },
        async fetchNotif() {
            try {
                const response = await fetch('http://localhost:5000/admin/getnotif');
                const data = await response.json();
                this.notif = data;
                this.badge = this.notif.length
                // alert(this.badge)
            } catch (error) {
                console.error(error);
            }
        },
        reverse(){
            this.drawer = !this.drawer
            this.badge = 0  
        }
    },
    created() {
        const userData = localStorage.getItem('userData');
        if (userData) {
            try {
                const userObject = JSON.parse(userData)
                this.user = userObject.name
                console.log(userObject.name)
            }
            catch (err) {
                console.log(err)
            }
        }
    },
    mounted(){
        this.fetchNotif()
    }

})
</script>
<style scoped>
.elements:hover {
    color: #e91e63;
}
</style>