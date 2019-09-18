<template>
  <v-container>
    <v-layout text-center row>
      <v-flex mb-12>
        <h1 class="display-2 font-weight-bold mb-3">建立訂單</h1>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex mb-6>
        <v-text-field label="收餐人" outlined v-model="receiver"></v-text-field>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex mb-6>
        <v-text-field label="訂餐者" outlined v-model="order"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout></v-layout>
    <v-layout>
      <v-flex mb-12>
        <v-text-field label="取餐店家/地址" outlined v-model="subaddress"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex mb-12>
        <v-text-field label="送餐地址" outlined v-model="readdress"></v-text-field>
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
    items: ["現金", "信用卡", "Line"],
    receiver: "",
    order: "",
    subaddress: "",
    readdress: "",
    paymethods: ""
  }),
  methods: {
    suborder() {
      this.$emit('onSuccess')
      // axios
      //   .post("order/createOrder", {
      //     receiver: this.receiver,
      //     order: this.order,
      //     subaddress: this.subaddress,
      //     readdress: this.readdress,
      //     paymethods: this.paymethods
      //   })
      //   .then(res => {
      //     console.log(res);
      //     alert("建立成功");
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  }
};
</script>
