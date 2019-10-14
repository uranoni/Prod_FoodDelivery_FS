<template>
  <v-container>
    <v-layout text-center row>
      <v-flex mb-12>
        <h1 class="display-2 font-weight-bold mb-3">建立訂單</h1>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex mb-12>
        <v-text-field label="收餐人" outlined v-model="receiver"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout></v-layout>

    <v-layout>
      <v-flex mb-12>
        <v-text-field label="送餐地址" outlined v-model="subaddress"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-select :items="items" label="支付方式" outlined v-model="paymethods"></v-select>
    </v-layout>
    <v-btn class="ma-2" color="primary" @click="suborder">送出</v-btn>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: ["CASH", "CARD", "LINE"],
    receiver: "",
    subaddress: "",
    paymethods: ""
  }),
  props: ["orderDate", "orderTime", "menu"],
  methods: {
    suborder() {
      this.$emit("onSuccess");
      axios
        .post(
          "/order/create",
          {
            arriveTime: this.orderDate + " " + this.orderTime,
            arriveAddress: this.subaddress,
            product: this.menu,
            payment: this.paymethods,
            reciver: this.receiver
          },
          {
            headers: {
              access_token: localStorage.getItem("token")
            }
          }
        )
        .then(res => {
          console.log(res.data);
          alert("建立成功");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
