import * as _ from 'lodash-es';

export function throttle(wait = 0, options = {}) {
  return function(target: any, name: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value;
    descriptor.value = _.throttle(fn, wait, options);
    return descriptor;
  };
}

// export function debounce(wait = 0, options = {}) {
//   return function(target, name, descriptor) {
//     const fn = descriptor.value;
//     descriptor.value = _.debounce(fn, wait, options);
//     return descriptor;
//   };
// }
