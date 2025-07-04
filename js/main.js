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
  if (!form || !status) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);

    // Formsubmit.co non richiede l'header 'Accept': 'application/json' per l'invio base.
    // Tuttavia, il tuo codice attuale che lo include funziona comunque.
    // Lo lascio così com'è, in quanto è robusto anche per altri servizi.
    fetch(form.action, {
      method: form.method,
      //headers: { 'Accept': 'application/json' }, // Questo header indica che ci aspettiamo una risposta JSON. Formsubmit.co risponde HTML/testo, ma la fetch gestirà correttamente.
      body: data
    })
    .then(res => {
      // Per Formsubmit.co, una risposta 'ok' (status 200) significa successo.
      // Non c'è un JSON specifico da parsare in caso di successo,
      // ma il tuo codice attuale di base funziona.
      if (res.ok) {
        status.textContent = '✅ Grazie! Messaggio inviato.';
        form.reset();
      } else {
        // Se c'è un errore (es. validazione lato Formsubmit), potremmo ricevere un HTML con il messaggio.
        // Qui stiamo cercando un JSON. Potresti voler adattare questo per Formsubmit.co se vuoi messaggi d'errore specifici.
        // Per ora, un errore generico è sufficiente se res.ok non è true.
        status.textContent = '❌ Errore durante l’invio. Riprova più tardi.';
        // Se Formsubmit.co restituisse un JSON di errore (non comune), potresti volerlo parsare:
        // return res.json().then(data => {
        //   status.textContent = data.error || '❌ Errore durante l’invio.';
        // });
      }
    })
    .catch(() => {
      status.textContent = '❌ Impossibile inviare al momento. Controlla la tua connessione.';
    });
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