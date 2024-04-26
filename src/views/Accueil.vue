<template>
    <div>
        <Main />
        <v-container>
            <v-row>
                <v-col cols="0">
                    <!-- <navBar class="mt-16" /> -->
                </v-col>
                <v-col cols="12">
                    <router-view></router-view>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
// import jwt_decode from 'jwt-decode';
// import CardAccueil from '@/components/CardAccueil.vue';
import Main from '@/components/Main.vue';
// import navBar from '@/components/navBar.vue';

export default {
    name: 'HomeView',

    components: {
        Main
    },
}
</script>
<style scoped>

/* #produits {
  background: linear-gradient(to right, #4d5fff, #ff5c87);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
} */

</style>