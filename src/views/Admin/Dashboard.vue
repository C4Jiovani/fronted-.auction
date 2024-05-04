<template>
    <v-container>
        <Main></Main>
        <v-container>
            <div style="margin-left: 110px;">
                <h1 class="mt-10" append-icon="mdi-bell">Notification</h1>

                <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="#ab0767" dark v-bind="attrs" v-on="on" class="mt-5 text-capitalize"
                            style="color: white;">
                            <b>Ajouter produit</b>
                        </v-btn>
                        <v-btn color="#ab0767" dark v-bind="attrs" v-on="on" class="mt-5 text-capitalize"
                            style="color: white;">
                            <b>Ajouter produit</b>
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-title class="text-h5">
                            <center>
                                <b style="color:#ab0767; margin-left: 50px;">Publier un nouveau article</b>
                            </center>
                        </v-card-title>

                        <v-card-text>
                            <v-form class="mt-3">
                                <label style="font-size: 15px;"><b class="mt-2">Nom du produit :</b></label>
                                <v-text-field placeholder="Nom produit" v-model="productName" class="mt-2"
                                    style="font-size: 14px;" elevation="0" name="email" outlined dense></v-text-field>
                                <label style="font-size: 15px;"><b>Prix du produit :</b></label>
                                <v-text-field type="number" placeholder="Prix du produit :" :rules="rules" class="mt-2"
                                    style="font-size: 14px;" elevation="0" name="email" v-model="initialPrice" outlined
                                    dense></v-text-field>
                                <v-text-field type="number" placeholder="Prix du produit :" :readonly="true"
                                    class="mt-2" style="font-size: 14px; display: none" elevation="0" name="email"
                                    v-model="finalPrice" outlined dense></v-text-field>
                                <label><b>Image:</b></label><br>
                                <input type="file" @change="handleFileUpload" accept="image/*" required><br>
                                <label style="font-size: 15px;"><b class="mt-5">La classe produit :</b></label>
                                <v-combobox clearable hide-selected outlined :items="items"
                                    v-model="status"></v-combobox>
                                <label style="font-size: 15px;"><b class="mt-5">L'auteur du produit :</b></label>
                                <v-text-field outlined placeholder="your text" dense
                                    v-model="description"></v-text-field>
                            </v-form>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="addProduct()" color="#ab0767" outlined
                                class="mt-5 mb-2 text-capitalize">Creer
                                ma
                                publication</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
            <div class="mt-4">
                <v-container>
                    <v-row>
                        <v-col cols="1"></v-col>
                        <v-col cols="10" style="height: 400px; overflow-y: auto; overflow-x: hidden;">
                            <v-card v-for="(element, i) in elements" :key="i" class="mt-5"
                                style="border-radius: 50px; height: 60px; background-color: #dbdbdb;" elevation="0">
                                <v-row>
                                    <v-col cols="2" style="margin-top:-6px;">
                                        <Avatar class="ml-2" />
                                    </v-col>
                                    <v-col cols="10">
                                        <v-card-subtitle
                                            style="font-weight: bold;margin-top: -20px; margin-left: -90px;">{{
                    element.username }}</v-card-subtitle>
                                    </v-col>
                                    <v-row style="margin-left:90px;margin-top:-48px;">
                                        <v-col cols="3">
                                            <p style="color: #ab0767; font-size: 13px;">Product :<span
                                                    style="color: black; font-size: 13px;">{{ element.product }}</span>
                                            </p>
                                        </v-col>
                                        <v-col cols="3">
                                            <p style="color: #ab0767; font-size: 13px;">Price : <span
                                                    style="color: black; font-size: 13px;">{{ element.price }}</span>
                                            </p>
                                        </v-col>
                                    </v-row>
                                    <div style="display:flex; margin-left:50px;"></div>
                                </v-row>
                            </v-card>
                        </v-col>
                        <v-col cols="1"></v-col>
                    </v-row>
                </v-container>
            </div>
        </v-container>
    </v-container>
</template>

<script>
import Main from '@/components/Main.vue';
import Avatar from '@/components/Avatar.vue';
import axios from 'axios';

export default {
    name: 'AdminDash',
    components: { Main, Avatar },
    data() {
        return {
            selectedItem: null,
            dialog: false,
            menu: false,
            modal: false,
            menu2: false,
            files: null,
            // date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            elements: [
                {
                    username: "Jiovani",
                    product: "Art numero 5",
                    price: "500"
                },
                {
                    username: "Ratoky",
                    product: "Art numero 6",
                    price: "800"
                },
                {
                    username: "Mario",
                    product: "Art numero 7",
                    price: "900"
                }
            ],
            rules: [
                v => /^\d+$/.test(v) || 'Le prix doit être uniquement un nombre'
            ],
            productName: '',
            initialPrice: 0,
            finalPrice: 0,
            description: '',
            status: 'Active',
            image: null,
            items: [
                'Classe A',
                'Classe B',
                'Classe C',
            ],
        }
    },
    methods: {
        handleFileUpload(event) {
            this.image = event.target.files[0];
        },
        async addProduct() {
            const formData = new FormData();
            formData.append('NomPro', this.productName);
            formData.append('PrixInitial', this.initialPrice);
            formData.append('PrixFinale', this.finalPrice);
            formData.append('desc', this.description);
            formData.append('status', this.status);
            formData.append('image', this.image);

            try {
                const response = await axios.post('http://localhost:5000/admin/product', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    // this.dialog = false,

                });
                console.log(response.data);
                // Réinitialisez les valeurs du formulaire après l'ajout réussi
                this.productName = '';
                this.initialPrice = 0;
                this.finalPrice = 0;
                this.description = '';
                this.status = 'classeA';
                this.image = null;
            } catch (error) {
                console.error(error);
            }
        },
    },
}
</script>