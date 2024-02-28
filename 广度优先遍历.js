const BFS = function (node) {
  const list = [];
  if (!node) return list;

  const queue = [node];

  while (queue.length > 0) {
    const p = queue.shift();
    list.push(p);

    (p.children || []).forEach(child => {
      queue.push(child);
    });
  }

  return list;
};

// queue: [null,null]
// list: [1,2,2,null,3,null,3]
