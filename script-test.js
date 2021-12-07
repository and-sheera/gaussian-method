const N = 10
const L = 4

let size = N * (2 * L - 1)  // ( (L-1)+(L-2)+...+(L-3) )* 2 - 1

for (let i = 1; i < L; i++) {
  size -= (L - i) * 2
}
// size -= 1
console.log(size)

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

mainCalc()

printMatrix(A, f, '#matrix__ready')


function mainCalc() {
  let strIterator = 0;

  for (let i = 0; i < 6; i += step(i)) {

    let width
    if (strIterator <= N - (L - 1)) {
      width = L
    } else {
      width = N - strIterator
    }
    console.log('Width ' + width);

    let k = A[i]
    for (let j = i; j < i + width; j++) {
      A[j] /= k
    }
    f[strIterator] /= k


    let h = i + step(strIterator) - 1
    for (let j = 0; j < L - 1 ; j++) {
      let coef = A[h]
      let iter = 0;
      for (let l = h; l < h + width; l++) {
        if (i != 0) {
          console.log(A[l])
        }
        A[l] += A[i + iter] * -coef
        iter++
      }
      f[strIterator + j + 1] += f[strIterator] * -coef
      h += step(strIterator) - strIterator
    }

    strIterator++
  }

  // let k = A[0]
  // for (let i = 0; i < L; i++) {
  //   A[i] /= k
  // }
  // f[0] /= k

  // k = A[L]
  // for (let i = L; i < 2 * L; i++) {
  //   A[i] += A[i - L] * -k
  // }
  // f[1] += f[0] * -k

  // k = A[2 * L + 1]
  // for (let i = 2 * L + 1; i < 3 * L + 1; i++) {
  //   console.log(A[i - (2 * L + 1)])
  //   A[i] += A[i - (2 * L + 1)] * -k
  // }
  // f[2] += f[0] * -k

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
