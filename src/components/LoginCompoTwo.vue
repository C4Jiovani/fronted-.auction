<template>
    <div>
        <v-snackbar v-model="snackbar" shaped top color="success" :timeout="timeout">
            {{ text }}

            <template v-slot:action="{ attrs }">
                <v-btn color="blue" text v-bind="attrs" @click="snackbar = false" append-icon="home">
                </v-btn>
            </template>
        </v-snackbar>
        <v-snackbar v-model="snackbarWrongPass" shaped color="warning" :timeout="timeout">
            <v-icon class="mr-3">mdi-alert</v-icon>
            <b>{{ textWrongPass }}</b>
        </v-snackbar>
        <v-snackbar v-model="snackbarDoneSignup" shaped top color="success" :timeout="timeout">
            {{ textDoneSignup }}
            <template v-slot:action="{ attrs }">
                <v-btn color="blue" text v-bind="attrs" @click="snackbar = false" append-icon="home">
                </v-btn>
            </template>
        </v-snackbar>
        <v-tabs v-model="tab" color="pink" left style="margin-top: 50px;">
            <v-tab :key="1" style="padding-right: 18%;padding-left: 18%;"
                class="text-capitalize"><b>Connexion</b></v-tab>
            <v-tab :key="2" style="padding-right: 18%;padding-left: 18%;"
                class="text-capitalize"><b>s'inscrire</b></v-tab>
        </v-tabs>


        <v-tabs-items v-model="tab">
            <v-tab-item :key="1">
                <v-form>
                    <br><br>
                    <label style="font-size: 15px;"><b>E-mail :</b></label>
                    <v-text-field placeholder="Exemple@gmail.com" style="font-size: 14px;" elevation="0"
                        v-model="loginForm.email" name="email" outlined dense @input="checkFormValidity"></v-text-field>
                    <label style=""><b>Mots de passe :</b></label>
                    <v-text-field v-model="loginForm.password" placeholder="Mots de passe" style="font-size: 14px;"
                        outlined dense :type="showPass ? 'text' : 'password'" @click:append="reverse()"
                        :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'" @input="checkFormValidity"></v-text-field>
                    <v-btn type="submit" color="#ab0767"
                        style="width: 100%; color: white;border-radius: 5px; height: 45px;" class="text-capitalize"
                        @click.prevent="login" :loading="load" :disabled="isFormInvalid"><b>Se
                            connecter</b></v-btn>
                </v-form>
                <div style="margin-top: 20px;">
                    <a class="Forgot-password"   style="color: black;font-size:14px; opacity: 64%;" @click="forgetPass()">Mots de passe oublié?</a>
                </div>
            </v-tab-item>

            <v-tab-item :key="2">
                <v-form>
                    <v-text-field v-model="signupForm.name" required outlined dense
                        prepend-inner-icon="mdi-account-outline mdi-card-account-details" label="Nom"
                        class="mt-5"></v-text-field>
                    <v-text-field v-model="signupForm.userName" outlined dense prepend-inner-icon="mdi-account-outline"
                        label="Nom d'utilisateur"></v-text-field>
                    <v-text-field v-model="signupForm.email" outlined dense label="Email"
                        prepend-inner-icon="mdi-gmail"></v-text-field>
                    <v-text-field v-model="signupForm.numTelephone" outlined dense :rules="rules"
                        prepend-inner-icon="mdi-phone" label="Numero de telephone"></v-text-field>
                    <v-text-field v-model="signupForm.password" outlined dense label="Mots de passe"
                        prepend-inner-icon="mdi-lock-outline" type="password"></v-text-field>
                    <v-btn color="#ab0767" @click.prevent="signup()"
                        style="width: 100%; color: white;">S'inscrire</v-btn>
                </v-form>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'loginVueTwo',
    data() {
        return {
            tab: 2,
            loginForm: {
                email: '',
                password: '',
            },
            signupForm: {
                name: '',
                userName: '',
                email: '',
                password: '',
                numTelephone: '',
                profile: 'mdi-user'
            },
            rules: [
                v => /^\d+$/.test(v) || 'Le numero de telephone doit être un nombre',
                v => /^\d{10}$/.test(v) || 'Le numero de telephone doit comporter 10 chiffres',
            ],
            snackbar: false,
            text: `Bienvenue ${this.username}`,
            timeout: 2000,
            load: false,
            rulesErr: false,
            showPass: false,
            isFormInvalid: true,
            textWrongPass: 'Identifiant incorrect veuillez verifier',
            snackbarWrongPass: false,
            textDoneSignup: 'Compte créer avec succès',
            snackbarDoneSignup: false
        };
    },
    created() {
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('http://localhost:5000/user/login', this.loginForm);
                const { user, token } = response.data; // Récupérer les données utilisateur et le token de la réponse
                localStorage.setItem('accessToken', token);
                localStorage.setItem('userData', JSON.stringify(user));
                if (this.loginForm.email === 'Admin' && this.loginForm.password === '123') {
                    this.$router.push('/admin');
                }
                else {
                    setTimeout(() => {
                        this.$router.push('/accueil');
                    }, 100);
                }

            } catch (err) {
                this.rulesErr = true;
                this.snackbarWrongPass = true
            }
        },

        async signup() {
            try {
                await axios.post('http://localhost:5000/user/register', this.signupForm)
                this.loginForm = { name: '', userName: '', email: '', password: '', numTelephone: '', profile: '' };
                this.signupForm.email = '',
                    this.signupForm.name = '',
                    this.signupForm.numTelephone = '',
                    this.signupForm.password = '',
                    this.signupForm.userName = ''
                this.snackbarDoneSignup = true
            }
            catch (err) {
                // alert('Erreur lors de la inscri');
            }
            // Ajoutez votre logique d'inscription ici
            console.log('Inscription en cours:', this.signupForm);
        },
        async forgetPass() {
            this.$router.push('/forgetpass')
        },
        reverse() {
            this.showPass = !this.showPass
        },
        checkFormValidity() {
            this.isFormInvalid = !this.loginForm.email || !this.loginForm.password;
        },
    },
};

</script>

<style scoped>
    .Forgot-password:hover{
        text-decoration: underline;
    }
</style>