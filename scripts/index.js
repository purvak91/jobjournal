import { loadFromStorage, renderApplications } from "./applications.js";

document.querySelector('.js-add-application-button').addEventListener('click', () => {
  location.href = 'form-new-application.html';
});

const statusSelect = document.getElementById('filter');
const sortSelect = document.getElementById('sort-dropdown');

function handleFilterSortChange() {
  const status = statusSelect.value;
  const sort = sortSelect.value;
  renderApplications(status, sort);
}

statusSelect.addEventListener('change', handleFilterSortChange);
sortSelect.addEventListener('change', handleFilterSortChange);

loadFromStorage();
renderApplications('All', 'none');