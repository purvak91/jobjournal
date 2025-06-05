import { loadFromStorage, renderApplications } from "./applications.js";

document.querySelector('.js-add-application-button').addEventListener('click', () => {
  location.href = 'form-new-application.html';
});

const filter = document.getElementById('filter');

filter.addEventListener('change', ()=> {
  const filter = document.getElementById('filter').value;
  renderApplications(filter);
});

loadFromStorage();
renderApplications('All');