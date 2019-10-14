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
              <v-btn
                style="height: 200%; font-size: 18px; width: 100%"
                @click="OpenDialog('date')"
              >選擇日期</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                style="height: 200%; font-size: 18px; width: 100%"
                @click="OpenDialog('time')"
              >選擇時間</v-btn>
            </v-col>
          </v-row>

          <v-dialog v-model="dialog" width="292">
            <v-date-picker v-model="orderDate" v-if="dialogMode == 'date'"></v-date-picker>
            <v-time-picker v-model="orderTime" ampm-in-title v-if="dialogMode == 'time'"></v-time-picker>
          </v-dialog>

          <v-row style="margin-top: 40px">
            <v-layout row justify-center align-center>
              <v-card class="mx-auto">
                <v-card-text style="font-size: 18px; width: 400px; text-align: center;">
                  日期：
                  <span style="color: rgb(200, 0, 0)">{{orderDate}}</span>
                  <span style="color: rgb(200, 0, 0)" v-if="orderDate == null">0000-0-0</span>
                </v-card-text>
                <v-card-text style="font-size: 18px width: 400px; text-align: center;">
                  時間：
                  <span style="color: rgb(200, 0, 0)">{{orderTime}}</span>
                  <span style="color: rgb(200, 0, 0)" v-if="orderTime == null">00:00</span>
                </v-card-text>
              </v-card>
            </v-layout>
          </v-row>

          <v-row style="margin: 20px">
            <v-layout row justify-center align-center>
              <v-btn color="primary" @click="showStore = !showStore" width="120">確認</v-btn>
            </v-layout>
          </v-row>

          <v-divider></v-divider>

          <v-list two-line v-if="showStore">
            <v-list-item v-for="(item, index) in store" :key="index">
              <v-list-item-content @click="storemenu(item._id)">
                <v-list-item-title v-text="item.name"></v-list-item-title>聯絡電話
                <v-list-item-subtitle v-text="item.phone"></v-list-item-subtitle>
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
              <!-- <v-col cols="6">
                <v-text-field label="店家名稱" outlined></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="預估等待時間" outlined></v-text-field>
              </v-col>-->
              <!-- <v-col cols="6">
                <v-text-field label="品項" outlined></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="數量" type="number" outlined></v-text-field>
              </v-col>-->
              <v-col class="text-right">
                <v-btn text @click="e1 = 1">返回</v-btn>

                <!-- <v-btn color="primary" @click="showStore = !showStore">確認</v-btn> -->
              </v-col>
            </v-row>
          </div>

          <v-divider></v-divider>

          <v-row>
            <v-col cols="6" v-for="(item,idx) in product" :key="`item_${idx}`">
              <v-card @click="gonext(item._id)">
                <v-card-title>{{item.name}}</v-card-title>

                <v-img class="white--text align-end" height="100px" width="100px" :src="item.pic" />
                <v-list-item-subtitle>價錢 : {{item.price}}</v-list-item-subtitle>
                <v-list-item-subtitle>卡洛里 : {{item.cal}}</v-list-item-subtitle>
              </v-card>
            </v-col>
          </v-row>

          <!-- <div class="text-center">
            <v-btn color="success" @click="e1 = 3">填寫聯絡資訊</v-btn>
          </div>-->

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
          <fd-form
            :menu="menu"
            :orderDate="orderDate"
            :orderTime="orderTime"
            v-on:onSuccess="_onSuccess()"
          ></fd-form>

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
      storeID: "",
      showStore: false,
      orderDate: null,
      orderTime: null,
      dialog: false,
      dialogMode: null,
      store: [],
      product: [],
      menu: ""
    };
  },
  mounted() {
    axios
      .get("/store/storelist")
      .then(res => {
        this.store = res.data;
      })
      .catch(err => console.log(error));
  },
  methods: {
    _onSuccess() {
      this.$data.e1 = 4;
    },
    OpenDialog(mode) {
      this.dialog = true;
      this.dialogMode = mode;
    },
    storemenu(id) {
      this.e1 = 2;
      this.storeID = id;
      console.log(id);
      axios
        .get(`/product/getall/${this.storeID}`)
        .then(res => {
          this.product = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    gonext(id) {
      this.e1 = 3;
      this.menu = id;
      console.log("menu", this.menu);
    }
  }
};
</script>
