export function debounce(fn, delay = 300) {
  let timerId = null;

  return function (...args) {
    // cancel previous execution
    if (timerId) {
      clearTimeout(timerId);
    }

    // schedule new execution
    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
