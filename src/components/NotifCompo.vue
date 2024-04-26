<template>
        <v-list three-line style="margin-left: -35px;">
            <template v-for="(item, index) in items">
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
                                    <p class="caption" style="color: black; opacity: 40%">5 min.</p>
                                </v-col>
                            </v-row>
                        </v-list-item-title>
                        <v-list-item-subtitle style="margin-top: -5px">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque hic perspiciatis totam consectetur expedita ad vitae mollitia quis quasi quidem omnis sit unde saepe asperiores, maxime, modi sint ea fuga?</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>
</template>

<script>
import Avatar from './Avatar.vue'

export default {
    data: () => ({
        items: [
            { header: 'Today' },
            {
                subtitle: 'Lorem'
            },
            { divider: true, inset: true },
            {
                
            },
            { divider: true, inset: true },
            {
            },
            { divider: true, inset: true },
            {
            },
            { divider: true, inset: true },
            {
            },
        ],
    }),
    components:{Avatar}
}
</script>