const N = 10
const L = 3
const A = [-8, 0, 4, -5, 8, 9, 5, 5, -6, -8, 6, 1, -2, -6, 0, 0, -2, 3, 8, -8, -3, 3, 4, 10, -4, -10, 9, 1, -1, -5, -9, 8, -1, -8, 8, 9, 7, 0, -1, -4, 3, 6, -10, -10]
const f = [-8, 12, -2, -32, -6, 33, -16, 9, 1, -30]

printMatrix(A, f, '#matrix')

mainCalc()

printMatrix(A, f, '#matrix__ready')


function mainCalc() {
  let strIterator = 0

  for (let i = 0; i < A.length; i += step(strIterator - 1)) {

    let width
    if (strIterator < N - (L - 1)) {
      width = L
    } else {
      width = N - strIterator
    }

    let k = A[i]
    for (let j = i; j < i + width; j++) {
      A[j] /= k
    }
    f[strIterator] /= k

    let h = i + step(strIterator)
    let end = L - 1
    if (N - strIterator <= L) {
      end = N - strIterator - 1
    }
    for (let j = 0; j < end; j++) {
      let coef = A[h - j - 1]
      let iter = 0
      for (let l = h - j - 1; l < (h - j - 1) + width; l++) {
        A[l] += A[i + iter] * -coef
        iter++
      }
      f[strIterator + j + 1] += f[strIterator] * -coef
      h += step(strIterator + j + 1)
    }
    strIterator++
  }


  strIterator = N - 1

  for (let i = A.length - 1; i >= 0; i -= step(strIterator)) {
    let width
    if (strIterator < N - (L - 1)) {
      width = L
    } else {
      width = N - strIterator
    }

    let h = i - step(strIterator - 1)
    let end = L - 1
    if (strIterator < L) {
      end = strIterator //чекнуть на последниъ этапах
    }
    for (let j = 0; j < end; j++) {
      let coef = A[h + j + 1]
      let iter = 0
      for (let l = h + j + 1; l < (h + j + 1) + width; l++) {
        console.log(l, i, j)
        A[l] += A[i + iter] * -coef
        iter++
      }
      f[strIterator - j - 1] += f[strIterator] * -coef
      h -= step(strIterator - j - 2)
    }
    strIterator--
  }
}

function step(str) {
  if (str < L - 1) {
    return str + L + 1
  } else if (str >= L - 1 && str < N - L + 1) {
    return L * 2 - 1
  } else {
    return N - str - 1 + L
  }
}

function printMatrix(Arr, f, DomId) {
  let A = [...Arr]
  A_square = new Array(N)
  for (let i = 0; i < N; i++) {
    A_square[i] = new Array(N)
  }

  for (let j = 0; j < L - 1; j++) {
    for (let k = 0; k < j + L; k++) {
      A_square[j][k] = A.shift()
      // A_square[j][k] = A[k + j + (j * L - Math.sign(j))]
    }
    for (let k = j + L; k < N; k++) {
      A_square[j][k] = 0
    }
  }

  for (let j = L - 1; j < N - L + 1; j++) {
    for (let k = 0; k < j - L + 1; k++) {
      A_square[j][k] = 0
    }
    for (let k = j - L + 1; k < j - L - 1 + 2 * L + 1; k++) {
      A_square[j][k] = A.shift()
      // A_square[j][k] = A[k + j + (j * L - Math.sign(j))]
    }
    for (let k = j + L; k < N; k++) {
      A_square[j][k] = 0
    }
  }

  for (let j = N - L + 1; j < N; j++) {
    for (let k = 0; k < j - L + 1; k++) {
      A_square[j][k] = 0
    }
    for (let k = j - L + 1; k < N; k++) {
      A_square[j][k] = A.shift()
      // A_square[j][k] = A[k + j + (j * L - Math.sign(j))]
    }
  }

  let tableReady = document.querySelector(DomId)
  for (let i = 0; i < N; i++) {
    let tr = document.createElement('tr')
    let line = ''
    for (let j = 0; j < N; j++) {
      line = line + '<td>' + A_square[i][j] + '</td> '
    }
    line = line + '<td>' + f[i] + '</td> '
    tr.innerHTML = line
    tableReady.append(tr)
  }
}
