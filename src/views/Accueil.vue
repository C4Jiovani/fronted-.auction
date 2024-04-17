<template>
    <div>
        <Main />
        <v-container>
            <v-row>
                <v-col cols="1">
                    <navBar class="mt-16" />
                </v-col>
                <v-col cols="11">
                    <h1 class="mt-5" id="produits">Prochainement </h1>
                    <CardAccueil />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import CardAccueil from '@/components/CardAccueil.vue';
import Main from '@/components/Main.vue';
import navBar from '@/components/navBar.vue';

export default {
    name: 'HomeView',

    components: {
        Main,
        navBar,
        CardAccueil
    },
}
</script>
<style scoped>
#produits {
  background: linear-gradient(to right, #4d5fff, #ff5c87);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

</style>