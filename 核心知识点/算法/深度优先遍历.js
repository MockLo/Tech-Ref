// stack

const DFS = function (node) {
  const list = [];
  if (!node) return list;

  const stack = [node];

  while (stack.length > 0) {
    const p = stack.pop();
    list.push(p);

    (p.children || []).reverse().forEach(child => {
      stack.push(child);
    });
  }

  return list;
};

// list: [1,2,5,6,11,12,3,7,4,8,9,10,13]
// stack: []
