<template>
  <v-container>
    <v-list two-line>
      <v-list-item v-for="(item, index) in list" :key="index" @click="e1 = 2">
        <v-list-item-content>
          <v-list-item-title v-text="item.product.name"></v-list-item-title>
          <v-list-item-subtitle v-text="item.product.price"></v-list-item-subtitle>
          <v-list-item-subtitle v-text="item.arriveTime"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      e1: 0,
      showStore: false,
      orderDate: null,
      orderTime: null,
      list: []
    };
  },
  mounted() {
    axios
      .get("/order/find", {
        headers: {
          access_token: localStorage.getItem("token")
        }
      })
      .then(res => {
        console.log(res.data);
        this.list = res.data;
      });
  },
  methods: {}
};
</script>