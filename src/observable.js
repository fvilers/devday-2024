export function observable(initialValue) {
  let current = initialValue;
  const subscribers = new Set();

  return {
    subscribe(fn) {
      subscribers.add(fn);

      return () => subscribers.delete(fn);
    },
    update(value) {
      current = isFunction(value) ? value(current) : value;

      for (const fn of subscribers) {
        fn(current);
      }
    },
  };
}

function isFunction(value) {
  return typeof value === "function";
}
