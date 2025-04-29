<template>
  <div style="display:flex;flex-direction:column;height:100%;">
    <header style="padding:8px;background:#fafafa;border-bottom:1px solid #ddd;">
      Vue2 + mxClient + SVG 编辑器
    </header>
    <div style="flex:1;">
      <graph-editor />
    </div>
  </div>
</template>

<script>
import GraphEditor from './components/GraphEditor.vue';
export default {
  name: 'App',
  components: { GraphEditor }
};
</script>

<style scoped>
</style>
