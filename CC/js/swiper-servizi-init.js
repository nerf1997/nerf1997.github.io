function initServiziSwiper() {
  const swiperWrapper = document.querySelector('#serviziSwiper .swiper-wrapper');

  // Define the service data
  const servizi = [
    // Add more services here if you want them to appear in the carousel
    // These should ideally match the first 3 services displayed on the /servizi.html page
    // For example, if you want to show 'Nuove Costruzioni' from servizi.html:
     {
       img: 'img/servizi/costruzioni.jpg',
       alt: 'Nuove Costruzioni',
       title: 'Nuove Costruzioni',
       description: 'Realizzazione di edifici residenziali e commerciali, dalla fondazione alla consegna chiavi in mano, con attenzione alla sostenibilità e all\'efficienza energetica.'
     },
     {
       img: 'img/servizi/ristrutturazioni.jpg',
       alt: 'Ristrutturazioni',
       title: 'Ristrutturazioni',
       description: 'Interventi di riqualificazione e ammodernamento di immobili esistenti, sia interni che esterni, per valorizzare gli spazi e migliorare il comfort abitativo.'
     },
     {
       img: 'img/servizi/strade.jpg',
       alt: 'Lavori pubblici su strade, autostrade e opere viarie',
       title: 'Lavori pubblici su strade, autostrade e opere viarie',
       description: 'Ci occupiamo della realizzazione di opere pubbliche per la viabilità, tra cui strade, autostrade, rotatorie, ponti e svincoli. Interveniamo in tutte le fasi, dagli scavi ai lavori di finitura, garantendo efficienza, sicurezza e rispetto delle normative.'
     },
     {
       img: 'img/servizi/movimento_terra.jpg',
       alt: 'Movimento Terra',
       title: 'Movimento Terra',
       description: 'Servizi di scavi, sbancamenti, livellamenti e preparazione del terreno per opere civili e infrastrutturali, con mezzi all’avanguardia e personale qualificato.'
     },
     {
       img: 'img/servizi/impianti.jpg',
       alt: 'Impianti Tecnologici',
       title: 'Impianti Tecnologici',
       description: 'Installazione e adeguamento di impianti elettrici, idraulici, di riscaldamento e climatizzazione, con soluzioni innovative e ad alta efficienza.'
     },
     {
       img: 'img/servizi/progettazione.jpg',
       alt: 'Progettazione e Consulenza',
       title: 'Progettazione e Consulenza',
       description: 'Supporto completo dalla fase di ideazione e progettazione fino alla direzione lavori, con consulenza tecnica e burocratica.'
     }
  ];

  if (!swiperWrapper) {
    console.error('⚠️ Swiper Servizi: swiper-wrapper non trovato. Assicurati che l\'HTML sia presente nella pagina.');
    return;
  }

  swiperWrapper.innerHTML = ''; // Clear the wrapper before adding slides

  // Add services as Swiper slides
  servizi.forEach(service => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    // Important: Add the 'reali-item' class to the slide itself
    slide.classList.add('reali-item'); //

    slide.innerHTML = `
      <img src="${service.img}" alt="${service.alt}">
      <h3>${service.title}</h3>
      <p>${service.description}</p>
    `;
    swiperWrapper.appendChild(slide);
  });

  // Initialize Swiper for services
  new Swiper('#serviziSwiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    speed: 2500,
    allowTouchMove: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    grabCursor: true,
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        }
    },
  });
}

// Call the initialization function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initServiziSwiper();
});