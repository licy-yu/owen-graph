<template>
  <div ref="graphContainer" style="width:100%;height:100%;position:relative;border:1px solid #ccc;"></div>
</template>

<script>
// 导入 SVG 原始字符串
import rawSvg from '@/assets/svg/electrical.svg';

export default {
  name: 'GraphEditor',
  async mounted() {
    // 1. 检查 mxGraph 是否加载
    if (typeof mxGraph === 'undefined') {
      console.error('mxGraph 未加载，请检查 mxClient.min.js');
      return;
    }

    // 2. SVG → DataURL
    const blob = new Blob([rawSvg], { type: 'image/svg+xml' });
    const dataUrl = await new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.readAsDataURL(blob);
    });

    // 3. 初始化 mxGraph
    const container = this.$refs.graphContainer;
    const graph = new mxGraph(container);
    graph.setPanning(true);
    graph.setTooltips(true);
    graph.setEnabled(true);

    // 4. 插入 SVG 顶点
    const parent = graph.getDefaultParent();
    graph.getModel().beginUpdate();
    try {
      // 解析 viewBox 尺寸
      const vbMatch = /viewBox=\"([^\"]+)\"/.exec(rawSvg);
      const dims = vbMatch ? vbMatch[1].split(/\s+/).map(Number) : [0,0,100,100];
      const width = dims[2], height = dims[3];

      graph.insertVertex(
        parent,
        null,
        '',         // 顶点不显示文本
        20, 20,     // x, y
        width,
        height,
        `shape=image;image=${dataUrl};`
      );
    } finally {
      graph.getModel().endUpdate();
    }

    this.graph = graph;
  }
};
</script>

<style scoped>
</style>
