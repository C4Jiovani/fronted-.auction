<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-img
          v-if="!isSmallScreen"
          alt="auction logo"
          class="mr-2"
          contain
          src="../assets/IHM logo.png"
          transition="scale-transition"
          width="100"
        />
        <center v-if="!isSmallScreen">
          <v-img
            alt="auction logo"
            class="mt-2"
            contain
            src="../assets/vect.png"
            transition="scale-transition"
            width="400"
            style="margin-right: 60px"
          />
        </center>
      </v-col>
      <v-col cols="12" md="6">
        <LoginCompo />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoginCompo from "@/components/LoginCompo.vue";

export default {
  name: "LoginVue",
  data() {
    return {
      isSmallScreen: false,
    };
  },
  created() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
  methods: {
    checkScreenSize() {
      this.isSmallScreen = window.innerWidth < 600;
    },
  },
  components: { LoginCompo },
};
</script>

<style scoped>
.shrink {
  display: none;
}
</style>
