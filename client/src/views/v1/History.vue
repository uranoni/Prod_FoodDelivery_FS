<template>
  <v-container>
    <v-list two-line>
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
  </v-container>
</template>

<script>

export default {
  data () {
    return {
      e1: 0,
      showStore: false,
      orderDate: null,
      orderTime: null,
      store: [
        {
          name: '訂單 1',
          _id: 's1'
        },
        {
          name: '訂單 2',
          _id: 's2'
        },
        {
          name: '訂單 3',
          _id: 's3'
        },
        {
          name: '訂單 4',
          _id: 's4'
        },
        {
          name: '訂單 5',
          _id: 's5'
        }                    
      ]
    }
  },
  methods: {
  }
}
</script>