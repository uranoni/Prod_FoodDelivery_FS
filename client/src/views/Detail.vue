<template>
  <v-simple-table>
    <thead>
      <tr>
        <th class="text-left">屬性</th>
        <th class="text-left">內容</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>取餐人</td>
        <td>{{ receiver }}</td>
      </tr>
      <tr>
        <td>訂餐人</td>
        <td>{{ order }}</td>
      </tr>
      <tr>
        <td>送餐地址</td>
        <td>{{subaddress}}</td>
      </tr>
      <tr>
        <td>取餐地址</td>
        <td>{{ readdress }}</td>
      </tr>
      <tr>
        <td>支付方式</td>
        <td>{{ paymethods }}</td>
      </tr>
    </tbody>
    {{list}}
  </v-simple-table>
</template>

<script>
export default {
  mounted() {
    axios
      .get(`order/detail/${this.$route.params.id}`)
      .then(response => {
        const res = response.data;
        console.log(res);
        this.receiver = res.receiver;
        this.order = res.order;
        this.subaddress = res.subaddress;
        this.readdress = res.readdress;
        this.paymethods = res.paymethods;
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      receiver: "",
      order: "",
      subaddress: "",
      readdress: "",
      paymethods: ""
    };
  }
};
</script>