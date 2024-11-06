type Callback<T> = (value: T) => void;

function observable<T>(initialValue: T) {
  let current = initialValue;
  const subscribers = new Set<Callback<T>>();

  return {
    subscribe(fn: Callback<T>) {
      subscribers.add(fn);

      return () => subscribers.delete(fn);
    },
    update(value: T | ((previous: T) => T)) {
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

const observer = observable(0);
const unsubscribe = observer.subscribe((value) => console.log(value));

observer.update(10);
observer.update(20);

unsubscribe();
