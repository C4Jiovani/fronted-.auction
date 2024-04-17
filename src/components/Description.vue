<template>
    <v-row>
        <v-col cols="7">
            <p class="bigTitle" style="margin-top: 100px;"><b>Plongez dans l'excitation des Enchères :</b></p>
            <p class="mt-10" style="color: #666666;">
                Découvrez des trésors uniques sur notre plateforme en ligne
            </p>
            <v-btn color="#ab0767" dark class="mt-6 text-capitalize" elevation="2" rounded large
                @click="redirectionPageConnexion">
                <b>Se Connecter</b>
                <v-icon class="ml-3 pt-3 pb-3">mdi-arrow-right</v-icon>
            </v-btn>
        </v-col>
        <v-col cols="1" class="image">
            <img :src="require('@/assets/curseur.png')" alt="" style="margin-left: -70px;" width="50px" height="50px" />
        </v-col>
        <v-col cols="4">
            <img :src="require('@/assets/imgAccueil.png')" alt="" />
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'HomeView',
    methods: {
        redirectionPageConnexion() {
            // Redirection vers la page "pageConnexion.vue"
            this.$router.push('/login');
        }
    }
}
</script>

<style scoped>
.bigTitle {
    font-size: 64px;
    font-weight: bolder;
    color: #0d0d0d;
    line-height: 70px;
}

.subtitle {
    color: #222222;
    font-size: 20px;
}

.image {
    margin-top: 200px;
}
.test{
    font-size: 10px;
}
</style>