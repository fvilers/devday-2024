type EffectCallback = () => void;
type DerivedCallback<T> = () => T;

export function signal<T>(initialValue: T) {
  let current = initialValue;
  const subscribers = new Set<EffectCallback>();

  return {
    get value(): T {
      if (listener !== null) {
        subscribers.add(listener);
      }

      return current;
    },
    set value(value: T) {
      current = value;

      for (const fn of subscribers) {
        fn();
      }
    },
  };
}

let listener: EffectCallback | null = null;

export function effect(fn: EffectCallback) {
  listener = fn;
  fn();
  listener = null;
}

export function derived<T>(fn: DerivedCallback<T>) {
  const derived = signal<T>(fn());

  effect(() => {
    derived.value = fn();
  });

  return derived;
}
