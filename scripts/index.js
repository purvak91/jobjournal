import { applications, loadFromStorage } from "./applications.js";

document.querySelector('.js-add-application-button').addEventListener('click', () => {
  location.href = 'form-new-application.html';
});

loadFromStorage();

export function renderApplications() {
  let applicationsHTML = '';

  applications.forEach(application => {
    applicationsHTML += `
      <div class="application">
        <div class="company-name">
          ${application.companyName}
        </div>
        <div class="role">
          Role: ${application.role}
        </div>
        <div class="status ${application.status.toLowerCase()}">
          ${application.status}
        </div>
        <div class="buttons">
          <button class="edit-button">Edit</button>
          <button class="delete-button">Delete</button>
        </div>
      </div>
    `;
  });

  document.querySelector('.list-applications')
  .innerHTML = applicationsHTML;
}

renderApplications();