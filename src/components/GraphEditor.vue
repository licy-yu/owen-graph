<template>
  <div id="graph-container" ref="graphContainer" style="width: 100%; height: 100%; border: 1px solid black;"></div>
</template>

<script>
import mxFactory from '../utils/mxFactory';

export default {
  name: 'GraphEditor',
  mounted() {
    this.initGraph();
  },
  methods: {
    async initGraph() {
      const container = this.$refs.graphContainer;
      const mxGraph = mxFactory.mxGraph;
      const mxUtils = mxFactory.mxUtils;
      const mxConstants = mxFactory.mxConstants;
      const mxEvent = mxFactory.mxEvent;

      // 创建图形实例
      const graph = new mxGraph(container);
      graph.setPanning(true);
      graph.setTooltips(true);
      graph.setEnabled(true);

      // 加载 SVG 文件
      const svgUrl = require('@/assert/svg/image.svg');
      const response = await fetch(svgUrl);
      const svgText = await response.text();

      // 创建外部 SVG 节点
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
      const svgElement = svgDoc.documentElement;

      // 将 SVG 添加到 mxGraph 中
      const parent = graph.getDefaultParent();
      graph.getModel().beginUpdate();
      try {
        const width = parseFloat(svgElement.getAttribute('width')) || 100;
        const height = parseFloat(svgElement.getAttribute('height')) || 100;

        const vertex = graph.insertVertex(parent, null, '', 20, 20, width, height);
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.width = `${width}px`;
        overlay.style.height = `${height}px`;
        overlay.appendChild(svgElement);

        graph.container.appendChild(overlay);
      } finally {
        graph.getModel().endUpdate();
      }
    },
  },
};
</script>

<style scoped>
#graph-container {
  position: relative;
}
</style>
