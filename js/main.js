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

    fetch(form.action, {
      method: form.method,
      headers: { 'Accept': 'application/json' },
      body: data
    })
    .then(res => {
      if (res.ok) {
        status.textContent = '✅ Grazie! Messaggio inviato.';
        form.reset();
      } else {
        return res.json().then(data => {
          status.textContent = data.error || '❌ Errore durante l’invio.';
        });
      }
    })
    .catch(() => {
      status.textContent = '❌ Impossibile inviare al momento.';
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
  if (!event.target.closest('.menu-container') && navMenu.classList.contains('show')) {
    navMenu.classList.remove('show');
    document.body.classList.remove('no-scroll'); // Rimosso per gestire lo scroll del body
  }
});