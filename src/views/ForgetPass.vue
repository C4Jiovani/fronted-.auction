<template>
    <v-container>
        <v-snackbar v-model="snackbarWrongPass" shaped color="warning" :timeout="timeout">
            <v-icon class="mr-3">mdi-alert</v-icon>
            <b>{{ textWrongPass }}</b>
        </v-snackbar>
        <center>
            <h1 class="mt-8">Recuperation de votre mots de passe</h1>
        </center>
        <v-stepper v-model="e1" style="margin-top: 80px;">
            <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">
                    Vérification 1
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2">
                    recupération des données
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3">
                    Confirmation Email
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="4">
                    Name of step 4
                </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card class="mb-5" elevation="0" height="200px">
                        <center>
                            <h3>Essayer de recupérer votre compte</h3>
                        </center>
                        <v-container class="mt-5">
                            <p style="color: black; opacity: 70%;">Veuillez saisir votre email :</p>
                            <v-text-field style="font-size: 13px;" elevation="0" placeholder="exemple@gmail.com" dense
                                outlined v-model="email"></v-text-field>
                        </v-container>
                    </v-card>

                    <v-btn color="pink" style="color: white;" :disabled="email == ''" @click="checkUserByEmail()">
                        Continue
                    </v-btn>

                    <v-btn text @click="cancelEdit()">
                        Cancel
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-card class="mb-12" elevation="0" height="200px">
                        <center>
                            <h3>Verification de vos données</h3>
                        </center>
                        <v-container>
                            <v-timeline align-top dense>
                                <v-timeline-item color="blue" small>
                                    Nom d'utilisateur: <b>{{ userName }}</b>
                                </v-timeline-item>
                                <v-timeline-item color="blue" small>
                                    Nom: <b>{{ name }}</b>
                                </v-timeline-item>
                                <v-timeline-item color="blue" small>
                                    Email: <b>{{ email }}</b>
                                </v-timeline-item>
                            </v-timeline>
                        </v-container>
                    </v-card>

                    <v-btn color="pink" style="color: white;" @click="sendVerificationCode()">
                        Continue
                    </v-btn>

                    <v-btn text @click="cancelEdit()">
                        Cancel
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-card class="mb-6" elevation="0" height="200px">
                        <center>
                            <h3>Validation du code</h3>
                            <p class="mt-5">Code envoyé mail <b>{{ email }}</b></p>
                        </center>
                        <v-container>
                            <div class="ma-auto position-relative" style="max-width: 300px">
                                <v-otp-input v-model="otp" :disabled="loading" @finish="onFinish"></v-otp-input>
                                <v-overlay absolute :value="loading">
                                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                                </v-overlay>
                            </div>
                            <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="2000">
                                {{ text }}
                            </v-snackbar>
                        </v-container>
                    </v-card>
                    <v-btn color="pink" style="color: white;" :disabled="otp !== expectedOtp || loading"
                        @click="e1 = 4">
                        Continue
                    </v-btn>

                    <v-btn text @click="cancelEdit()">
                        Cancel
                    </v-btn>
                </v-stepper-content>
                <v-stepper-content step="4">
                    <v-card class="mb-12" elevation="0" height="200px">
                        <center>
                            <h3>Veuillez saisir votre nouveau mots de passe</h3>
                        </center>
                        <v-container>
                            <label style="font-size: 15px;"><b>Votre nouveau mot de passe :</b></label>
                            <v-text-field v-model="password1" placeholder="Nouveau mot de passe"
                                style="font-size: 14px;" elevation="0" outlined dense
                                :rules="passwordRules"></v-text-field>

                            <label style="font-size: 15px;"><b>Tapez à nouveau votre nouveau mot de passe :</b></label>
                            <v-text-field v-model="password2" placeholder="Nouveau mot de passe"
                                style="font-size: 14px;" elevation="0" outlined dense
                                :rules="passwordRules"></v-text-field>
                        </v-container>
                    </v-card>

                    <v-btn color="pink" style="color: white;"
                        :disabled="password1 !== password2 || password1 === '' || password2 === ''"
                        @click="updatePassword()">
                        Continue
                    </v-btn>

                    <v-btn text @click="cancelEdit()">
                        Cancel
                    </v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
        <v-snackbar v-model="snackbarPass" color="success" :timeout="timeoutPass" :vertical="vertical">
            {{ textPass }}

            <template v-slot:action="{ attrs }">
                <v-btn color="indigo" text v-bind="attrs" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>

<script>
import axios from 'axios'
// import { response } from 'express'

export default {
    data() {
        return {
            e1: 1,
            email: '',
            userName: '',
            name: '',
            snackbarWrongPass: false,
            textWrongPass: 'L\'utilisateur n\'existe pas veuillez verifier',
            timeout: 2000,
            check: null,
            loading: false,
            snackbar: false,
            snackbarColor: 'default',
            otp: '',
            text: '',
            expectedOtp: '',
            password1: '',
            password2: '',
            passwordRules: [
                value => !!value || 'Ce champ est requis',
                value => (value && value.length >= 8) || 'Le mot de passe doit contenir au moins 8 caractères',
                value => value === this.password1 || 'Les mots de passe ne correspondent pas'
            ],
            snackbarPass: false,
            textPass: 'Felicitaion !! Mot de passe changé avec success',
            vertical: true,
            timeoutPass: 2000,
            // randomNumber: ''
        }
    },
    computed: {
        isOTPValid() {
            // Vérifiez si l'OTP entré correspond à l'OTP attendu
            return this.otp === this.expectedOtp;
        }
    },
    methods: {
        onFinish(rsp) {
            this.loading = true
            setTimeout(() => {
                this.loading = false
                this.snackbarColor = (rsp === this.expectedOtp) ? 'success' : 'warning'
                this.text = `Processed OTP with "${rsp}" (${this.snackbarColor})`
                this.snackbar = true
            }, 3500)
        },
        cancelEdit() {
            this.$router.push('/login')
        },
        async checkUserByEmail() {
            try {
                const response = await axios.post('http://localhost:5000/user/check', { email: this.email });
                if (response.status === 200) {
                    // Utilisateur trouvé, manipulez les données comme nécessaire
                    this.e1 = 2
                    this.name = response.data.user.name
                    this.userName = response.data.user.userName
                    console.log(response.data);
                } else {
                    console.log('Utilisateur non trouvé');
                }
            } catch (error) {
                this.snackbarWrongPass = true
                console.error('Erreur lors de la vérification de l\'utilisateur:', error);
            }
        },
        async sendVerificationCode() {
            try {
                const response = await axios.post('http://localhost:5000/user/sendVerificationCode', { email: this.email })
                console.log(response.data.message)
                console.log('Mail envoyé')
                this.sendVerificationCodeMail()
                this.e1 = 3
            }
            catch (err) {
                console.log('erreur')
            }
        },
        async sendVerificationCodeMail() {
            try {
                console.log(this.email)
                const response = await axios.post('http://localhost:5000/user/verificationcodemail', { email: this.email })
                this.expectedOtp = response.data.code.toString()
                console.log('OK VOILa le code', this.expectedOtp)
            }
            catch (err) {
                console.log(err)
            }
        },
        updatePassword() {
            const requestData = {
                email: this.email,
                password: this.password1
            }
            axios.post('http://localhost:5000/user/resetpass', requestData)
                .then(response => {
                    console.log(response.data)
                    this.email = '',
                        this.password1 = '',
                        this.snackbarPass = true,
                        setTimeout(() => {
                            this.$router.push('/login')
                        }, 2000)
                    // alert('Password has been changed')
                })
                .catch(err => {
                    console.log(err)
                })

        }
    },
}
</script>
<style scoped>
.position-relative {
    position: relative;
}
</style>