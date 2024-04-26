<template>
  <div class="about">
    <v-container>
      <v-row>
        <v-col cols="1">
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
export default ({
  name: 'nodtiPage',
  components: {NotifCompo}
})
</script>
