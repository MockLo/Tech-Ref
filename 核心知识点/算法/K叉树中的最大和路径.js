function findPath(tree) {
  let max = 0;
  let head = null;
  const queue = [{ node: tree, sum: tree.val, path: [node] }];
  while (queue.length > 0) {
    const obj = queue.shift();
    const { node, sum, path } = obj;

    if (sum > max) {
      max = sum;
      head = obj;
    }

    if (node.children && node.children.length > 0) {
      queue.push(
        ...node.children.map(x => ({
          node: x,
          sum: sum + x.val,
          path: [...path, x],
        }))
      );
    }
  }

  return head.path
}

//  queue:  [   ]
// obj:  {node:9, sum:12, path:[1,2,9]}
//  max: 12
// head: {node:9, sum:12, path:[1,2,9]}
