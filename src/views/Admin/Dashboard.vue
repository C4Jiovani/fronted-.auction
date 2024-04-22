<template>
    <v-conatiner>
        <Main></Main>
        <v-container>
            <div style="margin-left: 110px;">
                <h3 class="mt-10" append-icon="mdi-bell">Notification</h3>

            
                <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="#ab0767"
            dark
            v-bind="attrs"
            v-on="on"
            prepend-icon="mdi-cross"  class="mt-5 text-capitalize" style="color: white;"
          >
          Ajouter produit
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
                <v-text-field placeholder="Nom produit" class="mt-2" style="font-size: 14px;" elevation="0" name="email" outlined dense></v-text-field>
                <label style="font-size: 15px;"><b>Prix du produit :</b></label>
                <v-text-field type="number" placeholder="Prix du produit :" :rules="rules" class="mt-2" style="font-size: 14px;" elevation="0" name="email" outlined dense></v-text-field>
                <label style="font-size: 15px;"><b>L'image du produit :</b></label>
                <v-file-input label="Choisir l'image" filled  dense></v-file-input>
                <!-- <input type="file"> -->
                
                <label style="font-size: 15px;"><b>Date de publication :</b></label>
                
                <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker in menu"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      <label style="font-size: 15px;"><b class="mt-5">La description du produit :</b></label>
                <v-textarea solo placeholder="your text" dense></v-textarea>
            </v-form>
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              I accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
            </div>
                <div class="mt-4">
                
                <v-container>
                    <v-row>
                        <v-col cols="1"></v-col>
                        <v-col cols="10" style="height: 400px; overflow-y: auto; overflow-x: hidden;">
                            <h5 style="color: #666666;">Just now</h5>
                <v-card v-for="(element, i) in elements" :key="i" class="mt-5" style="border-radius: 50px; height: 60px; background-color: #dbdbdb;" elevation="0">
                    <v-row>
                        <v-col cols="2" style="margin-top:-6px;">
                            <Avatar class="ml-2" />
                        </v-col>
                        <v-col cols="10">
                            <v-card-subtitle style="font-weight: bold;margin-top: -20px; margin-left: -90px;"> {{ element.username }} </v-card-subtitle>
                        </v-col>
                        <v-row style="margin-left:90px;margin-top:-48px;">
                            <v-col cols="3"><p style="color: #ab0767; font-size: 13px;">Product :<span style="color: black; font-size: 13px;"> {{ element.product }} </span></p></v-col>
                            <v-col cols="3"><p style="color: #ab0767; font-size: 13px;">Price : <span style="color: black; font-size: 13px;">{{ element.price }}</span></p></v-col>
                        </v-row>
                        <div style="display:flex; margin-left:50px;">
                            
                            
                        </div>
                    </v-row>
                </v-card>
                        </v-col>
                        <v-col cols="1"></v-col>
                    </v-row>
                    
            </v-container>
            </div>
        </v-container>
    </v-conatiner>
</template>

<script>
import Main from '@/components/Main.vue';
import Avatar from '@/components/Avatar.vue';
export default({
    name: 'AdminDash',
    components:{Main,Avatar},
    data(){
        return {
            dialog: false,
            date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
            elements:[
                {
                    username : "Jiovani",
                    product : "Art numero 5",
                    price : "500"
                },
                {
                    username : "Ratoky",
                    product : "Art numero 6",
                    price : "800"
                },
                {
                    username : "Mario",
                    product : "Art numero 7",
                    price : "900"
                }
            ],
            rules: [
                v => /^\d+$/.test(v) || 'Le prix doit être uniquement un nombre'
            ],
        }
    }
})

</script>
