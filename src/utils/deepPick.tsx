import get from 'lodash/get';
import set from 'lodash/set';

/**
 * @example
 * const obj = {
 *   one: {
 *     two: true,
 *     three: {
 *       four: 'deep value',
 *     },
 *   },
 *   other: 'ignore me',
 * };
 *
 * const picked = deepPick(obj, { 'one.two': true, 'one.three.four': true });
 */
export default function deepPick(obj: object, keys: Record<string, boolean>) {
  const result = {};

  Object.keys(keys).forEach((key) => {
    const value = get(obj, key);
    if (value !== undefined) {
      set(result, key, value);
    }
  });

  return result;
}
