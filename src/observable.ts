type SubscribeCallback<T> = (value: T) => void;
type ValueUpdater<T> = (value?: T) => T;

export function observable<T>(initialValue?: T) {
  let current = initialValue;
  const subscribers = new Set<SubscribeCallback<T>>();

  return {
    subscribe(fn: SubscribeCallback<T>) {
      subscribers.add(fn);

      return () => subscribers.delete(fn);
    },
    update(value: T | ValueUpdater<T>) {
      current = isFunction(value) ? value(current) : value;

      for (const fn of subscribers) {
        fn(current);
      }
    },
  };
}

function isFunction(value: unknown): value is Function {
  return typeof value === "function";
}
