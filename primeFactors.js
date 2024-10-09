function isPrime(num) {
  const sqrt = Math.sqrt(num);
  for (let i = 2; i <= sqrt; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function primeFactors(num, factors = []) {
  if (isPrime(num)) {
    factors.push(num);
    return factors;
  }

  const sqrt = Math.sqrt(num);
  for (let i = 2; i <= sqrt; i++) {
    if (num % i === 0) {
      factors = primeFactors(num / i, factors);
      factors = primeFactors(i, factors);
      break;
    }
  }

  return factors;
}

console.log(primeFactors(1025));
