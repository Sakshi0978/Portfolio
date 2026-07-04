/**
 * SAKSHI KUMARI PORTFOLIO — Contact Form Validation & Submission
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const subjectInput = document.getElementById('form-subject');
  const messageInput = document.getElementById('form-message');
  const successBlock = document.getElementById('form-success');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');

  // Submit Handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset error messages
    clearErrors();

    let isValid = true;

    // 1. Name Validation
    if (!nameInput.value.trim()) {
      showError(nameError, 'Please enter your full name.');
      isValid = false;
    }

    // 2. Email Validation
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue) {
      showError(emailError, 'Please enter your email address.');
      isValid = false;
    } else if (!emailRegex.test(emailValue)) {
      showError(emailError, 'Please enter a valid email address.');
      isValid = false;
    }

    // 3. Subject Validation
    if (!subjectInput.value.trim()) {
      showError(subjectError, 'Please enter a subject.');
      isValid = false;
    }

    // 4. Message Validation
    if (!messageInput.value.trim()) {
      showError(messageError, 'Please enter your message.');
      isValid = false;
    }

    if (isValid) {
      // Disable inputs and button during submission
      const submitBtn = form.querySelector('.form-submit-btn');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span>';

      const data = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim()
      };

      fetch('https://formspree.io/f/xzdlkldj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (response.ok) {
          // Show success alert
          successBlock.classList.add('show');
          
          // Reset form inputs
          form.reset();
          
          // Auto-scroll success alert into view smoothly if on mobile
          successBlock.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

          // Hide success message after 5 seconds
          setTimeout(() => {
            successBlock.classList.remove('show');
          }, 5000);
        } else {
          return response.json().then(data => {
            if (Object.prototype.hasOwnProperty.call(data, 'errors')) {
              alert(data.errors.map(error => error.message).join(", "));
            } else {
              alert("Oops! There was a problem submitting your form.");
            }
          });
        }
      })
      .catch(error => {
        alert("Oops! There was a problem submitting your form. Please try again.");
      })
      .finally(() => {
        // Restore submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      });
    }
  });

  // Clear errors dynamically on input
  nameInput.addEventListener('input', () => clearError(nameError));
  emailInput.addEventListener('input', () => clearError(emailError));
  subjectInput.addEventListener('input', () => clearError(subjectError));
  messageInput.addEventListener('input', () => clearError(messageError));

  function showError(element, message) {
    element.textContent = message;
    element.style.opacity = '1';
  }

  function clearError(element) {
    element.textContent = '';
    element.style.opacity = '0';
  }

  function clearErrors() {
    clearError(nameError);
    clearError(emailError);
    clearError(subjectError);
    clearError(messageError);
  }
}
