import { renderApplications } from "./index.js";

export let applications;

export function loadFromStorage() {
    applications = JSON.parse(localStorage.getItem('applications'));

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
  applications.push({
    companyName: newApplication.companyName,
    role: newApplication.role,
    status: newApplication.status
  });

  saveToStorage();
  renderApplications();
}