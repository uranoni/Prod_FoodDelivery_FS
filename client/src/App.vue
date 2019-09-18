<template>
  <v-app>
    <ToolBar title="愛心送餐系統"></ToolBar>

    <v-content>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </v-content>
    <BottomNav />
  </v-app>
</template>

<script>
import ToolBar from './components/v1/ToolBar.vue';
import BottomNav from './components/v1/BottomNav.vue';
// import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    ToolBar, BottomNav
    // HelloWorld
  },
  data: () => ({
    //
  })
};
</script>
