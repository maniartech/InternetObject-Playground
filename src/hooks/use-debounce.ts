import { useCallback, useRef } from 'react';

/**
 * A hook that returns a debounced version of the callback. The debounced
 * version of the callback is guaranteed to have the same function reference
 * between renders unless the delay changes. This is useful for avoiding
 * unnecessary re-renders when passing callbacks to child components that rely
 * on reference equality to prevent unnecessary re-renders.
 *
 * @template T This is a generic type that extends a function with any
 * number of arguments.
 * @param {T} callback The function that you want to debounce.
 * @param {number} delay The number of milliseconds to delay the function call.
 * @returns A debounced version of the callback function.
 */
function useDebounce<T extends (...args: any[]) => void>(callback: T, delay: number): (...args: Parameters<T>) => void {

  if (delay === undefined || delay < 0) {
    throw new Error('Invalid delay value. The delay must be a positive integer.');
  }

  // The timeoutRef is used to store the timeout id between renders.
  // It's initialized with null.
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // The useCallback hook returns a memoized version of the callback that
  // only changes if one of the dependencies has changed.
  const debouncedCallback = useCallback((...args: Parameters<T>) => {
    // If there's an existing timeout from a previous call, clear it to
    // prevent the function from being called.
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout that calls the callback function after the
    // specified delay.
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);

  // Return the memoized debounced function.
  return debouncedCallback;
}

export default useDebounce;
