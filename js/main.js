// Funzione per attivare lo slider dell'eroe (immutata)
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero img');
  let current = 0;

  if (slides.length === 0) {
    console.error('⚠️ Slider: nessuna immagine trovata dentro .hero');
    return;
  }

  slides.forEach((slide, index) => {
    slide.style.opacity = '0';
    if (index === current) {
      slide.style.opacity = '1';
    }
  });

  setInterval(() => {
    slides[current].style.opacity = '0';
    current = (current + 1) % slides.length;
    slides[current].style.opacity = '1';
  }, 5000);
}

// Funzione per attivare il form di contatto (immutata)
function initContactForm() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    if (!form) {
        // console.error("Contact form not found.");
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        status.textContent = 'Invio in corso...';
        status.style.color = '#3498db';

        const data = new FormData(form);

        try {
            const res = await fetch(form.action, {
                method: form.method,
                headers: { 'Accept': 'application/json' },
                body: data
            });

            const result = await res.json();

            if (result.success) {
                status.textContent = '✅ Grazie! Messaggio inviato.';
                status.style.color = 'green';
                form.reset();
            } else {
                const errorMessage = result.message || 'Errore durante l’invio. Riprova più tardi.';
                status.textContent = `❌ ${errorMessage}`;
                status.style.color = 'red';
            }
        } catch (error) {
            console.error('Errore durante l’invio del form:', error);
            status.textContent = '❌ Impossibile inviare al momento. Controlla la tua connessione.';
            status.style.color = 'red';
        }
    });
}

// Funzione per caricare le immagini delle realizzazioni (Modificata per la duplicazione)
function loadRealizzazioniImages() {
  const gallery = document.getElementById('realizzazioniGallery');
  const imageFiles = [
    'realizzazione1.jpg',
    'realizzazione2.jpg',
    'realizzazione3.jpg',
    'realizzazione4.jpg', 
    'realizzazione5.jpg',
    'realizzazione6.jpg' 
  ];

  if (!gallery) {
    console.error('⚠️ Realizzazioni: contenitore galleria non trovato.');
    return;
  }

  gallery.innerHTML = ''; // Pulisci la galleria prima di caricarla

  // Crea e aggiungi le immagini al DOM
  const createImages = () => {
    imageFiles.forEach(fileName => {
      const img = document.createElement('img');
      img.src = `img/realizzazioni/${fileName}`;
      img.alt = `Progetto ${fileName.replace(/\.(jpeg|jpg|png|gif)$/i, '')}`;
      img.classList.add('reali-item'); // Nuova classe per identificare gli elementi scorrevoli
      gallery.appendChild(img);
    });
  };

  createImages(); // Aggiunge il primo set di immagini
  createImages(); // Aggiunge un secondo set di immagini per lo scroll infinito
}

// NUOVA FUNZIONE: Slider per le realizzazioni con scrolling infinito
function initRealizzazioniInfiniteScroll() {
  const galleryContainer = document.getElementById('realizzazioniGallery');
  if (!galleryContainer) {
    console.error('⚠️ Realizzazioni Scroll: contenitore galleria non trovato.');
    return;
  }

  const scrollSpeed = 0.5; // Velocità di scorrimento in pixel per frame (modifica per accelerare/rallentare)
  let animationFrameId;

  // Clona gli elementi esistenti per creare un loop infinito
  const items = galleryContainer.querySelectorAll('.reali-item');
  if (items.length === 0) {
      console.warn('Realizzazioni Scroll: Nessun elemento da scorrere.');
      return;
  }

  // Se ci sono troppe poche immagini per riempire il contenitore due volte, potrebbe non funzionare bene.
  // Assicurati di avere un numero sufficiente di immagini.
  
  const scrollGallery = () => {
    // Se la galleria ha scrollato a metà del suo contenuto (cioè, il primo set di immagini è stato superato),
    // riporta lo scroll all'inizio del secondo set di immagini.
    if (galleryContainer.scrollLeft >= galleryContainer.scrollWidth / 2) {
      galleryContainer.scrollLeft -= galleryContainer.scrollWidth / 2;
    }
    galleryContainer.scrollLeft += scrollSpeed;
    animationFrameId = requestAnimationFrame(scrollGallery);
  };

  // Avvia lo scorrimento
  animationFrameId = requestAnimationFrame(scrollGallery);

  // Opzionale: Ferma lo scorrimento al passaggio del mouse e riavvialo
  galleryContainer.addEventListener('mouseenter', () => {
    cancelAnimationFrame(animationFrameId);
  });
  galleryContainer.addEventListener('mouseleave', () => {
    animationFrameId = requestAnimationFrame(scrollGallery);
  });
}


// Inizializzazione al caricamento della pagina
document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initContactForm();
  loadRealizzazioniImages();           // Prima carica le immagini (due volte)
  initRealizzazioniInfiniteScroll();  // Poi avvia lo scorrimento infinito
});


const menuButton = document.getElementById('menuButton');
const navMenu = document.getElementById('navMenu');

// Toggle del menu (immutato)
menuButton.addEventListener('click', () => {
  navMenu.classList.toggle('show');
  document.body.classList.toggle('no-scroll');
});

// Chiude il menu cliccando su una voce (immutato)
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show');
    document.body.classList.remove('no-scroll');
  });
});

// Chiude il menu cliccando fuori (immutato)
document.addEventListener('click', (event) => {
  if (!navMenu.contains(event.target) && !menuButton.contains(event.target) && navMenu.classList.contains('show')) {
    navMenu.classList.remove('show');
    document.body.classList.remove('no-scroll');
  }
});