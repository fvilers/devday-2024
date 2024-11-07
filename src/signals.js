export function signal(initialValue) {
  let current = initialValue;
  const subscribers = new Set();

  return {
    get value() {
      if (listener !== null) {
        subscribers.add(listener);
      }

      return current;
    },
    set value(value) {
      current = value;

      for (const fn of subscribers) {
        fn();
      }
    },
  };
}

let listener = null;

export function effect(fn) {
  listener = fn;
  fn();
  listener = null;
}

export function derived(fn) {
  const derived = signal();

  effect(() => {
    derived.value = fn();
  });

  return derived;
}
