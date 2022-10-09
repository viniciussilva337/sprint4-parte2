let crashes = 5;
function blockRect(r1, r2) {
  //r1 -> bloqueado
  //r2 -> parede
  //armazenam a distância entre os retângulos
  let posicaoX = r1.centerX() - r2.centerX();
  let posicaoY = r1.centerY() - r2.centerY();

  //soma das metades
  let somaMetadeWidth = r1.halfWidth() + r2.halfWidth();
  let somaMetadeHeight = r1.halfHeight() + r2.halfHeight();

  function removeLife() {
    if (r1.type == "player" && r2.type == "player") {
      r1.life -= Math.floor(Math.random() * 21);
      r2.life -= Math.floor(Math.random() * 21);
      crashes = crashes - 1;
	  console.log(r1);
    }
    if (!crashes) {
      const loserMessage = r1.life > r2.life ? `O jogador ${r1.name} Ganhou` : r1.life == r2.life ? 'Empate': `O jogador ${r2.name} Ganhou`
      alert(`${loserMessage} \r\n ${r1.name}: ${r1.life} X ${r2.name}: ${r2.life}`);
    }
  }
  if (
    Math.abs(posicaoX) < somaMetadeWidth &&
    Math.abs(posicaoY) < somaMetadeHeight
  ) {
    let overlapX = somaMetadeWidth - Math.abs(posicaoX);
    let overlapY = somaMetadeHeight - Math.abs(posicaoY);

    if (overlapX >= overlapY) {
      //colisão por cima ou por baixo
      if (posicaoY > 0) {
        //por cima
        r1.posY += overlapY;
        removeLife();
      } else {
        r1.posY -= overlapY;

        removeLife();
      }
    } else {
      //colisão pela esquerda ou direita
      if (posicaoX > 0) {
        //colisão pela esquerda
        r1.posX += overlapX;
        removeLife();
      } else {
        r1.posX -= overlapX;

        removeLife();
      }
    }
  }
}
