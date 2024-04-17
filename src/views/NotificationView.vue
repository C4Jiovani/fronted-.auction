<template>
  <div class="about">
    <Main />
    <v-container>
      <v-row>
        <v-col cols="1">
          <navBar class="mt-16" />
        </v-col>
        <v-col cols="11">
          <h1 class="mt-5" id="produits">Notifications</h1>
          <NotifCompo/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import NotifCompo from '@/components/NotifCompo.vue'
import Main from '@/components/Main.vue';
import navBar from '../components/navBar.vue'
export default ({
  name: 'nodtiPage',
  components: { navBar, Main ,NotifCompo}
})
</script>
