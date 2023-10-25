export function debounce(mainFunction, delay = 500) {
  let timer

  return function () {
    clearTimeout(timer)

    timer = setTimeout(() => {
      mainFunction()
    }, delay)
  }
}
