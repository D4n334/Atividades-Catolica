function transporMatriz(A) {
    // Matriz Original
    console.log("Matriz Original:");
    for (let i = 0; i < A.length; i++) {
      console.log(A[i]);
    }
  
    // calculo Matriz transposta
    let transposta = [];
    for (let i = 0; i < A[0].length; i++) {
      transposta.push([]);
      for (let j = 0; j < A.length; j++) {
        transposta[i][j] = A[j][i];
      }
    }
  
    // Print Matriz Transposta
    console.log("Matriz transposta:");
    for (let i = 0; i < transposta.length; i++) {
      console.log(transposta[i]);
    }

  
    return transposta;
  }

const matrizExemplo = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];
console.log();
  transporMatriz(matrizExemplo);
