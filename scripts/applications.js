export let applications;

export function loadFromStorage() {
    applications = JSON.parse(localStorage.getItem('applications'));

    // temporary list to make sure the code works 
    if (!applications) {
        applications = [{
          companyName: 'Google',
          role: 'Internship',
          status: 'Applied'
        }, {
          companyName: 'Microsoft',
          role: 'Internship',
          status: 'Interview'
        }, {
          companyName: 'Meta',
          role: 'Internship',
          status: 'Rejected'
        }];
    };
}

function saveToStorage() {
    localStorage.setItem('applications', JSON.stringify(applications));
}

export function addJob(newApplication) {
  // should not throw error for pushing into null
  if (!applications) loadFromStorage();

  // adding the new job got from the form submission
  applications.push(newApplication);

  saveToStorage();
  
  // to make sure the html element is present on the current page
  location.href = 'index.html'; 
  renderApplications();
}

export function renderApplications() {
  let applicationsHTML = '';

  // geneating html for all the applications through a forEach loop 
  applications.forEach(application => {
    applicationsHTML += `
      <div class="application">
        <div class="company-name">
          ${application.companyName}
        </div>
        <div class="role">
          Role: ${application.role}
        </div>
        <div class="status ${application.status}">
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