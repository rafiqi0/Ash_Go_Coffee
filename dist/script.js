const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  nav?.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('nav-open', !isOpen);
});

document.querySelectorAll('.desktop-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    nav?.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  });
});

const filterButtons = document.querySelectorAll('.filter-button');
const menuCards = document.querySelectorAll('.menu-card');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    menuCards.forEach((card) => {
      const shouldShow = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !shouldShow);
    });
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const bookingForm = document.querySelector('#booking-form');
const formStatus = document.querySelector('#form-status');
const ashGoConfig = window.ASH_GO_CONFIG || {};

async function saveEnquiry(payload) {
  if (!ashGoConfig.supabaseUrl || !ashGoConfig.supabaseAnonKey) return false;
  const response = await fetch(`${ashGoConfig.supabaseUrl}/rest/v1/event_enquiries`, {
    method: 'POST',
    headers: {
      apikey: ashGoConfig.supabaseAnonKey,
      Authorization: `Bearer ${ashGoConfig.supabaseAnonKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`Supabase returned ${response.status}`);
  return true;
}

bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(bookingForm);
  const name = data.get('name') || 'di sini';
  const eventType = data.get('event') || 'sebuah acara';
  const date = data.get('date') || 'tarikh yang akan disahkan';
  const guests = data.get('guests') || 'jumlah tetamu yang akan disahkan';
  const message = `Hai Ash GO Coffee, saya ${name}. Saya ingin bertanya tentang ${eventType} pada ${date} untuk ${guests} tetamu.`;
  const whatsappUrl = `https://wa.me/601163377360?text=${encodeURIComponent(message)}`;
  const payload = {
    name: String(name),
    event_type: String(eventType),
    event_date: data.get('date') || null,
    guest_count: data.get('guests') ? Number(data.get('guests')) : null,
    source: 'website',
  };

  if (formStatus) formStatus.textContent = 'Menyimpan pertanyaan anda…';
  saveEnquiry(payload)
    .then((saved) => {
      if (saved) {
        if (formStatus) formStatus.textContent = 'Terima kasih — pertanyaan anda telah diterima.';
        bookingForm.reset();
      } else {
        if (formStatus) formStatus.textContent = 'Membuka WhatsApp dengan pertanyaan anda…';
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }
    })
    .catch(() => {
      if (formStatus) formStatus.textContent = 'Database belum tersedia — membuka WhatsApp sebagai alternatif…';
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
});
