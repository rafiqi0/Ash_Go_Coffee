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
bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(bookingForm);
  const name = data.get('name') || 'there';
  const eventType = data.get('event') || 'an event';
  const date = data.get('date') || 'a date to be confirmed';
  const guests = data.get('guests') || 'guest count to be confirmed';
  const message = `Hi Ash GO Coffee, I'm ${name}. I'd like to enquire about ${eventType} on ${date} for ${guests} guests.`;
  const whatsappUrl = `https://wa.me/601163377360?text=${encodeURIComponent(message)}`;
  if (formStatus) formStatus.textContent = 'Opening WhatsApp with your enquiry…';
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
});
