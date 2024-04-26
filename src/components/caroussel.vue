<template>
    <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
        <v-carousel-item v-for="(item, i) in items" :key="i">
            <v-row class="fill-height" align="center" justify="center">
                <v-img :src="item.src"></v-img>
            </v-row>
        </v-carousel-item>
    </v-carousel>
</template>

<script>
export default {
    name: 'TestCar',
    data() {
        return {
            items: [
                {
                    src: require('@/assets/C1.jpg'),
                },
                {
                    src: require('@/assets/C6.jpg'),
                },
                {
                    src: require('@/assets/C5.jpg'),
                },
            ],
    }
},
}
</script>