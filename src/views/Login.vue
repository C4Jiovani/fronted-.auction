<template>
    <v-container >
        <v-row>
            <v-col cols="6">
                <v-img alt="auction logo" class="shrink mr-2" contain src="../assets/IHM logo.png"
                    transition="scale-transition" width="100" />
                <center>
                    <v-img alt="auction logo" class="shrink mt-2" contain src="../assets/vect.png"
                        transition="scale-transition" width="500" style="margin-right: 60px;" />
                </center>
            </v-col>
            <v-col cols="5" class="ml-14">
                <LoginCompo/>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import LoginCompo from '@/components/LoginCompo.vue'

export default ({
    name: 'LoginVue',
    data() {
        return {
            // imageUrl = require('@/assets/')
        }
    },
    components:{LoginCompo}
})
</script>