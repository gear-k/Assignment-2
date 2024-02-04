document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
  
    if (loginForm) {
      loginForm.addEventListener('submit', event => {
        event.preventDefault();
  
        let loginEmail = document.getElementById('loginEmail').value;
        let loginPassword = document.getElementById('loginPassword').value;
        let cnfmPassword = document.getElementById('loginCnfmpassword').value;
  
        if (loginPassword !== cnfmPassword) {
          alert('Password is incorrect');
          return;
        }
  
        // Add your login logic here
        console.log('Login successful!');
        loginForm.reset();
      });
    } else {
      console.error('Login form element not found.');
    }
  });
  