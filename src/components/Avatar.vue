<template>
    <v-avatar>
        <v-img :src="imgUrl" alt="Jiovani">
        </v-img>
        <v-icon>{{ user }}</v-icon>
    </v-avatar>
</template>
<script>
export default ({
    name: 'HelloWorld',
    data() {
        return {
            imgUrl: require('@/assets/GitHub.jpg'),
            user : ''
        }
    },
    mounted() {
        const userData = localStorage.getItem('userData');
        if (userData) {
            try {
                const userObject = JSON.parse(userData)
                this.user = userObject.profile
                // this.userL = userObject.name
            } catch (err) {
                console.log(err)
            }
        }
    }
})
</script>