<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>會員登入</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field label="Email" name="name" type="text" v-model="form.email"></v-text-field>
                    <v-text-field
                      label="會員密碼"
                      name="password"
                      type="password"
                      v-model="form.password"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="SignIn">登入</v-btn>
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
        email: "",
        password: ""
      },
      errors: ""
    };
  },
  methods: {
    SignIn() {
      axios
        .post("login", this.form)
        .then(res => {
          localStorage.setItem("token", res.headers.access_token);
          location.reload();
        })
        .catch(err => {
          console.log(err.response.data);
          Object.keys(err.response.data.errors).map((objectKey, index) => {
            var value = err.response.data.errors[objectKey].message;
            this.errors += value + "\n";
          });
          alert(this.errors);
        });
    }
  }
};
</script>

<style>
</style>