<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>會員註冊</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field label="會員名稱" name="name" type="text" v-model="form.name"></v-text-field>
                    <v-text-field
                      label="會員密碼"
                      name="password"
                      type="password"
                      v-model="form.password"
                    ></v-text-field>
                    <v-text-field
                      label="會員密碼確認"
                      name="passwordConfirm"
                      type="password"
                      v-model="form.passwordConfirm"
                    ></v-text-field>
                    <v-text-field label="Email" name="email" type="text" v-model="form.email"></v-text-field>
                    <v-text-field label="年齡" name="age" type="text" v-model="form.age"></v-text-field>
                    <v-text-field label="聯絡電話" name="phone" type="text" v-model="form.phone"></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="SignUp">註冊</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        password: "",
        passwordConfirm: "",
        email: "",
        age: "",
        phone: ""
      }
    };
  },
  methods: {
    SignUp() {
      if (this.form.password === this.form.passwordConfirm) {
        axios
          .post("signup", this.form)
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style>
</style>