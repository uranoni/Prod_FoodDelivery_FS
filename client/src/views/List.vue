<template>
  <v-simple-table>
    <thead>
      <tr>
        <th class="text-left">姓名</th>
        <th class="text-left">地址</th>
        <th class="text-left">詳細資料</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in list" :key="item.name">
        <td>{{ item.receiver }}</td>
        <td>{{ item.readdress }}</td>
        <td>
          <v-btn class="primary" @click="goDetail(item._id)">詳細資料</v-btn>
        </td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
export default {
  mounted() {
    axios
      .get("order/showAll")
      .then(res => {
        this.list = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    goDetail(id) {
      this.$router.push(`/detail/${id}`);
    }
  }
};
</script>