/**
 * 
 * @param {Function} fn Function to copy
 * @param  {...any} args Copy function arguments
 */
export const partialize = (fn, ...args) => fn.bind(null, ...args);

/**
 * 
 * @param  {...Function} fns 
 * @description Perform left to right functions
 */
export const pipe = (...fns) => value =>
fns.reduce((acc, fn) =>
fn(acc), value);

/**
 * 
 * @param  {...Function} fns 
 * @description Perform right to left functions
 */
export const compose = (...fns) => value =>
    fns.reduceRight((acc, fn) =>
        fn(acc), value);