<template>
  <el-submenu
    ref="subMenu"
    class="subMenu"
    :popper-append-to-body="false"
    :index="routerInfo.name"
  >
    <template slot="title">
      <i :class="'el-icon-' + routerInfo.meta.icon" />
      <span slot="title">{{ routerInfo.meta.title }}</span>
    </template>
    <slot />
  </el-submenu>
</template>

<script>
export default {
  name: "AsyncSubmenu",
  props: {
    routerInfo: {
      default: function () {
        return null;
      },
      type: Object,
    },
  },
};
</script>
<style lang="css">
/* .el-submenu{
  background-color: #2e71fe !important;
} */
</style>
