const menuToggle = document.getElementById('menu-toggle');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !expanded);
  navList.classList.toggle('active');
});
