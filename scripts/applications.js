export let applications;

export function loadFromStorage() {
    applications = JSON.parse(localStorage.getItem('applications'));

    // temporary list to make sure the code works 
    if (!applications) {
        applications = [{
          id: 1,
          companyName: 'Google',
          role: 'Internship',
          status: 'Applied'
        }, {
          id: 2,
          companyName: 'Microsoft',
          role: 'Internship',
          status: 'Interview'
        }, {
          id: 3,
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
  const jobWithId = {
    id: Date.now(), // unique ID
    companyName: newApplication.companyName,
    role: newApplication.role,
    status: newApplication.status
  };

  applications.push(jobWithId);

  saveToStorage();
  
  // to make sure the html element is present on the current page
  location.href = 'index.html'; 
  renderApplications();
}

export function deleteJob(id) {
  const index = applications.findIndex(application => application.id === parseInt(id));
  console.log(index);
  if (index != -1) {
    applications.splice(index, 1);
    saveToStorage();
    renderApplications();
  }
}

export function renderApplications(status, sort) {
  let applicationsHTML = '';

  let filteredApps = (status === 'All') 
    ? applications 
    : applications.filter(app => app.status === status);

  // Sort Logic
  if (sort === 'company-asc') {
    filteredApps.sort((a, b) => a.companyName.localeCompare(b.companyName));
  } else if (sort === 'company-desc') {
    filteredApps.sort((a, b) => b.companyName.localeCompare(a.companyName));
  } else if (sort === 'role-asc') {
    filteredApps.sort((a, b) => a.role.localeCompare(b.role));
  } else if (sort === 'role-desc') {
    filteredApps.sort((a, b) => b.role.localeCompare(a.role));
  }

  // geneating html for all the applications through a forEach loop 
  filteredApps.forEach(application => {

    // checking for the status and filtering it acc to that 
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
          <button class="delete-button" data-id="${application.id}">Delete</button>
        </div>
      </div>
    `;
    
  });

  document.querySelector('.list-applications')
  .innerHTML = applicationsHTML;

  document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', ()=> {
      deleteJob(button.getAttribute('data-id'));
    });
  });

}