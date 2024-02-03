import React ,{useState} from 'react'
function Register(){
    const [email,setName]=useState("")
    const [password,setPassword]=useState("")
    const [passwordrepeat,setPasswordrepeat]=useState("")

    return(
        <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="node_modules/bootstrap/dist/css/bootstrap.min.css"
    />
    <link rel="stylesheet" href="main.css" />
    <link rel="stylesheet" href="css/stylesheet.css" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
    />
    <title>Sign Up</title>
  </head>
  <body>
    //Off-Canvas Menu
    //CHANGE
    <nav data-bs-theme="dark">
      <div
        class="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">InflaGlobe</h5>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item border-bottom">
              <a class="nav-link" href="#">Home</a>
            </li>
            <li class="nav-item border-bottom">
              <a class="nav-link" href="#">Map</a>
            </li>
            <li class="nav-item border-bottom">
              <a class="nav-link" href="#">About</a>
            </li>
            <li class="nav-item border-bottom">
              <a class="nav-link" href="#">Donate</a>
            </li>
            <li class="nav-item border-bottom">
              <a class="nav-link" href="#">Impact</a>
            </li>

            <div class="d-lg-block">
              <br />
              <button type="button" class="btn btn-light">Login</button>
              <button type="button" class="btn btn-light">Sign Up</button>
            </div>
          </ul>
        </div>
      </div>
    </nav>
    <header>
      <nav
        class="navbar navbar-expand-lg fixed-top w-100 py-3"
        data-bs-theme="light"
      >
        <div class="container">
          <a class="navbar-brand" href="#">InflaGlobe</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mx-auto align-items-lg-center ps-5">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="index.html"
                  >Home</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Map</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Donate</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Impact</a>
              </li>
            </ul>
            <div class="d-none d-lg-block">
              <a href="login.html" class="text-decoration-none">
                <button
                  type="button"
                  class="btn btn-darkerblue py-2 px-4 border-0"
                >
                  Login
                </button>
              </a>
              <a href="signup.html">
                <button
                  type="button"
                  class="btn btn-darkerblue py-2 px-4 border-0"
                >
                  Sign Up
                </button>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>

      <div class="vh-100 d-flex align-items-center justify-content-center">
        <div class="container">
          <div class="row g-0 shadow bg-white">
            //Image Column
            <div class="col-lg-8 d-none d-lg-flex">
              <img class="img-fluid" src="images/debttearusapart.jpg" />
            </div>
            //Form Column
            <div class="col-lg-4 p-5">
              <form method="post">
                <h2 class="text-center mb-4">
                  <strong>Create</strong> an account.
                </h2>
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                  />
                  <label for="floatingPassword">Password</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    class="form-control"
                    type="password"
                    name="password-repeat"
                    placeholder="Password (repeat)"
                  />
                  <label for="floatingPassword">Password (Repeat)</label>
                </div>
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="agreeTerms"
                  />
                  <label class="form-check-label" for="agreeTerms"
                    >I agree to the license terms.</label
                  >
                </div>
                <div class="d-grid">
                  <button class="btn btn-darkerblue" type="submit">
                    Sign Up
                  </button>
                </div>
                <p class="text-center mt-3">
                  <a href="#" class="link-offset-1 text-gunmetal"
                    >You already have an account? Login here.</a
                  >
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid footer text-ghost-white">
      <div class="container">
        <footer class="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5">
          <div class="col mb-3">
            <a
              href="/"
              class="d-flex align-items-center mb-3 link-dark text-decoration-none"
            >
            </a>
            <address>
              <p>InflaGlobe &copy; 2024</p>
              <p>
                info@inflaglobe.org<br />
                123 Your Street, Your City, Your Country<br />
                <span class="custom-underline">(65) 90193819</span>
              </p>
            </address>
          </div>

          <div class="col mb-3"></div>
          <div class="col mb-3"></div>

          <div class="col mb-3">
            <h5>Section</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2">
                <a href="#" class="nav-link text-ghost-white p-0">Home</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link text-ghost-white p-0">Features</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link text-ghost-white p-0">Pricing</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link text-ghost-white p-0">FAQs</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link text-ghost-white p-0">About</a>
              </li>
            </ul>
          </div>

          <div class="col mb-3">
            <h5>Social Media</h5>
            <ul class="nav flex-column link-offset-1">
              <li class="nav-item mb-2">
                <a href="#" class="nav-link text-ghost-white p-0">Instagram</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link text-ghost-white p-0">X</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link text-ghost-white p-0">Facebook</a>
              </li>
              <li class="nav-item mb-2">
                <a href="#" class="nav-link text-ghost-white p-0">TikTok</a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script defer src="js/script.js"></script>
  </body>
</html>

   
    )
}

