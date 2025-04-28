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

        // 添加元件
        const switch1 = graph.insertVertex(parent, null, '开关01', 40, 40, 60, 20, 'shape=rectangle;fillColor=red');
        const switch2 = graph.insertVertex(parent, null, '开关02', 160, 40, 60, 20, 'shape=rectangle;fillColor=red');
        const line1 = graph.insertEdge(parent, null, '', switch1, switch2, 'strokeColor=red;strokeWidth=2');

        const switch3 = graph.insertVertex(parent, null, '开关03', 100, 100, 60, 20, 'shape=rectangle;fillColor=green');
        const line2 = graph.insertEdge(parent, null, '', switch2, switch3, 'strokeColor=red;strokeWidth=2');

        // 添加更多元件和连线
        const switch4 = graph.insertVertex(parent, null, '开关04', 220, 100, 60, 20, 'shape=rectangle;fillColor=red');
        graph.insertEdge(parent, null, '', switch3, switch4, 'strokeColor=red;strokeWidth=2');
      } finally {
        graph.getModel().endUpdate();
      }

      // 居中显示图形
      const bounds = graph.getGraphBounds();
      const container = this.$refs.container;
      const dx = (container.clientWidth - bounds.width) / 2 - bounds.x;
      const dy = (container.clientHeight - bounds.height) / 2 - bounds.y;
      graph.view.setTranslate(dx, dy);

      this.graph = graph;
    },
    async flashCell(cell) {
      const state = this.graph.view.getState(cell);
      if (state) {
        const initialColor = state.style[mxConstants.STYLE_FILLCOLOR];
        let isHighlighted = false;
        const interval = setInterval(() => {
          isHighlighted = !isHighlighted;
          this.graph.setCellStyles(
            mxConstants.STYLE_FILLCOLOR,
            isHighlighted ? 'yellow' : initialColor,
            [cell]
          );
        }, 500);

        setTimeout(() => {
          clearInterval(interval);
          this.graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, initialColor, [cell]);
        }, 5000);
      }
    }
  }
};
</script>
