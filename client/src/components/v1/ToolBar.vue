<template>
  <v-app-bar app>
    <v-toolbar-title class="headline text-uppercase">
      <span>
        {{ title }}
      </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- <v-btn to="submit" target="_blank">
      <span class="mr-2">新增訂單</span>
    </v-btn> -->
  </v-app-bar>
</template>

<script>
export default {
  name: 'ToolBar',
  props: {
    title: {
      type: String
    }
  }
}
</script>