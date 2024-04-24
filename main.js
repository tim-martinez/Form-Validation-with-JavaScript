function validateForm() {
  const form = document.querySelector('#createAccount');
  const country = document.querySelector('#country');
  const countryError = document.querySelector('.countryError');
  const email = document.querySelector('#email');
  const emailError = document.querySelector('.emailError');
  const zip = document.querySelector('#zip');
  const zipError = document.querySelector('.zipError');
  const password = document.querySelector('#password');
  const passwordError = document.querySelector('.passwordError');
  const confirmPassword = document.querySelector('#confirmPassword');
  const confirmPasswordError = document.querySelector('.confirmPasswordError');

  let emailStatus = null,
    zipStatus = null,
    countryStatus = null,
    passwordStatus = null,
    confirmPasswordStatus = null;

  function checkEmail() {
    email.addEventListener('blur', () => {
      if (email.validity.typeMismatch) {
        emailError.textContent = 'Enter a valid email address.';
        email.classList.add('invalid');
      } else {
        emailError.textContent = '';
        email.classList.remove('invalid');
        emailStatus = 'valid';
      }
    });
  }

  function checkZip() {
    zip.addEventListener('blur', () => {
      if (!zip.checkValidity()) {
        zipError.textContent = 'Enter a valid Zip Code';
        zip.classList.add('invalid');
      } else {
        zipError.textContent = '';
        zip.classList.remove('invalid');
        zipStatus = 'valid';
      }
    });
  }

  function checkPassword() {
    password.addEventListener('blur', () => {
      if (!password.checkValidity()) {
        passwordError.innerHTML =
          'password must be at least 8 characters</br>and include at least 1 special character';
        password.classList.add('invalid');
      } else {
        passwordError.textContent = '';
        password.classList.remove('invalid');
        passwordStatus = 'valid';
      }
    });
  }

  function checkPasswordMatch() {
    confirmPassword.addEventListener('blur', () => {
      if (password.value !== confirmPassword.value) {
        confirmPasswordError.textContent = 'Passwords do not match.';
        confirmPassword.classList.add('invalid');
      } else {
        confirmPasswordError.textContent = '';
        confirmPassword.classList.remove('invalid');
        confirmPasswordStatus = 'valid';
      }
    });
  }

  function checkCountry() {
    if (country.validity.valueMissing) {
      countryError.textContent = 'Select a country.';
      country.classList.add('invalid');
      country.addEventListener('blur', () => {
        if (country.value) {
          countryError.textContent = '';
          country.classList.remove('invalid');
          countryStatus = 'valid';
        }
      });
    } else {
      countryError.textContent = '';
      country.classList.remove('invalid');
      countryStatus = 'valid';
    }
  }

  function checkAll() {
    if (password.value === '') {
      passwordError.innerHTML =
        'Password must be at least 8 characters</br>and include at least 1 special character';
      password.classList.add('invalid');
    } else {
      checkPassword();
    }

    if (confirmPassword.validity.valueMissing) {
      confirmPasswordError.textContent = 'Confirm password.';
      confirmPassword.classList.add('invalid');
    } else {
      checkPasswordMatch();
    }

    if (zip.validity.valueMissing) {
      zipError.textContent = 'Enter a valid Zip Code';
      zip.classList.add('invalid');
    } else {
      checkZip();
    }

    if (email.validity.valueMissing) {
      emailError.textContent = 'Enter a valid email address.';
      email.classList.add('invalid');
    } else {
      checkEmail();
    }

    checkCountry();

    console.log('emailStatus: ' + emailStatus);
    console.log('ZipStatus: ' + zipStatus);
    console.log('countryStatus: ' + countryStatus);
    console.log('passwordStatus: ' + passwordStatus);
    console.log('confirmPasswordStatus: ' + confirmPasswordStatus);

    if (
      emailStatus === 'valid' &&
      countryStatus === 'valid' &&
      zipStatus === 'valid' &&
      passwordStatus === 'valid' &&
      confirmPasswordStatus === 'valid'
    ) {
      alert('High Five!');
    }
  }

  checkEmail();
  checkZip();
  checkPassword();
  checkPasswordMatch();

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    checkAll();
  });
}

validateForm();
