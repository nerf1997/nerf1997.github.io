// Funzione per attivare lo slider
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero img');
  let current = 0;

  if (slides.length === 0) {
    console.error('⚠️ Slider: nessuna immagine trovata dentro .hero');
    return;
  }

  slides.forEach(slide => {
    slide.style.opacity = '0';
  });
  slides[current].style.opacity = '1';

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
        // console.error("Contact form not found.");
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        status.textContent = 'Invio in corso...';
        status.style.color = '#3498db'; // Colore blu per "invio in corso"

        const data = new FormData(form);

        try {
            const res = await fetch(form.action, {
                method: form.method,
                headers: { 'Accept': 'application/json' }, // Lascia questo header, Web3Forms lo gestisce
                body: data
            });

            const result = await res.json(); // Web3Forms restituisce un JSON

            if (result.success) { // Controlla la proprietà 'success' nella risposta JSON di Web3Forms
                status.textContent = '✅ Grazie! Messaggio inviato.';
                status.style.color = 'green';
                form.reset();
            } else {
                // Controlla il messaggio d'errore da Web3Forms, se presente
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

// Inizializzazione al caricamento della pagina
document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initContactForm();
});


const menuButton = document.getElementById('menuButton');
const navMenu = document.getElementById('navMenu');

// Toggle del menu
menuButton.addEventListener('click', () => {
  navMenu.classList.toggle('show');
  document.body.classList.toggle('no-scroll'); // Aggiunto per gestire lo scroll del body
});

// Chiude il menu cliccando su una voce
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show');
    document.body.classList.remove('no-scroll'); // Rimosso per gestire lo scroll del body
  });
});

// Chiude il menu cliccando fuori
document.addEventListener('click', (event) => {
  // Controlla se il click non è avvenuto all'interno del menu-container E il menu è aperto
  if (!navMenu.contains(event.target) && !menuButton.contains(event.target) && navMenu.classList.contains('show')) {
    navMenu.classList.remove('show');
    document.body.classList.remove('no-scroll');
  }
});