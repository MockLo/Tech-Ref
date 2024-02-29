function isBalanceTree(root) {
  

  // 获取节点深度
  const getNodeDeep = n => {
    if (!n) return 0;
    return Math.max(getNodeDeep(n.left), getNodeDeep(n.right)) + 1;
  };

  const check = node => {
    if (!node) return true;

    // 获取左边节点的深度
    const leftDeep = getNodeDeep(node.left);

    // 获取右边节点的深度
    const rightDeep = getNodeDeep(node.right);

    // 如果两边节点深度相差超过 1，返回 false
    if (Math.abs(leftDeep - rightDeep) > 1) {
      return false;
    }

    // 继续判断
    return check(node.left) && check(node.right);
  };

  return check(root);
}
