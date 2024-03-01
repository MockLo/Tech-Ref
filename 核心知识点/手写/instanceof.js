function myInstanceOf(obj, constructor) {
  let proto = Object.getPrototypeOf(obj);
  while (proto) {
    if (proto === constructor.prototype) {
      return true;
    } else {
      proto = Object.getPrototypeOf(proto);
    }
  }

  return false;
}
