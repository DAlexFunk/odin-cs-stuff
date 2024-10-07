function fibbs(n) {
  const fibbs = [0, 1];
  for (let i = 2; i < n; i++) {
    fibbs[i] = fibbs[i - 1] + fibbs[i - 2];
  }
  return fibbs;
}

function fibbsRec(n, fibbs = [0,1]) {
    if (n === 2) {
        return fibbs;
    }

    fibbs.push(fibbs.at(-1) + fibbs.at(-2))
    fibbs = fibbsRec(--n, fibbs);
    return fibbs;
}

let num = 8;
console.log(fibbs(num))
console.log(fibbsRec(num));