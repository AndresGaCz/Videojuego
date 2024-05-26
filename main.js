$(document).ready(function() {
    const moleImgSrc = 'imgs/topo.png';  // Reemplaza con la ruta a tu imagen PNG del topo
    const moleSize = 80;  // Tamaño del topo en píxeles (puedes cambiar este valor)
    const moleHtml = `<img src="${moleImgSrc}" class="mole" style="width: ${moleSize}px; height: ${moleSize}px;">`;
    let score = 0;
    let fallos = 0;  // Contador de fallos
    let activeMole;
    let gameInterval;
  
    // Función para crear el tablero del juego
    function tablero() {
      const juegotablero = $('#game-board');
      for (let i = 0; i < 9; i++) {
        juegotablero.append(`<div class="mole-hole" data-index="${i}">${moleHtml}</div>`);
      }
    }
  
    // Función para iniciar el juego
    function startGame() {
      score = 0;
      fallos = 0;
      $('#score').text(score);
      $('#fallos').text(fallos);
      $('.mole').hide();
      clearInterval(gameInterval);
      gameInterval = setInterval(() => {
        const moleHoles = $('.mole-hole');
        const randomIndex = Math.floor(Math.random() * moleHoles.length);
        if (activeMole) {
          activeMole.find('.mole').hide();
        }
        activeMole = $(moleHoles[randomIndex]);
        activeMole.find('.mole').show();
      }, 1000);
    }
  
    // Función para manejar el golpe al topo
    function whackMole(event) {
      if ($(this).find('.mole').is(':visible')) {
        score++;
        $('#score').text(score);
        $(this).find('.mole').hide();
      } else {
        fallos++;
        $('#fallos').text(fallos);
        if (fallos >= 5) {
          endGame();
        }
      }
    }
  
    // Función para terminar el juego
    function endGame() {
      clearInterval(gameInterval);
      alert('Fin del juego, fallaste 5 veces.');
    }
  
    tablero();
  
    $('#start-button').click(startGame);
  
    $(document).on('click', '.mole-hole', whackMole);
  });
  