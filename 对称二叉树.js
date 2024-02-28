// 递归
// const isSymmetric = function (root) {
//   if (!root) return false;

//   const judge = function (p1, p2) {
//     if ((!p1 && p2) || (p1 && !p2)) {
//       return false;
//     }

//     if (p1 && p2) {
//       if (p1.val !== p2.val) {
//         return false;
//       }
//       return judge(p1.left, p2.right) && judge(p1.right, p2.left);
//     }

//     return true;
//   };

//   return judge(root.left, root.right);
// };

const isSymmetric = function (root) {
  if (!root) return false;

  const queue = [[root.left, root.right]];
  while (queue.length) {
    const [p1, p2] = queue.shift();

    if ((!p1 && p2) || (p1 && !p2)) {
      return false;
    }

    if (p1 && p2) {
      if (p1.val !== p2.val) {
        return false;
      } else {
        queue.push([p1.left, p2.right]);
        queue.push([p1.right, p2.left]);
      }
    }
  }

  return true;
};
