// src/utils/mxFactory.js
// ① 先导入需要的源码文件（路径来自 node_modules/mxgraph/javascript/src/）
import 'mxgraph/javascript/src/js/mxClient.js';

// ② 再执行 factory
import mxgraph from 'mxgraph';
export function mxgraphFactory() {
  return mxgraph({ mxBasePath: '/mx' });
}
