let cestaX = 170
let score = 0
let tempoRestante = 30
let objetos = []
let fase = 1
let intervaloCriacaoObjeto = 0.05
let velocidadeObjeto = 5
let jogoAtivo = true
let temporizador
let bolasColetadas = 0

const cesta = document.getElementById('cesta')
const scoreDisplay = document.getElementById('score')
const timerDisplay = document.getElementById('timer')
const gameArea = document.getElementById('gameArea')

// Movimentação cesta
document.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowLeft' && cestaX > 0) {
    cestaX -= 20
  } else if (event.key === 'ArrowRight' && cestaX < 318) {
    cestaX += 20
  }
  cesta.style.left = cestaX + 'px'
})

function criarObjeto() {
  let objeto = document.createElement('div')
  objeto.classList.add('objeto')

  if (fase >= 3 && Math.random() < 0.2) {
    objeto.classList.add('objeto-vermelho')
  } 
  else if (fase === 3 && Math.random() < 0.2) {
    objeto.classList.add('item-especial')
    objeto.dataset.tipoEspecial = Math.random() < 0.5 ? 'tesouro' : 'pegadinha'
  }

  objeto.style.left = Math.floor(Math.random() * 370) + 'px'
  objeto.style.top = '0px'
  gameArea.appendChild(objeto)
  objetos.push(objeto)
}

function atualizarObjetos() {
  for (let i = 0; i < objetos.length; i++) {
    let objeto = objetos[i]
    let objetoY = parseInt(objeto.style.top)
    objetoY += velocidadeObjeto

    objeto.style.top = objetoY + 'px'

    if (objetoY > 410 && objetoY < 420) {
      let objetoEsquerda = parseInt(objeto.style.left)
      let objetoDireita = objetoEsquerda + objeto.offsetWidth
      let cestaEsquerda = cestaX
      let cestaDireita = cestaX + cesta.offsetWidth

      if (objetoDireita > cestaEsquerda && objetoEsquerda < cestaDireita) {
        if (objeto.classList.contains('objeto-vermelho')) {
          score -= 10
          alert('Você pegou o objeto vermelho! Perdeu 10 pontos!')
        } else if (objeto.classList.contains('item-especial')) {
          if (objeto.dataset.tipoEspecial === 'tesouro') {
            score += 5
          } else if (objeto.dataset.tipoEspecial === 'pegadinha') {
            score -= 3
          }
        } else {
          score++
          if (fase === 3 || fase === 4) bolasColetadas++
        }
        scoreDisplay.textContent = 'Score: ' + score
        gameArea.removeChild(objeto)
        objetos.splice(i, 1)

        if (score >= 30 && fase === 1) iniciarFase2()
        else if (score >= 40 && fase === 2) iniciarFase3()
        else if (score >= 15 && fase === 3) iniciarFase4()
        else if (score >= 20 && fase === 4) iniciarFase5()
      }
    }

    if (objetoY > 600) {
      gameArea.removeChild(objeto)
      objetos.splice(i, 1)
    }
  }
}

function iniciarFase2() {
  fase = 2
  score = 0
  tempoRestante = 30
  velocidadeObjeto = 7
  intervaloCriacaoObjeto = 0.1
  alert("Fase 2! Objetos mais rápidos!")
  clearInterval(temporizador)
  temporizador = setInterval(atualizarTimer, 1000)
  scoreDisplay.textContent = 'Score: ' + score
  timerDisplay.textContent = 'Tempo: ' + tempoRestante + 's'
}

function iniciarFase3() {
  fase = 3
  score = 0
  tempoRestante = 60
  velocidadeObjeto = 9
  intervaloCriacaoObjeto = 0.05
  alert("Fase 3! Itens especiais!")
  clearInterval(temporizador)
  temporizador = setInterval(atualizarTimer, 1000)
  scoreDisplay.textContent = 'Score: ' + score
  timerDisplay.textContent = 'Tempo: ' + tempoRestante + 's'
}

function iniciarFase4() {
  fase = 4
  score = 0
  tempoRestante = 30
  velocidadeObjeto = 11
  alert("Fase 4! Quase lá!")
  clearInterval(temporizador)
  temporizador = setInterval(atualizarTimer, 1000)
  scoreDisplay.textContent = 'Score: ' + score
  timerDisplay.textContent = 'Tempo: ' + tempoRestante + 's'
}

function iniciarFase5() {
  fase = 5
  score = 0
  tempoRestante = 30
  velocidadeObjeto = 13
  intervaloCriacaoObjeto = 0.03
  alert("Fase 5! Insanidade total! Boa sorte!")
  clearInterval(temporizador)
  temporizador = setInterval(atualizarTimer, 1000)
  scoreDisplay.textContent = 'Score: ' + score
  timerDisplay.textContent = 'Tempo: ' + tempoRestante + 's'
}

function atualizarTimer() {
  if (tempoRestante > 0) {
    tempoRestante--
    timerDisplay.textContent = 'Tempo: ' + tempoRestante + 's'
  } else {
    jogoAtivo = false
    clearInterval(temporizador)
    alert('Tempo esgotado! Sua pontuação final foi: ' + score)

    reiniciarBtn.style.display = 'block'
  }
}

function gameLoop() {
  if (jogoAtivo) {
    atualizarObjetos()
    if (Math.random() < intervaloCriacaoObjeto) {
      criarObjeto()
    }
    requestAnimationFrame(gameLoop)
  }
}

temporizador = setInterval(atualizarTimer, 1000)

setInterval(function() {
  criarObjeto()
}, 3000)

const reiniciarBtn = document.getElementById('reiniciarBtn')

function reiniciarJogo() {
  cestaX = 170
  score = 0
  tempoRestante = 30
  objetos = []
  fase = 1
  intervaloCriacaoObjeto = 0.05
  velocidadeObjeto = 5
  jogoAtivo = true
  bolasColetadas = 0

  cesta.style.left = cestaX + 'px'

  reiniciarBtn.style.display = 'none'

  const elementos = gameArea.querySelectorAll('div:not(#cesta)')
  elementos.forEach(elemento => gameArea.removeChild(elemento))
  objetos = []

  scoreDisplay.textContent = 'Score: ' + score
  timerDisplay.textContent = 'Tempo: ' + tempoRestante + 's'

  temporizador = setInterval(atualizarTimer, 1000)
  gameLoop()
}

reiniciarBtn.addEventListener('click', reiniciarJogo)

gameLoop()
