<template>
  <div style="height:80vh">
    <iframe width="100%" height="100%" :src="basePath+'/form-generator/#/'" frameborder="0" />
  </div>
</template>

<script>
var path = process.env.VUE_APP_BASE_PATH + ":" + process.env.VUE_APP_SERVER_PORT
console.log(path);
export default {
  name: 'FormGenerator',
  data() {
    return {
      basePath: path
    }
  }
}
</script>
