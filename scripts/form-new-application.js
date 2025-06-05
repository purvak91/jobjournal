import { addJob, loadFromStorage, applications } from "./applications.js";

document.getElementById('job-form').addEventListener('submit', (e) => {
  e.preventDefault(); 

  const application = {
    companyName: document.getElementById('company-name').value,
    role: document.getElementById('role').value,
    status: document.getElementById('status').value
  };

  // check if this was made to edit 
  const storedEdit = localStorage.getItem('editApplication');
  
  if (storedEdit) {

    // get the application stored in local storage
    const jobToEdit = JSON.parse(storedEdit);
    const editId = jobToEdit.id;

    loadFromStorage();

    const index = applications.findIndex(application => application.id === editId);
    
    if (index != -1) {
      applications[index].companyName = application.companyName;
      applications[index].role = application.role;
      applications[index].status = application.status

      localStorage.setItem('applications', JSON.stringify(applications));
    }

    // for a clear start next time to edit another application 
    localStorage.removeItem('editApplication');

    // redirect back to index.html so that it displays all the applications 
    location.href = "index.html";

  }
  
  else addJob(application);
});

window.addEventListener('DOMContentLoaded', () => {
    const storedData = localStorage.getItem('editApplication');

    if (storedData) {
      const job = JSON.parse(storedData); // Convert string back to object

      // prefill your form fields
      document.getElementById('company-name').value = job.companyName;
      document.getElementById('role').value = job.role;
      document.getElementById('status').value = job.status;
    }
  });