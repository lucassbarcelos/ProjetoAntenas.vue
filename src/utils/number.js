export const isNumber = () => {
  return v => !v || /^[0-9.,]+$/.test(v) || 'Somente valores numéricos'
}

export const isInteger = () => {
  return v => !v || /^[0-9]+$/.test(v) || 'Somente valores inteiros'
}
