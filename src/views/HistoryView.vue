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
      <h2 class="contact-title">Formulaire de contact</h2>
    </center>
    <v-card class="mt-5">
      <v-container>
        <v-row>
          <v-col  md="6">
            <v-img class="contact-image" src="../assets/contact.gif"></v-img>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="mt-5" elevation="0">
              <v-container>
                <v-form @submit.prevent="submitForm">
                  <v-text-field v-model="name" class="contact-field" placeholder="Tapez ici votre nom" elevation="0" outlined dense></v-text-field>
                  <v-text-field v-model="mail" :rules="[v => !!v || 'E-mail est requis', v => /.+@.+\..+/.test(v) || 'E-mail doit être valide']" class="contact-field" placeholder="Tapez ici votre adresse email" elevation="0" outlined dense></v-text-field>
                  <v-textarea v-model="text" class="contact-field" placeholder="Texte" elevation="0" outlined dense></v-textarea>
                  <v-btn color="#ab0767" :disabled="!validEmail" type="submit" class="contact-button">Envoyer</v-btn>
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

<style scoped>
.about {
  padding: 20px;
}
.contact-title {
  color: #e91e63;
}
.contact-image {
  max-width: 100%;
  height: auto;
}
.contact-field {
  font-size: 14px;
}
.contact-button {
  color: white;
  margin-left: auto;
  margin-top: 16px;
}
</style>
