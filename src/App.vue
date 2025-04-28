<template>
  <div class="h-100 d-flex flex-column">
    <header class="toolbar">Vue2 + mxGraph 电气图编辑器</header>
    <GraphEditor style="flex:1;"/>
  </div>
</template>

<script>
import GraphEditor from './components/GraphEditor.vue';
export default {
  components: { GraphEditor }
};
</script>
