// 类似的都有递归的套路
function BFSTree(root) {
  const res = [];

  const fn = (node, deep) => {
    if (!node) return;
    if (!res[deep]) {
      res[deep] = [];
    }
    fn(node.left, deep + 1);
    fn(node.right, deep + 1);
    res[deep].push(node.val);
  };

  fn(root, 0);

  return res;
}
