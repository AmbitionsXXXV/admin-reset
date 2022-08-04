/**
 * @param {*} path
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
