// const N = 10
// const L = 3
const N = 10
const L = 4

let size = N * (2 * L - 1)  // ( (L-1)+(L-2)+...+(L-3) )* 2 - 1

for (let i = 1; i < L; i++) {
  size -= (L - i) * 2
}
// size -= 1
console.log(size)

// let A = [ -8, 0, 4, -5, 8, 9, 5, 5, -6, -8, 6, 1, -2, -6, 0, 0, -2, 3, 8, -8, -3, 3, 4, 10, -4, -10, 9, 1, -1, -5, -9, 8, -1, -8, 8, 9, 0, -1, -4 ]
// let A = [ -8, 0, 4, -5, 8, 9, 5, 5, -6, -8, 6, 1, -2, -6, 0, 0, -2, 3, 8, -8, -3, 3, 4, 10, -4, -10, 9, 1, -1, -5, -9, 8, -1, -8, 8, 9, 7, 0, -1, -4, 3, 6, -10, -10 ]
let A = []
for (let i = 0; i < size; i++) {
  A.push(randomInteger(-10,10))
}

console.log(A)


function randomInteger(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}


let f = [7, 9, 5, 4, 3, 1, 2, 0, 8, -3]

printMatrix(A, f, '#matrix')




function getValue(i, j) {
  if (L == 1) {
    return A[i]
  }
  if (L == 2) {
    return A[i + j +i]
  }
  // if (L == 3) {
  //   if (i >= 9) {
  //     return A[j + i + (i * L - (i - 7))]
  //   } else {
  //     return A[j + i + (i * L - Math.sign(i))]
  //   }
  // }
  // if (L > 4) {
  //   return A[j + i + (i * L - Math.sign(i))]
  // }
  if (L == 3) {
    if (i == N - 1) {
      return A[j + i + (i * L - 2)]
    } else {
      return A[j + i + (i * L - Math.sign(i))]
    }
  }
  if (L >= 4) { // 10 10
    // if (i >= N - L) {
    //   console.log(1);
    //   return A[j + i + (i * L - 2)]
    // }
    // if (i >= L - 1) {
    //   return A[j + i + (i * L + (L - i))]
    // }
    if (i >= L - 1 && i <= N - L + 1) {
      return A[j + i + (i * L) + (i - L + 1)]
    }
    if (i > N - L + 1) {
      let k = i - (N - L + 2) * 2
      console.log(k);
      console.log('summ ' + (j + i + (i * L) + i - L))
      return A[j + i + (i * L) + i - L]
    }
    return A[j + i + (i * L - Math.sign(i))]
  }
}

window.getValue = getValue

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
