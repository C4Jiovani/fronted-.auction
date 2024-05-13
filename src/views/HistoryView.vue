<template>
    <v-container class="about">
      <v-snackbar v-model="snackbarTrue" top color="success" :timeout="timeout">
        <b><v-icon class="mr-5">mdi-check</v-icon>{{ textTrue }}</b>
        <template></template>
      </v-snackbar>
      <v-snackbar v-model="snackbarEmpty" top color="error" :timeout="timeout">
        <b><v-icon class="mr-5">mdi-alert</v-icon>Les champs sont requis.</b>
        <template></template>
      </v-snackbar>
      <center>
        <h2 style="color: #e91e63;">Formulaire de contact</h2>
      </center>
      <v-card class="mt-5">
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-img class="mt-5" src="../assets/contact.gif"></v-img>
            </v-col>
            <v-col cols="6">
              <v-card class="mt-5" elevation="0">
                <v-container>
                  <v-form @submit.prevent="submitForm">
                    <v-text-field v-model="name" style="font-size: 14px;" placeholder="Tapez ici votre nom" elevation="0" outlined dense></v-text-field>
                    <v-text-field v-model="mail" :rules="[v => !!v || 'E-mail est requis', v => /.+@.+\..+/.test(v) || 'E-mail doit être valide']" style="font-size: 14px;" placeholder="Tapez ici votre adresse email" elevation="0" outlined dense></v-text-field>
                    <v-textarea v-model="text" style="font-size: 14px;" placeholder="Texte" elevation="0" outlined dense></v-textarea>
                    <v-btn color="#ab0767" :disabled="!validEmail" type="submit" style="color: white; margin-left: 78%;">Envoyer</v-btn>
                  </v-form>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'contactView',
    data() {
      return {
        name: '',
        mail: '',
        text: '',
        textTrue: 'Votre demande a bien été envoyée. Merci !',
        timeout: 3000,
        snackbarTrue: false,
        snackbarEmpty: false,
        validEmail: false
      }
    },
    methods: {
      submitForm() {
        if (this.name.trim() === '' || this.mail.trim() === '' || this.text.trim() === '') {
          this.snackbarEmpty = true;
        } else {
          this.name = "";
          this.mail = "";
          this.text = "";
          this.snackbarTrue = true;
        }
      }
    },
    watch: {
      mail(value) {
        this.validEmail = /.+@.+\..+/.test(value);
      }
    }
  }
  </script>
  