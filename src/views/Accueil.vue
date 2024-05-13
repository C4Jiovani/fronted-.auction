<template>
    <div class="bg">
        <div class="content">
            <Main />
            <v-container >
                <v-row>
                    <v-col cols="0">
                    </v-col>
                    <v-col cols="12">
                        <router-view></router-view>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
import Main from '@/components/Main.vue';

export default {
    name: 'HomeView',
    data(){
        return{
            user: ''
        }
    },

    components: {
        Main
    },
    beforeMount() {
        if(this.user == ''){
            this.$router.push('/login')
        }
    }
    ,
    created() {
        const userData = localStorage.getItem('userData');
        if (userData) {
            try {
                const userObject = JSON.parse(userData)
                this.user = userObject.name
                console.log(userObject.name)
            }
            catch (err) {
                console.log(err)
            }
        }
    },
}
</script>
<style scoped>
.bg {
    /* background-image: url('../assets/bing.jpeg'); */
    background-repeat: no-repeat;
    background-size: cover;
}
@media only screen and (min-width:300px ){
    
}
</style>