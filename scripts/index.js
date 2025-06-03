import { loadFromStorage, renderApplications } from "./applications.js";

document.querySelector('.js-add-application-button').addEventListener('click', () => {
  location.href = 'form-new-application.html';
});

loadFromStorage();
renderApplications();