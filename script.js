const N = 10
const L = 3
const A = [-8, 0, 4, -5, 8, 9, 5, 5, -6, -8, 6, 1, -2, -6, 0, 0, -2, 3, 8, -8, -3, 3, 4, 10, -4, -10, 9, 1, -1, -5, -9, 8, -1, -8, 8, 9, 7, 0, -1, -4, 3, 6, -10, -10]
const f = [-8, 12, -2, -32, -6, 33, -16, 9, 1, -30]

// const N = 10
// const L = 4
// const A = [9, 8, 0, -7, -3, -1, 9, 9, 10, -4, -5, 1, 5, -5, -2, -3, 5, 8, 10, -9, 6, -6, -9, 5, -8, -6, -4, -5, -1, 6, -10, -1, 8, 0, 9, -3, 2, 4, -4, 5, -7, -4, 9, 3, -10, 2, -10, -4, 3, 1, 6, -10, -5, 8, 4, 4, -8, 5]
// const f = [-8, 12, -2, -32, -6, 33, -16, 9, 1, -30]

printMatrix(A, f, '#matrix')

mainCalc()

printMatrix(A, f, '#matrix__ready')


function mainCalc() {
  let strIterator = 0;

  for (let i = 0; i < 4; i += step(i)) {

    let width
    if (strIterator <= N - (L - 1)) {
      width = L
    } else {
      width = N - strIterator
    }

    let k = A[i]
    for (let j = i; j < i + width; j++) {
      A[j] /= k
    }
    f[strIterator] /= k

    let h = i + step(strIterator) - 1
    for (let j = 0; j < L - 1 ; j++) {
      let coef = A[h]
      let iter = 0
      for (let l = h; l < h + width; l++) {
        A[l] += A[i + iter] * -coef
        iter++
      }
      f[strIterator + j + 1] += f[strIterator] * -coef
      if (i > 0) {
        h += step(strIterator + j) - j
      } else {
        h += step(strIterator + j)
      }
    }

    strIterator++

  }


  for (let i = 4; i < 6; i += step(i)) {

    let width
    if (strIterator <= N - (L - 1)) {
      width = L
    } else {
      width = N - strIterator
    }

    let k = A[i]
    for (let j = i; j < i + width; j++) {
      A[j] /= k
    }
    f[strIterator] /= k

    let h = i + step(strIterator) - 1
    for (let j = 0; j < L - 1 ; j++) {
      let coef = A[h]
      let iter = 0
      for (let l = h; l < h + width; l++) {
        A[l] += A[i + iter] * -coef
        iter++
      }
      f[strIterator + j + 1] += f[strIterator] * -coef
      if (i > 0) {
        h += step(strIterator + j) - j -1
      } else {
        h += step(strIterator + j) - j - 2
      }
    }

    strIterator++

  }
}

function step(str) {
  if (str <= Math.floor(L / 2)) {
    return str + L + 1
  } else if (str <= N - Math.floor(L / 2)) {
    return L * 2 - 1
  } else {
    return L * 2 - 2
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
