<template>
  <v-container>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">尋找店家</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">選擇餐點</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 3" step="3">聯絡資訊</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="4">結帳確認</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-row>
            <v-col cols="6">
              <v-text-field label="日期" type="date" outlined v-model="orderDate"></v-text-field>
            </v-col>
            <v-col cols="6">
              <select name id>
                <option value>上午</option>
                <option value>下午</option>
              </select>
            </v-col>
            <v-col class="text-right">
              <v-btn color="primary" @click="showStore = !showStore">確認</v-btn>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <v-list two-line v-if="showStore">
            <v-list-item v-for="(item, index) in store" :key="index" @click="e1 = 2">
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
                <v-list-item-subtitle v-text="item._id"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <!-- <v-btn
              color="primary"
              @click="e1 = 2"
            >
              Continue
            </v-btn>

          <v-btn text>Cancel</v-btn>-->
        </v-stepper-content>

        <v-stepper-content step="2">
          <div>
            <v-row>
              <v-col cols="6">
                <v-text-field label="店家名稱" outlined></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="預估等待時間" outlined></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="品項" outlined></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="數量" type="number" outlined></v-text-field>
              </v-col>
              <v-col class="text-right">
                <v-btn text @click="e1 = 1">返回</v-btn>

                <v-btn color="primary" @click="showStore = !showStore">確認</v-btn>
              </v-col>
            </v-row>
          </div>

          <v-divider></v-divider>

          <v-row>
            <v-col cols="6" v-for="i in 12" :key="`item_${i}`">
              <v-card color="grey lighten-1" height="150"></v-card>
            </v-col>
          </v-row>

          <div class="text-center">
            <v-btn color="success" @click="e1 = 3">填寫聯絡資訊</v-btn>
          </div>

          <!-- <v-btn text @click="e1 = 1">返回</v-btn> -->
          <v-btn
            fixed
            dark
            fab
            right
            color="pink"
            style="bottom:70px;"
            @click="$vuetify.goTo(0, 0)"
          >
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <fd-form v-on:onSuccess="_onSuccess()"></fd-form>

          <v-btn text @click="e1 = 2">返回</v-btn>
        </v-stepper-content>
        <v-stepper-content step="4">
          <v-card>
            <v-card-text class="text-center">
              <v-icon x-large color="success">mdi-checkbox-marked-circle</v-icon>
              <br />
              <h1 class="success--text">訂單已完成</h1>
            </v-card-text>
          </v-card>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import FoodForm from "../Submit.vue";
export default {
  components: {
    "fd-form": FoodForm
  },
  data() {
    return {
      e1: 0,
      showStore: false,
      orderDate: null,
      orderTime: null,
      store: [
        {
          name: "Store 1",
          _id: "s1"
        },
        {
          name: "Store 2",
          _id: "s2"
        },
        {
          name: "Store 3",
          _id: "s3"
        },
        {
          name: "Store 4",
          _id: "s4"
        },
        {
          name: "Store 5",
          _id: "s5"
        }
      ]
    };
  },
  methods: {
    _onSuccess() {
      this.$data.e1 = 4;
    }
  }
};
</script>
