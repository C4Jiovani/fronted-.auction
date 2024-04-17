<template>
  <v-container>
    <v-row style="max-height: 450px; overflow-y: auto; margin-bottom: 10px; padding-bottom: 10px;">
      <v-col v-for="(card, index) in elementCard" :key="index" cols="4">
        <v-hover v-slot="{ hover }">
          <v-card color="grey lighten-4" max-width="350">
            <v-img :aspect-ratio="16 / 9" :src="card.imgUrl">
              <v-expand-transition>
                <div v-if="hover" class="d-flex transition-fast-in-fast-out pink v-card--reveal text-h2 white--text"
                  style="height: 100%;">
                  {{ card.price }}
                </div>
              </v-expand-transition>
            </v-img>
            <v-card-text class="pt-6" style="position: relative;">
              <h3 class="text-h5 font-weight-light pink--text mb-2">
                {{ card.title }}
              </h3>
              <div class="font-weight-light text-h8 mb-2">
                {{ card.subtitle }}
              </div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data() {
    return {
      elementCard: []
    };
  },
  methods:{
    async getAllprods(){
      try{
        const response = await axios.get('http://localhost:5000/admin//product')
        this.elementCard = response.data
        console.log(this.elementCard)
      }
      catch(err){
        console.log(err)
      }
    },
    mounted(){
      this.getAllprods()
    }
  }
}
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
::-webkit-scrollbar {
  width: 7px;
  height: 10px;
  background-color: #F5F5F5;
  color: pink;
}

::-webkit-scrollbar-thumb {
  background-color: pink;
}

</style>
