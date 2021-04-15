if (module.hot) module.hot.accept()

export const sum = (a: number, b: number): number => {
  return a + b
}

console.log('test sum:', sum(10, 15))
