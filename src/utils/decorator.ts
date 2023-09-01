import _throttle from 'lodash.throttle';

export function throttle(wait = 0, options = {}) {
  return function(target: any, name: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value;
    descriptor.value = _throttle(fn, wait, options);
    return descriptor;
  };
}

// export function debounce(wait = 0, options = {}) {
//   return function(target, name, descriptor) {
//     const fn = descriptor.value;
//     descriptor.value = _debounce(fn, wait, options);
//     return descriptor;
//   };
// }
