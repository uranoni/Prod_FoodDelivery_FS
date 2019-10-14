<template>
  <v-bottom-navigation app color="primary">
    <v-btn value="recent" to="/order">
      <span>訂餐點</span>
      <v-icon>mdi-food</v-icon>
    </v-btn>

    <v-btn value="favorites" to="/history">
      <span>看歷史</span>
      <v-icon>mdi-history</v-icon>
    </v-btn>

    <!-- <v-btn value="qrcode" to="/qrcode">
      <span>掃一下</span>
      <v-icon>mdi-qrcode</v-icon>
    </v-btn>-->

    <v-btn value="nearby" to="/driver">
      <span>查進度</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
    <v-btn to="/signup">
      <span>會員註冊</span>
      <v-icon>account_circle</v-icon>
    </v-btn>
    <v-btn to="/signin" v-if="!login">
      <span>會員登入</span>
      <v-icon>assignment_ind</v-icon>
    </v-btn>
    <v-btn to="/signin" v-if="login" @click="Logout">
      <span>會員登出</span>
      <v-icon>assignment_ind</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "BottomNav",
  mounted() {
    if (localStorage.getItem("token") != null) {
      this.login = true;
      this.$router.push("/");
    }
  },
  data() {
    return {
      login: false
    };
  },
  methods: {
    Logout() {
      localStorage.clear("token");
      this.login = false;
      this.$router.push("/");
    }
  }
};
</script>