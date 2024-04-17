<template>
    <div style="max-height: 450px; overflow-y: auto; overflow-x: hidden; padding: 30px;">
        <v-card class="card mt-5" v-for="(element, i) in notifBody" :key="i" elevation="2">
            <v-row>
                <v-col cols="1">
                    <Avatar class="ml-3"></Avatar>
                </v-col>
                <v-col cols="11">
                    <h3 class="notifiaction_Title">.Auction</h3>
                    <p class="test">{{ element.body }}</p>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
import Avatar from './Avatar.vue'
export default ({
    name: 'notifCompo',
    data() {
        return {
            notifBody: [
                {
                    body: 'Y aura une vente en ligne dans 15 minutes. Preparez Vous !!!'
                },
                {
                    body: 'Y aura une vente en ligne dans 15 minutes. Preparez Vous !!!'
                },
                {
                    body: 'Y aura une vente en ligne dans 15 minutes. Preparez Vous !!!'
                },
                {
                    body: 'Y aura une vente en ligne dans 15 minutes. Preparez Vous !!!'
                },
                {
                    body: 'Y aura une vente en ligne dans 15 minutes. Preparez Vous !!!'
                },
                {
                    body: 'Y aura une vente en ligne dans 15 minutes. Preparez Vous !!!'
                },
                {
                    body: 'Y aura une vente en ligne dans 15 minutes. Preparez Vous !!!'
                },
            ]
        }
    },
    components: { Avatar }
})
</script>
<style scoped>
.test {
    margin-bottom: -10px;
    font-size: 15px;
    color: #30353c;
}

.card {
    border-radius: 20px;
    background-color: #FFE6BC;
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