// Como o jogo deve funcionar:

// O usuário deverá adivinhar um número, gerado pelo programa,
// que vai de 0 a 100. Conforme as tentativas do usuário, o
// programa deve avisar se o usuário acertou ou não.
// Caso não tenha acertado, então o programa deverá avisar se
// o palpite era maior ou menor que o número a ser adivinhado.

// Bônus: quando o usuário acertar, ele deverá ter a opção de
// jogar novamente, ou parar e encerrar o programa.

// Bônus 2: quando o usuário digitar um caractere inválido,
// que não seja um número, o programa deve saber identificar
// e avisar ao usuário que ele está digitando um dado inválido.

// Bônus 3: transforme seu jogo em um módulo NPM, suba no NPM e
// use-o em seguida.

// Bônus 4: use classes do ES6 para modelar seu jogo. (:

// Bonus 5: limitar o número de palpites de acordo com a dificuldade.


const readline = require('readline');
const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const numeroRandomico = Math.floor(Math.random() * 100);
 function recomecar() {
  const numeroRandomico = Math.floor(Math.random() * 100);
   io.question('Gostaria de jogar novamente? ', resposta => {
    if (resposta == 'sim') {
      comecarJogo(numeroRandomico);
    } else {
      io.close();
    }
  });
}
 function tenteDenovo(numero) {
  io.question('Tente denovo: ', resposta => {
    checarResposta(resposta, numero);
  });
}
 function checarResposta(resposta, numero) {
  if (resposta == numero) {
    console.log('Parabéns, você acertou!');
    recomecar();
  } else if (resposta < numero) {
    console.log('Precisa ser um número maior!');
    tenteDenovo(numero);
  } else {
    console.log('Precisa ser um número menor!');
    tenteDenovo(numero);
  }
}
 function comecarJogo(numero) {
  io.question('Pensei em um número. Qual é? ', resposta => {
    checarResposta(resposta, numero);
  });
};
 comecarJogo(numeroRandomico);