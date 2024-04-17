<template>
    <div>
      <AppBar />
      <v-container>
        <Description></Description>
      </v-container>
    </div>
  </template>
  
  <script>
//   import Description from "../components/Description";
import Description from "@/components/Description.vue"
import AppBar from "@/components/AppBar.vue"
  
  export default {
    name: "HomeView",
  
    components: {
      Description,
      AppBar,
    },
  };
  </script>
  