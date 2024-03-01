function reverse(node) {
  let cur = node;
  let prev = null;

  while (cur) {
    let next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }

  return prev;
}
