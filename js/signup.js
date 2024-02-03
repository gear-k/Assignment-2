document.addEventListener('DOMContentLoaded', () => {
  const signup = document.querySelector('form'); // Selects the first form element on the page

  if (signup) {
    signup.addEventListener('submit', event => {
      event.preventDefault();

      
      let email = document.getElementById("floatingInput").value;
      let password = document.getElementById("floatingPassword").value;
      let cnfmpassword = document.getElementById("cnfmpassword").value;


      fetch('https://signup-828c.restdb.io/rest/signup', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "x-apikey": "65be5892c1ff3a2d670fe5a0"
        },
        body: JSON.stringify({email, password, cnfmpassword})
        
      }).then(response =>{
        if (!response.ok) { // Check if response status is not OK
        throw new Error('Error:', error);
        }return response.json()
    })
    .then(data => {
        alert("Sign up Succesful!");
        console.log(data);
        document.getElementById("register-form").reset();
    })
      .catch(error => console.log(error));
      
    });
  } else {
    console.error("Form element not found.");
  }
});
