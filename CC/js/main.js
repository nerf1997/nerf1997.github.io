// Funzione per attivare lo slider dell'eroe
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero img');

  if (slides.length === 0) {
    console.error('⚠️ Slider: nessuna immagine trovata dentro .hero');
    return;
  }

  let current = 0;
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

// Funzione per attivare il form di contatto
function initContactForm() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    if (!form) {
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

// Funzione: Inizializzazione del filtro delle realizzazioni
function initRealizzazioniFilter() {
    const filterButtons = document.querySelectorAll('.btn-filter');
    const realizzazioniItems = document.querySelectorAll('.reali-item');

    if (filterButtons.length === 0 || realizzazioniItems.length === 0) {
        console.warn('⚠️ Filtro Realizzazioni: Bottoni o elementi da filtrare non trovati.');
        return;
    }

    function filterRealizzazioni(filterType) {
        realizzazioniItems.forEach(item => {
            const itemType = item.dataset.type;

            if (filterType === 'all' || itemType === filterType) {
                // Se l'elemento deve essere mostrato
                // 1. Rimuovi display: none; immediatamente per permettere le transizioni
                item.style.display = ''; // Reimposta a valore di default (grid item)

                // 2. Forza il reflow per garantire che le proprietà CSS siano calcolate prima della transizione
                // Questo è un trucco per far partire la transizione quando si aggiunge la classe
                void item.offsetWidth; // Non rimuovere questa linea!

                // 3. Rimuovi la classe 'hidden' per avviare l'animazione di apparizione
                item.classList.remove('hidden');

            } else {
                // Se l'elemento deve essere nascosto
                // 1. Aggiungi la classe 'hidden' per avviare le transizioni CSS (opacity, max-height, transform)
                item.classList.add('hidden');

                // 2. Imposta display: none; DOPO un brevissimo ritardo.
                // Questo permette alla transizione di iniziare (visivamente scomparendo/collassando)
                // e poi l'elemento viene rapidamente rimosso dal flusso, consentendo alla griglia di reagire.
                const transitionDuration = 300; // Corrisponde alla durata delle transizioni CSS
                const displayNoneDelay = 100; // Imposta display: none; dopo 100ms (regola questo valore!)

                setTimeout(() => {
                    if (item.classList.contains('hidden')) { // Assicurati che sia ancora inteso come nascosto
                        item.style.display = 'none'; // Nascondi completamente l'elemento
                    }
                }, displayNoneDelay);
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filterType = button.dataset.filter;
            filterRealizzazioni(filterType);
        });
    });

    // Imposta il bottone "Tutti" come attivo all'inizio
    const allButton = document.querySelector('.filter-buttons .btn-filter[data-filter="all"]');
    if (allButton) {
        allButton.classList.add('active');
        // Assicurati che tutti gli elementi siano visibili e nel flusso all'avvio
        realizzazioniItems.forEach(item => {
            item.classList.remove('hidden');
            item.style.display = ''; // Assicurati che non siano display: none
        });
    }
}


// Inizializzazione al caricamento della pagina
document.addEventListener('DOMContentLoaded', () => {
  // Esegui initHeroSlider() solo se l'elemento .hero è presente
  if (document.querySelector('.hero')) {
    initHeroSlider();
  }

  // Esegui initContactForm() solo se l'elemento contactForm è presente
  if (document.getElementById('contactForm')) {
    initContactForm();
  }

  // ** IMPORTANTISSIMO: Queste funzioni sono state rimosse perché non sono compatibili con la griglia filtrabile o gli Swiper. **
  // loadRealizzazioniImagesForInfiniteScroll();
  // initRealizzazioniInfiniteScroll();

  // Inizializza il filtro realizzazioni SOLO se la griglia è presente
  if (document.querySelector('.reali-grid')) {
    initRealizzazioniFilter();
  }
  initRealizzazioniModal();
});


const menuButton = document.getElementById('menuButton');
const navMenu = document.getElementById('navMenu');

if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      document.body.classList.toggle('no-scroll');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        document.body.classList.remove('no-scroll');
      });
    });

    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) && !menuButton.contains(event.target) && navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        document.body.classList.remove('no-scroll');
      }
    });
}

// Funzione per inizializzare il modale delle realizzazioni
function initRealizzazioniModal() {
    const realizzazioniItems = document.querySelectorAll('.reali-item');
    const modal = document.getElementById('realizzazioniModal');
    const closeButton = modal.querySelector('.close-button');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const prevButton = modal.querySelector('.prev-button');
    const nextButton = modal.querySelector('.next-button');

    let currentImages = [];
    let currentImageIndex = 0;

    // Funzione per mostrare l'immagine corrente nella galleria del modale
    function showImage(index) {
        if (currentImages.length > 0) {
            modalImage.src = currentImages[index];
        } else {
            modalImage.src = ''; // Nessuna immagine
        }
    }

    // Apri il modale
    realizzazioniItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.dataset.title;
            const description = item.dataset.description;
            const images = item.dataset.images ? item.dataset.images.split(',') : [];

            modalTitle.textContent = title;
            modalDescription.textContent = description;
            currentImages = images;
            currentImageIndex = 0; // Reset dell'indice all'apertura
            showImage(currentImageIndex);

            modal.classList.add('show-modal');
            document.body.classList.add('no-scroll'); // Impedisce lo scroll del body
        });
    });

    // Chiudi il modale cliccando sul bottone X
    closeButton.addEventListener('click', () => {
        modal.classList.remove('show-modal');
        document.body.classList.remove('no-scroll');
    });

    // Chiudi il modale cliccando fuori dal contenuto del modale
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show-modal');
            document.body.classList.remove('no-scroll');
        }
    });

    // Navigazione Galleria: Immagine precedente
    prevButton.addEventListener('click', () => {
        if (currentImages.length > 1) {
            currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
            showImage(currentImageIndex);
        }
    });

    // Navigazione Galleria: Immagine successiva
    nextButton.addEventListener('click', () => {
        if (currentImages.length > 1) {
            currentImageIndex = (currentImageIndex + 1) % currentImages.length;
            showImage(currentImageIndex);
        }
    });
}