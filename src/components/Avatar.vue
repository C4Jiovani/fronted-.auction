<template>
          <v-avatar>
              <v-img  :src="imgUrl" alt="Jiovani">
              </v-img>
          </v-avatar>
</template>
<script>
export default ({
    name: 'HelloWorld',
    data(){
        return{
            imgUrl: require('@/assets/GitHub.jpg')
        }
    }
})
</script>