function verificarNumeroPrimo(n) {
    // Caso o número seja menor ou igual a 1, não é primo
    if (n <= 1) {
        return false;
    }
    
    // Loop para verificar se o número é divisível por algum número menor que ele
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false; // Se for divisível, não é primo
        }
    }
    
    return true; // Se não for divisível por nenhum número menor que ele, é primo
}

// Testes
console.log(verificarNumeroPrimo(0)); // false
console.log(verificarNumeroPrimo(1)); // false
console.log(verificarNumeroPrimo(2)); // true
console.log(verificarNumeroPrimo(3)); // true
console.log(verificarNumeroPrimo(7)); // true
console.log(verificarNumeroPrimo(83)); // true
console.log(verificarNumeroPrimo(100)); // false
console.log(verificarNumeroPrimo(991)); // true
console.log(verificarNumeroPrimo(104729)); // true
console.log(verificarNumeroPrimo(14348907)); // false