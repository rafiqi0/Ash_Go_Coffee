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

let currentLanguage = 'ms';
const languageCopy = new Map([
  ['.announcement > span:nth-child(1)', 'COFFEE CART BOOKINGS NOW OPEN'],
  ['.announcement > span:nth-child(3)', 'WEDDINGS · PRIVATE EVENTS · BIRTHDAYS'],
  ['.announcement > a', 'See catering options <span aria-hidden="true">↗</span>'],
  ['.desktop-nav a:nth-child(1)', 'Menu'],
  ['.desktop-nav a:nth-child(2)', 'Our story'],
  ['.desktop-nav a:nth-child(3)', 'Catering'],
  ['.desktop-nav a:nth-child(4)', 'Locations'],
  ['.button-small', 'Book us <span aria-hidden="true">↗</span>'],
  ['.brand small', 'coffee happiness'],
  ['.hero-copy .eyebrow', '<span class="eyebrow-line"></span> KOPI · TEH · GOOD TIMES'],
  ['.hero-copy h1', 'A little coffee happiness, <em>wherever you gather.</em>'],
  ['.hero-lede', 'From our first food truck to our everyday coffee stops, Ash GO Coffee brings cheerful drinks, familiar flavours, and a warm welcome to the table.'],
  ['.hero-actions .button-accent', 'Explore the menu <span aria-hidden="true">↗</span>'],
  ['.hero-actions .text-link', 'Planning an event? <span aria-hidden="true">→</span>'],
  ['.hero-note', '<span class="note-star">✳</span> Now taking 2026 / 2027 event enquiries'],
  ['.hero-sticker span:nth-child(1)', 'GOOD'],
  ['.hero-sticker strong', 'VIBES'],
  ['.hero-sticker span:nth-child(3)', 'ONLY'],
  ['.hero-drink-side .drink-label', '3 LAYER'],
  ['.hero-tape', 'A LITTLE SIP OF JOY <span>✦</span>'],
  ['.value-strip > div:nth-child(1) strong', 'Made with heart'],
  ['.value-strip > div:nth-child(1) small', 'Familiar flavours, happy cups'],
  ['.value-strip > div:nth-child(2) strong', 'Made to move'],
  ['.value-strip > div:nth-child(2) small', 'Stores, trucks, carts & pop-ups'],
  ['.value-strip > div:nth-child(3) strong', 'Made for moments'],
  ['.value-strip > div:nth-child(3) small', 'Weddings, birthdays & gatherings'],
  ['.image-caption', 'FROM THE ROAD<br /><strong>TO YOUR ROUTINE</strong>'],
  ['.story-copy .eyebrow', '<span class="eyebrow-line"></span> OUR STORY'],
  ['.story-copy h2', 'Born on the road. Growing with every cup.'],
  ['.story-copy > p:not(.eyebrow)', 'Ash GO Coffee started with a food truck and a simple idea: make good coffee feel easy to find. Today, our stores and mobile setups keep that same spirit moving — one familiar drink, one friendly hello, one good day at a time.'],
  ['.section-heading .eyebrow', '<span class="eyebrow-line"></span> WHAT\'S IN THE CUP'],
  ['.section-heading h2', 'Keep it classic.<br /><em>Make it yours.</em>'],
  ['.section-heading > p', 'Malaysian favourites, chilled favourites, and sweet little surprises for every kind of coffee mood.'],
  ['.filter-button:nth-child(1)', 'All favourites'],
  ['.filter-button:nth-child(2)', 'Coffee'],
  ['.filter-button:nth-child(3)', 'Tea & non-coffee'],
  ['.menu-card:nth-child(1) h3', 'Kopi Kaw'],
  ['.menu-card:nth-child(1) p', 'Bold, creamy, properly Malaysian.'],
  ['.menu-card:nth-child(2) h3', '3 Layer Coffee'],
  ['.menu-card:nth-child(2) p', 'A little drama in every layer.'],
  ['.menu-card:nth-child(3) h3', 'Kopi Jelly'],
  ['.menu-card:nth-child(3) p', 'Chewy, chilled, and easy to love.'],
  ['.menu-card:nth-child(4) h3', 'Tea & coolers'],
  ['.menu-card:nth-child(4) p', 'Peach tea, lemon tea, 3 layer tea & more.'],
  ['.menu-footnote', 'Menu selection may vary by store and event setup.'],
  ['.catering-copy .eyebrow', '<span class="eyebrow-line"></span> ASH GO COFFEE CART'],
  ['.catering-copy h2', 'Let us serve you a little coffee happiness.'],
  ['.catering-copy > p:not(.eyebrow)', 'Bring the truck, bring the cart, bring the good mood. We make it simple to give your guests something cold, creamy, and worth talking about.'],
  ['.catering-tags span:nth-child(1)', 'Weddings'],
  ['.catering-tags span:nth-child(2)', 'Private events'],
  ['.catering-tags span:nth-child(3)', 'Birthday parties'],
  ['.button-light', 'Start an enquiry <span aria-hidden="true">↗</span>'],
  ['.process-intro span', 'HOW IT WORKS'],
  ['.process-intro strong', 'Easy as ordering<br />your favourite cup.'],
  ['.process-step:nth-child(2) strong', 'Tell us your date'],
  ['.process-step:nth-child(2) p', 'Share the occasion, location, and guest count.'],
  ['.process-step:nth-child(3) strong', 'Choose your setup'],
  ['.process-step:nth-child(3) p', 'Pick a coffee cart, truck, or a store-style pop-up.'],
  ['.process-step:nth-child(4) strong', 'We bring the good stuff'],
  ['.process-step:nth-child(4) p', 'Our team shows up ready to pour happy.'],
  ['.locations-copy .eyebrow', '<span class="eyebrow-line"></span> COME SAY HI'],
  ['.locations-copy h2', 'Find us in the wild.'],
  ['.locations-copy > p:not(.eyebrow)', 'Our coffee started on wheels, grew into stores, and still loves a good pop-up. Follow the smell of freshly brewed kopi and look for the green, black, and orange.'],
  ['.location-list > div:nth-child(1) strong', 'Our stores'],
  ['.location-list > div:nth-child(1) small', 'Drop in for your everyday cup.'],
  ['.location-list > div:nth-child(2) strong', 'Mobile truck'],
  ['.location-list > div:nth-child(2) small', 'Made for markets, launches & gatherings.'],
  ['.location-list > div:nth-child(3) strong', 'Coffee cart'],
  ['.location-list > div:nth-child(3) small', 'Our sweetest setup for special days.'],
  ['.location-stamp strong', 'COFFEE'],
  ['.book-copy .eyebrow', '<span class="eyebrow-line"></span> READY WHEN YOU ARE'],
  ['.book-copy h2', 'Have a date in mind?'],
  ['.book-copy > p:not(.eyebrow)', 'Tell us a little about your event and we\'ll get back to you with the best way to bring Ash GO Coffee along.'],
  ['.whatsapp-link', 'WhatsApp us directly <span>↗</span>'],
  ['.form-submit', 'Send enquiry <span aria-hidden="true">↗</span>'],
  ['.footer-nav a:nth-child(1)', 'Menu'],
  ['.footer-nav a:nth-child(2)', 'Our story'],
  ['.footer-nav a:nth-child(3)', 'Catering'],
  ['.footer-nav a:nth-child(4)', 'Locations'],
  ['.footer-contact span', 'Bookings & enquiries'],
  ['.footer-bottom span:nth-child(2)', 'Made for good days.'],
  ['.mobile-sticky-cta', 'Book the coffee cart <span aria-hidden="true">↗</span>'],
]);

const malayCopy = new Map();
languageCopy.forEach((_, selector) => {
  const element = document.querySelector(selector);
  if (element) malayCopy.set(selector, element.innerHTML);
});

function updateFormLanguage(language) {
  const form = document.querySelector('#booking-form');
  const labels = form?.querySelectorAll('label') || [];
  const labelText = language === 'en'
    ? ['Your name', 'Event type', 'Event date', 'Guests']
    : ['Nama anda', 'Jenis acara', 'Tarikh acara', 'Anggaran tetamu'];
  labels.forEach((label, index) => {
    if (label.childNodes[0]) label.childNodes[0].nodeValue = labelText[index];
  });
  const nameInput = form?.querySelector('input[name="name"]');
  const guestsInput = form?.querySelector('input[name="guests"]');
  if (nameInput) nameInput.placeholder = language === 'en' ? 'e.g. Aina' : 'contoh: Aina';
  if (guestsInput) guestsInput.placeholder = language === 'en' ? 'Approx. guest count' : 'Contoh: 100';
  const options = form?.querySelectorAll('select option');
  const optionText = language === 'en'
    ? ['Choose one', 'Wedding', 'Birthday party', 'Private event', 'Corporate / brand event']
    : ['Pilih satu', 'Perkahwinan', 'Majlis hari jadi', 'Acara peribadi', 'Acara korporat / jenama'];
  options?.forEach((option, index) => { option.textContent = optionText[index]; });
}

function applyLanguage(language) {
  currentLanguage = language === 'en' ? 'en' : 'ms';
  languageCopy.forEach((english, selector) => {
    const element = document.querySelector(selector);
    if (element) element.innerHTML = currentLanguage === 'en' ? english : malayCopy.get(selector);
  });
  updateFormLanguage(currentLanguage);
  document.documentElement.lang = currentLanguage;
  document.title = currentLanguage === 'en' ? 'Ash GO Coffee | A little coffee happiness' : 'Ash GO Coffee | Sedikit kegembiraan dalam setiap cawan';
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = currentLanguage === 'en'
    ? 'Ash GO Coffee — coffee, tea, and mobile coffee cart catering for weddings, birthdays, and private events.'
    : 'Ash GO Coffee — kopi, teh, dan katering kereta kopi untuk perkahwinan, hari jadi, dan acara peribadi.';
  document.querySelectorAll('.language-switch button').forEach((button) => {
    button.classList.toggle('active', button.dataset.lang === currentLanguage);
  });
  const switcher = document.querySelector('.language-switch');
  if (switcher) switcher.setAttribute('aria-label', currentLanguage === 'en' ? 'Choose language' : 'Pilih bahasa');
  const menuButton = document.querySelector('.menu-toggle');
  if (menuButton) menuButton.setAttribute('aria-label', currentLanguage === 'en' ? 'Open menu' : 'Buka menu');
  try { localStorage.setItem('ash-go-language', currentLanguage); } catch {}
}

document.querySelectorAll('.language-switch button').forEach((button) => {
  button.addEventListener('click', () => applyLanguage(button.dataset.lang));
});

let savedLanguage = 'ms';
try { savedLanguage = localStorage.getItem('ash-go-language') || 'ms'; } catch {}
applyLanguage(savedLanguage);

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
  const name = data.get('name') || (currentLanguage === 'en' ? 'there' : 'di sini');
  const eventType = data.get('event') || (currentLanguage === 'en' ? 'an event' : 'sebuah acara');
  const date = data.get('date') || (currentLanguage === 'en' ? 'a date to be confirmed' : 'tarikh yang akan disahkan');
  const guests = data.get('guests') || (currentLanguage === 'en' ? 'guest count to be confirmed' : 'jumlah tetamu yang akan disahkan');
  const message = currentLanguage === 'en'
    ? `Hi Ash GO Coffee, I'm ${name}. I'd like to enquire about ${eventType} on ${date} for ${guests} guests.`
    : `Hai Ash GO Coffee, saya ${name}. Saya ingin bertanya tentang ${eventType} pada ${date} untuk ${guests} tetamu.`;
  const whatsappUrl = `https://wa.me/601163377360?text=${encodeURIComponent(message)}`;
  const payload = {
    name: String(name),
    event_type: String(eventType),
    event_date: data.get('date') || null,
    guest_count: data.get('guests') ? Number(data.get('guests')) : null,
    source: 'website',
  };

  if (formStatus) formStatus.textContent = currentLanguage === 'en' ? 'Saving your enquiry…' : 'Menyimpan pertanyaan anda…';
  saveEnquiry(payload)
    .then((saved) => {
      if (saved) {
        if (formStatus) formStatus.textContent = currentLanguage === 'en'
          ? 'Thank you — your enquiry has been received.'
          : 'Terima kasih — pertanyaan anda telah diterima.';
        bookingForm.reset();
      } else {
        if (formStatus) formStatus.textContent = currentLanguage === 'en' ? 'Opening WhatsApp with your enquiry…' : 'Membuka WhatsApp dengan pertanyaan anda…';
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }
    })
    .catch(() => {
      if (formStatus) formStatus.textContent = currentLanguage === 'en'
        ? 'Database unavailable — opening WhatsApp instead…'
        : 'Database belum tersedia — membuka WhatsApp sebagai alternatif…';
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
});
