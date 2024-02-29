const isDDD = function (root) {
  if (!root) return true;

  const getDeep = node => {
    if (!node) return 0;
    return Math.max(getDeep(node.left), getDeep(node.right)) + 1;
  };

  const check = (left, right) => {
    // 获取左边的深度
    const leftDeep = getDeep(left);
    // 获取右边的深度
    const rightDeep = getDeep(right);

    // 判断深度相差是否超过 1
    if (Math.abs(leftDeep - rightDeep) > 1) {
      return false;
    }

    // 继续检查
    let isLeftBalance = true;
    let isRightBalance = true;
    if (left) {
      isLeftBalance = check(left.left, left.right);
    }
    if (right) {
      isRightBalance = check(right.left, right.right);
    }
    return isLeftBalance && isRightBalance;
  };

  return check(root.left, root.right);
};
