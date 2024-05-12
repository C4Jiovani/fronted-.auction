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
        <v-dialog v-model="dialogCompte" persistent max-width="1000">
            <v-card>
                <v-card-title class="text-h4" style="margin-left: 280px">
                    Modifier mes informations
                </v-card-title>
                <v-card-text>
                    <v-row class="mt-5">
                        <v-col cols="1"></v-col>
                        <v-col cols="2">
                            <v-badge avatar overlap bottom>
                                <template v-slot:badge>
                                    <v-avatar>
                                        <v-icon>mdi-pencil</v-icon>
                                        <input type="file" @change="onFileChange">
                                    </v-avatar>
                                </template>
                                <v-avatar width="150" height="150"><v-img :src="imgUrl"></v-img></v-avatar>
                            </v-badge>
                        </v-col>
                        <v-col cols="9" class="mt-5">
                            <p>Nom : <span style="font-weight: bold; font-size: large; color: rgba(0, 0, 0, 0.6)">{{
            nomL
        }}</span></p>
                            <p>Nom d'utilisateur : <span
                                    style="font-weight: bold; font-size: large; color: rgba(0, 0, 0, 0.6)">{{
                userL }}</span>
                            </p>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="1"></v-col>
                            <v-col cols="5">
                                <label style="font-size: 15px;"><b>Nom :</b></label>
                                <v-text-field style="font-size: 14px;" elevation="0" outlined dense
                                    v-model="name"></v-text-field>

                                <label style="font-size: 15px;"><b>Adresse E-mail :</b></label>
                                <v-text-field style="font-size: 14px;" v-model="email" elevation="0" outlined
                                    dense></v-text-field>

                            </v-col>
                            <v-col cols="5">
                                <label style="font-size: 15px;"><b>Nom d'utilisateur:</b></label>
                                <v-text-field style="font-size: 14px;" v-model.lazy="userName" elevation="0" outlined
                                    dense></v-text-field>

                                <label style="font-size: 15px;"><b>Numero de telephone :</b></label>
                                <v-text-field style="font-size: 14px;" v-model="numTelephone" elevation="0" outlined
                                    dense></v-text-field>
                            </v-col>
                            <v-col cols="1"></v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn class="text-capitalize mb-5" text @click="dialogCompte = false">
                        Annuler
                    </v-btn>
                    <v-btn color="pink" class="text mb-5" outlined @click="updateInfo()">
                        Mettre à jour
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-app-bar app color="darken-3" default elevation="0">
            <div class="d-flex align-center">
                <v-img alt="auction logo" class="shrink mr-2" contain src="../assets/IHM logo.png"
                    transition="scale-transition" width="100" />
            </div>
            
            <router-link style="font-size: 15px;text-decoration: none; color: black; opacity: 80%; margin-left: 610px" class="mt-4 font-weight-bold"
                to="/accueil">
                <p class="elements"> Accueil</p>
            </router-link>
            <router-link style="font-size: 15px; text-decoration: none; color: black; opacity: 80%; margin-left: 60px" class="mt-4 font-weight-bold"
                to="live">
                <p class="elements"> En direct</p>
            </router-link>
            <router-link style="font-size: 15px; text-decoration: none; color: black; opacity: 80%; margin-left: 60px" class="mt-4 font-weight-bold"
                to="history">
                <p class="elements">Contact</p>
            </router-link>
            <v-spacer></v-spacer>
            <v-badge bordered dense dot :value="badge" class="mr-10" overlap color="pink">
                <v-icon @click.stop="reverse()">mdi-bell</v-icon>
            </v-badge>
            <Avatar />
            <template>
                <div class="text-center">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn :ripple="false" plain v-bind="attrs" v-on="on" class="text-capitalize">
                                {{ nomL }}
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item>
                                <v-list-item-title @click.stop="dialogCompte = true"
                                    style="cursor: pointer;"><v-icon>mdi-account</v-icon>Mon
                                    compte</v-list-item-title>
                            </v-list-item>
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
        <v-snackbar v-model="snackbarSuccesMaj" width="auto" top color="success" :timeout="timeout">
            <v-icon class="ml-3">mdi-check</v-icon><b class="ml-10">{{ text }}</b>
        </v-snackbar>
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
            B: '',
            dialog: false,
            dialogCompte: false,
            notif: [],
            badge: null,
            imgUrl: require('@/assets/GitHub.jpg'),
            A: '',
            testFetch: [],
            IdUser: '',
            name: '',
            userName: '',
            numTelephone: '',
            email: '',
            image: null,
            nomL: '',
            userL: '',
            tempName: '',
            snackbarSuccesMaj: false,
            timeout: 1500,
            text: 'Mis à jour avec success'
        }
    },
    components: { Avatar, NotificationView },
    methods: {
        async fetchUser() {
            try {
                const response = await axios.get(`http://localhost:5000/user/${this.IdUser}`)
                this.testFetch = response.data
                this.name = this.testFetch.name
                this.userName = this.testFetch.userName
                this.numTelephone = this.testFetch.numTelephone
                this.email = this.testFetch.email
                console.log('VOICI', response.data)
            }
            catch (err) {
                console.log(err)
            }
        },
        onFileChange(event) {
            this.image = event.target.files[0];
            console.log('Nouveau fichier sélectionné:', this.image);
        },
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
        reverse() {
            this.drawer = !this.drawer
            this.badge = 0
        },
        async updateInfo() {
            const values = {
                name: this.name,
                userName: this.userName,
                email: this.email,
                numTelephone: this.numTelephone
            };

            console.log(values)
            try {
                const response = await axios.put(`http://localhost:5000/user/${this.IdUser}`, values, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                this.snackbarSuccesMaj = true
                console.log(response);
                setTimeout(() => {
                    this.dialogCompte = false
                },2000)
                
                const userData = {
                    IdUser: this.IdUser,
                    userName: this.userName,
                    name: this.name
                    // Ajoutez d'autres données que vous voulez stocker
                };
                localStorage.setItem('userData', JSON.stringify(userData));
                this.fetchUser()
            } catch (err) {
                alert('ERREUR DE MISE À JOUR');
                console.log(err);
            }
        }

    },
    created() {
        const userData = localStorage.getItem('userData');
        if (userData) {
            try {
                const userObject = JSON.parse(userData)
                this.nomL = userObject.userName
                this.userL = userObject.name
                this.IdUser = userObject.IdUser
                console.log(userObject.name)
            }
            catch (err) {
                console.log(err)
            }
        }
    },
    mounted() {
        this.fetchUser()
        // this.fetchNotif()
    }

})
</script>
<style scoped>
.elements:hover {
    color: #e91e63;
}
</style>