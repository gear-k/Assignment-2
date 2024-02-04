document.getElementById("login-form").addEventListener("submit", function(event){
    event.preventDefault(); // Prevent the default form submission

    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    // API key for restdb
    var apiKey = '65be5892c1ff3a2d670fe5a0';

    // RESTdb API endpoint for user data
    var apiUrl = 'https://signup-828c.restdb.io/rest/signup?q={"email":"' + encodeURIComponent(email) + '"}';

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': apiKey
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("Response Data: ", data); // Debugging: Log the response data

        if (data.length > 0) {
            // Email found, now check password and cnfmpassword
            if (data[0].password === password && data[0].cnfmpassword === password) {
                alert("Login Successful");
                // Redirect or other actions
            } else {
                alert("Login Failed: Incorrect password");
            }
        } else {
            // Email not found in the database
            alert("Email not found");
        }
    })
    .catch(error => {
        console.error('Error during fetch:', error);
    });
});
