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

  showAlert('Application added!', 'success');
}

export function deleteJob(id) {
  const index = applications.findIndex(application => application.id === parseInt(id));
  console.log(index);
  if (index != -1) {
    applications.splice(index, 1);
    saveToStorage();
    renderApplications();

    showAlert('Application deleted successfully.', 'danger');
  }
  
}

function editJob(id) {
  const index = applications.findIndex(application => application.id === parseInt(id));
  console.log(index);

  // Save that application’s data to localStorage
  localStorage.setItem('editApplication', JSON.stringify(applications[index]));

  // Navigate to the form page
  location.href = 'form-new-application.html';
}

export function renderApplications(status = 'All', sort = 'none') {
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
      <div class="col-xl-3 col-lg-4 col-md-6 mb-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title">${application.companyName}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${application.role}</h6>
            <span class="badge bg-${getBadgeColor(application.status)}">${application.status}</span>
            <div class="mt-3 d-flex justify-content-between">
              <button class="btn btn-sm btn-outline-primary edit-button" data-id="${application.id}">Edit</button>
              <button class="btn btn-sm btn-outline-danger delete-button" data-id="${application.id}">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
  });

  document.querySelector('.list-applications')
  .innerHTML = applicationsHTML;

  // delete buttons 
  document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', ()=> {
      deleteJob(button.getAttribute('data-id'));
    });
  });

  // edit buttons
  document.querySelectorAll('.edit-button').forEach(button => {
    button.addEventListener('click', ()=> {
      editJob(button.getAttribute('data-id'));
    });
  });

}

function getBadgeColor(status) {
  if (status === 'Applied') return 'secondary';
  if (status === 'Interview') return 'info';
  if (status === 'Rejected') return 'danger';
  return 'primary';
}


function showAlert(message, type = 'success') {
  const alertHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
  document.getElementById('alert-placeholder').innerHTML = alertHTML;

  // Optional: auto-dismiss after 3s
  setTimeout(() => {
    const alert = document.querySelector('.alert');
    if (alert) alert.remove();
  }, 3000);
}
