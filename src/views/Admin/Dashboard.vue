<template>
    <v-conatiner>
        <Main></Main>
        <v-container>
            <h3 class="mt-10" append-icon="mdi-bell">Notification</h3>
            <v-btn prepend-icon="mdi-cross" color="#ab0767" class="mt-5 text-capitalize" style="color: white;">Ajouter produit</v-btn>
            <div class="mt-10">
                <h5 style="color: #666666;">Just now</h5>
                <v-card class="mt-5" style="border-radius: 50px;">
                    <v-row>
                        <v-col cols="2">
                            <Avatar class="ml-2" />
                        </v-col>
                        <v-col cols="10">
                            <v-card-subtitle style="margin-top: -20px;"> Username </v-card-subtitle>
                        </v-col>
                    </v-row>
                </v-card>
            </div>
        </v-container>
    </v-conatiner>
</template>

<script>
import Main from '@/components/Main.vue';
import Avatar from '@/components/Avatar.vue';
export default({
    name: 'AdminDash',
    components:{Main,Avatar}
})
</script>
