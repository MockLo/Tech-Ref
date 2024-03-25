var maxAreaOfIsland = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  const visitedMap = {};
  const getVisitedKey = (i, j) => `${i}-${j}`;
  const isVisited = (i, j) => {
    return !!visitedMap[getVisitedKey(i, j)];
  };
  const setVisited = (i, j) => {
    visitedMap[getVisitedKey(i, j)] = true;
  };

  const isValidDir = (i, j) => {
    return i >= 0 && i < m && j >= 0 && j < n;
  };

  const findSiblings = (i, j) => {
    const list = [];

    // 四个方向的坐标
    const directions = [
      [i - 1, j],
      [i + 1, j],
      [i, j - 1],
      [i, j + 1],
    ];
    directions.forEach(dir => {
      const [x, y] = dir;
      // 数组防止越界
      if (isValidDir(x, y)) {
        // 没访问过，且 值是 1 的
        if (!isVisited(x, y) && grid[x][y] === 1) {
          list.push(dir);
        }
      }
    });
    return list;
  };

  let max = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 为 0 跳过
      if (grid[i][j] === 0) continue;
      // 已经访问过，跳过
      if (isVisited(i, j)) continue;

      // BFS 遍历
      let count = 0;
      const queue = [[i, j]];
      while (queue.length > 0) {
        const node = queue.shift();
        // 标记访问过
        setVisited(...node);
        // 计数增加
        count++;

        // 遍历兄弟节点
        const list = findSiblings(...node);
        queue.push(...list);
      }

      max = Math.max(max, count);
    }
  }

  return max;
};
