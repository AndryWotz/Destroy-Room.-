const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const pagination = document.querySelector('.pagination');
const slides = Array.from(document.querySelectorAll('.slide'));
let slideIndex = 0;

// Инициализация пагинации
function createPagination() {
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('pagination-dot');
        dot.addEventListener('click', () => goToSlide(index));
        pagination.appendChild(dot);
    });
}

// Переключение слайдов
function goToSlide(index) {
    slideIndex = index;
    updateSlider();
}

// Обновление слайдера
function updateSlider() {
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === slideIndex);
    });

    document.querySelectorAll('.pagination-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
}

// Обработчики для кнопок текста
document.querySelectorAll('.toggle-text').forEach(button => {
    button.addEventListener('click', (e) => {
        const text = e.target.previousElementSibling;
        text.classList.toggle('expanded');
        e.target.textContent = text.classList.contains('expanded')
            ? 'Скрыть'
            : 'Показать больше';
    });
});

// Инициализация
createPagination();
updateSlider();

prevButton.addEventListener('click', () =>
    goToSlide((slideIndex - 1 + slides.length) % slides.length));
nextButton.addEventListener('click', () =>
    goToSlide((slideIndex + 1) % slides.length));


  

// Показываем кнопку при прокрутке страницы
  window.onscroll = function() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  };

  // Плавная прокрутка при клике
  document.getElementById('scrollTopBtn').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

// Обработчик для дат
document.querySelector('.dates').addEventListener('click', (e) => {
  const target = e.target.closest('.date-item');
  if (!target) return;
  
  document.querySelectorAll('.date-item').forEach(d => d.classList.remove('selected'));
  target.classList.add('selected');
});

// Обработчик для временных слотов
document.querySelector('.time-slots').addEventListener('click', (e) => {
  const target = e.target.closest('.time-slot');
  if (!target) return;
  
  document.querySelectorAll('.time-slot').forEach(t => t.classList.remove('selected'));
  target.classList.add('selected');
});

let currentStartDate = getStartOfWeek(new Date());

function getStartOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Корректировка для понедельника
  return new Date(d.setDate(diff));
}

function formatDate(date) {
  const options = { day: '2-digit', month: '2-digit' };
  const dayOptions = { weekday: 'short' };
  return {
      date: date.toLocaleDateString('ru-RU', options),
      day: date.toLocaleDateString('ru-RU', dayOptions).split(',')[0]
  };
}

function generateWeekDates(startDate) {
  const dates = [];
  for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      dates.push(formatDate(currentDate));
  }
  return dates;
}

function renderDates(dates) {
  const datesContainer = document.querySelector('.dates');
  datesContainer.innerHTML = dates.map(date => `
      <div class="date-item">
          <div>${date.date}</div>
          <div>${date.day}</div>
      </div>
  `).join('');
}

// Инициализация при загрузке
renderDates(generateWeekDates(currentStartDate));

// Обработчики стрелок
document.querySelector('.arrow_left').addEventListener('click', () => {
  currentStartDate.setDate(currentStartDate.getDate() - 7);
  renderDates(generateWeekDates(currentStartDate));
});

document.querySelector('.arrow_right').addEventListener('click', () => {
  currentStartDate.setDate(currentStartDate.getDate() + 7);
  renderDates(generateWeekDates(currentStartDate));
});

// Открытие модального окна бронирования
document.getElementById('open-booking-modal0').addEventListener('click', function() {
  document.getElementById('booking-modal').style.display = 'flex';
});

document.getElementById('open-booking-modal1').addEventListener('click', function() {
  document.getElementById('booking-modal').style.display = 'flex';
});

document.getElementById('open-booking-modal2').addEventListener('click', function() {
  document.getElementById('booking-modal').style.display = 'flex';
});

document.getElementById('open-booking-modal3').addEventListener('click', function() {
  document.getElementById('booking-modal').style.display = 'flex';
});
// Закрытие модального окна бронирования
document.addEventListener('click', function(e) {
  const bookingModal = document.getElementById('booking-modal');
  const isCloseButton = e.target.closest('.close-booking');
  const isOverlay = e.target === bookingModal;

  if (isCloseButton || isOverlay) {
      bookingModal.style.display = 'none';
  }
});

// Закрытие по Esc
document.addEventListener('keydown', function(e) {
  const bookingModal = document.getElementById('booking-modal');
  if (e.key === 'Escape' && bookingModal.style.display === 'flex') {
      bookingModal.style.display = 'none';
  }
});

// Обработчик для кнопки подтверждения
document.querySelector('.confirm-btn').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('booking-modal').style.display = 'none';
  document.getElementById('modal').style.display = 'flex';
});

// Обработка формы
document.getElementById('bookingForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = {
      name: document.querySelector('#bookingForm input[type="text"]').value,
      phone: document.querySelector('#bookingForm input[type="tel"]').value
  };
  
  console.log('Данные формы:', formData);
  e.target.reset();
  alert('Бронирование успешно отправлено!');
});

// Закрытие модального окна бронирования
document.addEventListener('click', function(e) {
  const bookingModal = document.getElementById('modal');
  const isCloseButton = e.target.closest('.close');
  const isOverlay = e.target === bookingModal;

  if (isCloseButton || isOverlay) {
      bookingModal.style.display = 'none';
  }
});

// Закрытие по Esc
document.addEventListener('keydown', function(e) {
  const bookingModal = document.getElementById('modal');
  if (e.key === 'Escape' && bookingModal.style.display === 'flex') {
      bookingModal.style.display = 'none';
  }
});