const { stringify, parse } = JSON

export const setStorage = (key, value) => {
  if (!window) return
  window.localStorage.setItem(key, stringify(value))
}

export const getStorage = key => {
  if (!window) return
  const value = window.localStorage.getItem(key)
  console.log(parse(value))
  return parse(value)
}
