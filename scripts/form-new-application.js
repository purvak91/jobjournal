import { addJob } from "./applications.js";

document.getElementById('job-form').addEventListener('submit', (e) => {
  e.preventDefault(); 

  const application = {
    companyName: document.getElementById('company-name').value,
    role: document.getElementById('role').value,
    status: document.getElementById('status').value
  };

  addJob(application);
  location.href = 'index.html';
});
