$(document).ready(function() {
    // Ruta a la imagen del topo
    const moleImgSrc = 'imgs/topo.png';  
    // HTML del topo
    const moleHtml = `<img src="${moleImgSrc}" class="mole">`;
    let score = 0;  // Puntuación inicial
    let topo;  // Agujero con el topo activo
    let Intervalo;  // Intervalo para el juego
  
    // Función para crear el tablero del juego
    function tablero() {
      const gametablero = $('#Tablero de juego');
      // Crea 9 agujeros para los topos
      for (let i = 0; i < 9; i++) {
        gametablero.append(`<div class="mole-hole" data-index="${i}">${moleHtml}</div>`);
      }
    }
  
    // Función para iniciar el juego
    function startGame() {
      score = 0;  // Resetea la puntuación
      $('#score').text(score);  // Actualiza la puntuación en la interfaz
      $('.mole').hide();  // Oculta todos los topos
      clearInterval(Intervalo);  // Limpia cualquier intervalo previo
      // Configura un nuevo intervalo para mostrar y ocultar los topos
      Intervalo = setInterval(() => {
        const moleHoles = $('.mole-hole');  // Selecciona todos los agujeros
        const randomIndex = Math.floor(Math.random() * moleHoles.length);  // Selecciona un índice aleatorio
        if (topo) {
          topo.find('.mole').hide();  // Oculta el topo activo previo
        }
        topo = $(moleHoles[randomIndex]);  // Actualiza el topo activo
        topo.find('.mole').show();  // Muestra el nuevo topo
      }, 1000);  // Intervalo de 1 segundo
    }
  
    // Función para manejar el golpe al topo
    function whackMole(event) {
      if ($(this).find('.mole').is(':visible')) {
        score++;  // Incrementa la puntuación
        $('#score').text(score);  // Actualiza la puntuación en la interfaz
        $(this).find('.mole').hide();  // Oculta el topo golpeado
      }
    }
  
    // Crea el tablero al cargar la página
    tablero();
  
    // Asigna la función de iniciar el juego al botón
    $('#start-button').click(startGame);
  
    // Asigna la función de golpear el topo a los agujeros
    $(document).on('click', '.mole-hole', whackMole);
  });
  