<template>
  <div ref="container" style="width:100%;height:100%;"></div>
</template>

<script>
import { mxgraphFactory } from '@/utils/mxFactory';

export default {
  name: 'GraphEditor',
  mounted() {
    this.initGraph();
  },
  methods: {
    async initGraph() {
      const mx = await mxgraphFactory();

      // 加载 stencil
      fetch('/stencils/electrical.xml')
        .then(r => r.text())
        .then(xml => {
          mx.mxStencilRegistry.parseStencilSet(xml);
        });

      const graph = new mx.mxGraph(this.$refs.container);
      graph.setConnectable(true);
      graph.setCellsResizable(false);
      const parent = graph.getDefaultParent();

      graph.getModel().beginUpdate();
      try {
        graph.insertVertex(parent, null, '电阻', 40, 40, 60, 20, 'shape=resistor');
        graph.insertVertex(parent, null, '设备', 160, 40, 80, 40, 'shape=rectangle');
      } finally {
        graph.getModel().endUpdate();
      }
      this.graph = graph;
    }
  }
};
</script>
