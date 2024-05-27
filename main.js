$(document).ready(function() {
  const topoimg = 'imgs/topo.png';  // Ruta a tu imagen PNG del topo
  let score = 0;
  let fallos = 0;
  let activeMole;
  let gameInterval;
  let intervalotiempo = 1000;

  function creatablero() {
    const tablerodejuego = $('#juego-tablero');
    tablerodejuego.empty(); // Limpiar el tablero antes de agregar los agujeros
    for (let i = 0; i < 9; i++) { // Nueve agujeros en una cuadrícula de 3x3
      tablerodejuego.append(`
        <div class="mole-hole" data-index="${i}">
          <img src="imgs/crater.png" class="static-image">
          <div class="mole-hitbox">
            <img src="${topoimg}" class="mole-image">
          </div>
        </div>
      `);
    }
  }

  function startGame() {
    score = 0;
    fallos = 0;
    intervalotiempo = 1000;
    $('#score').text(score);
    $('#fallos').text(fallos);
    $('.mole-image').hide();
    clearInterval(gameInterval);
    gameInterval = setInterval(activeTopo, intervalotiempo);
  }

  function activeTopo() {
    const moleHoles = $('.mole-hole');
    const randomIndex = Math.floor(Math.random() * moleHoles.length);
    if (activeMole) {
      activeMole.find('.mole-image').hide();
    }
    activeMole = $(moleHoles[randomIndex]);
    activeMole.find('.mole-image').show();
  }

  // Función para manejar el golpe al topo
  function whackMole(event) {
    if ($(this).find('.mole-image').is(':visible')) {
      score++;
      $('#score').text(score);
      $(this).find('.mole-image').hide();
      increaseSpeed();  // Aumenta la velocidad cada vez que golpeas un topo
    } else {
      fallos++;
      $('#fallos').text(fallos);
      if (fallos >= 6) {  // Cambiado a 6 fallos para terminar el juego
        endGame();
      }
    }
  }

  // Función para aumentar la velocidad
  function increaseSpeed() {
    clearInterval(gameInterval);
    intervalotiempo *= 0.9;  // Disminuye el tiempo de intervalo en un 10%
    gameInterval = setInterval(activeTopo, intervalotiempo);
  }

  // Función para terminar el juego
  function endGame() {
    clearInterval(gameInterval);
    alert('Fin del juego! Has fallado 6 veces.');
  }

  creatablero();

  $('#start-button').click(startGame);
  $(document).on('click', '.mole-hitbox', whackMole);

  // Mostrar/ocultar cursor personalizado
  const cursor = $('.cursor');
  $('#juego-tablero').on('mouseenter', () => {
    cursor.show();
  }).on('mouseleave', () => {
    cursor.hide();
  });

  $(window).on('mousemove', (e) => {
    cursor.css({
      top: e.pageY + 'px',
      left: e.pageX + 'px'
    });
  });
});
