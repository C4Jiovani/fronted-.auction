<template>
    <div>
        <v-app-bar app color="darken-3" default elevation="0">
            <div class="d-flex align-center">
                <v-img alt="auction logo" class="shrink mr-2" contain src="../assets/IHM logo.png"
                    transition="scale-transition" width="100" />
            </div>
            <v-spacer></v-spacer>
            <Avatar/>
        </v-app-bar>
    </div>
  </template>
  
  <script>
  import Avatar from '../components/Avatar.vue'
  export default ({
    name: 'AccueilVue',
    components:{Avatar}
  })
  </script>