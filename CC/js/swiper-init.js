// Funzione per inizializzare Swiper per la sezione "Realizzazioni"
function initRealizzazioniSwiper() {
  const swiperWrapper = document.querySelector('#realizzazioniSwiper .swiper-wrapper');
  const imageFiles = [
    'Villette_Montepaone_CZ/realizzazione_5.jpg',
    'Appartamento_Via_De_Riso/realizzazione_21.jpg',
    'Piazza_San_Floro_CZ/realizzazione_19.jpg',
    'Cantiere_Comune_CZ/realizzazione_6.jpg',
    'Casa_Via_Iannelli/realizzazione_33.jpg',
    'San_Floro_2/realizzazione_13.jpg'
  ];

  if (!swiperWrapper) {
    console.error('⚠️ Swiper Realizzazioni: swiper-wrapper non trovato. Assicurati che l\'HTML sia presente nella pagina.');
    return;
  }

  swiperWrapper.innerHTML = ''; // Pulisci il wrapper prima di aggiungere le slide

  // Aggiungi le immagini come slide di Swiper
  imageFiles.forEach(fileName => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide'); // Classe richiesta da Swiper

    const img = document.createElement('img');
    img.src = `img/realizzazioni/${fileName}`; // Assicurati che il percorso sia corretto rispetto alla tua struttura di cartelle
    img.alt = `Progetto ${fileName.replace(/\.(jpeg|jpg|png|gif)$/i, '')}`;

    slide.appendChild(img);
    swiperWrapper.appendChild(slide);
  });

  // Inizializza Swiper
  new Swiper('#realizzazioniSwiper', {
    loop: true, // Abilita lo scorrimento infinito
    slidesPerView: 1, // Mostra una slide per volta di default (mobile)
    spaceBetween: 10, // Spazio tra le slide
    autoplay: {
        delay: 3000, // Imposta il delay a 0 per uno scorrimento senza pause
        disableOnInteraction: false, // Continua l'autoplay anche dopo l'interazione dell'utente
    },
    speed: 2500, // Velocità della transizione in millisecondi per singola "slide" (aumenta per più lento)
    allowTouchMove: true, // Abilita lo scorrimento manuale tramite touch/drag
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    grabCursor: true, // Riabilita l'indicatore del cursore trascinabile
    breakpoints: {
        768: {
            slidesPerView: 2, // Mostra 2 slide
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 3, // Mostra 3 slide
            spaceBetween: 30,
        }
    },
  });
}

// Chiama la funzione di inizializzazione quando il DOM è completamente caricato
document.addEventListener('DOMContentLoaded', () => {
  initRealizzazioniSwiper();
});