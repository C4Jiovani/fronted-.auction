<template>
        <v-list three-line style="margin-left: -35px;">
            <template v-for="(item, index) in notif">
                <v-subheader v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>

                <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

                <v-list-item v-else :key="item.title">
                    <v-list-item-avatar width="60" height="60">
                        <Avatar></Avatar>

                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title class="mb-0">
                            <v-row>
                                <v-col cols="9">
                                    <h4>.Auction</h4>
                                </v-col>
                                <v-col cols="3">
                                </v-col>
                            </v-row>
                        </v-list-item-title>
                        <v-list-item-subtitle style="margin-top: -5px">{{ notif[0].motif }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>
</template>

<script>
// import axios from 'axios';
import Avatar from './Avatar.vue'

export default {
    data: () => ({
        notifText: '',
        items: [
            { header: 'Today' },
            {
                subtitle: 'Lorem'
            },
        ],
        notif: []
    }),
    components:{Avatar},
    mounted(){
        this.fetchNotif()
    },
    methods:{
        async fetchNotif() {
      try {
        const response = await fetch('http://localhost:5000/admin/getnotif');
        const data = await response.json();
        this.notif = data;
        // alert(this.notif.length)
      } catch (error) {
        console.error(error);
      }
    },
    }
}
</script>