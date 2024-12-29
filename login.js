document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');
    const signUpForm = document.querySelector('.sign-up form');
    const signInForm = document.querySelector('.sign-in form');

    // Function to switch between sign-up and sign-in forms
    const switchForms = (e, isRegister) => {
        e.preventDefault();
        if (isRegister) {
            container.classList.add("active");
            setTimeout(() => {
                registerBtn.style.display = "none";
                loginBtn.style.display = "block";
            }, 300);
        } else {
            container.classList.remove("active");
            setTimeout(() => {
                loginBtn.style.display = "none";
                registerBtn.style.display = "block";
            }, 300);
        }
    };

    registerBtn.addEventListener('click', (e) => switchForms(e, true));
    loginBtn.addEventListener('click', (e) => switchForms(e, false));

    // Function to validate email
    const isValidEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    // Function to validate password (at least 8 characters, 1 uppercase, 1 lowercase, 1 number)
    const isValidPassword = (password) => {
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(password);
    };

    // Function to handle form submission
    const handleSubmit = (e, formType) => {
        e.preventDefault();
        const form = e.target;
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!isValidPassword(password)) {
            alert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.');
            return;
        }

        // If all validations pass, you can proceed with form submission
        console.log(`${formType} successful:`, { email, password });
        // Here you would typically send the data to your server
        alert(`${formType} successful! Check the console for details.`);
        form.reset();
    };

    signUpForm.addEventListener('submit', (e) => handleSubmit(e, 'Sign Up'));
    signInForm.addEventListener('submit', (e) => handleSubmit(e, 'Sign In'));

    // Social media icon click handler
    const socialIcons = document.querySelectorAll('.social-icons a');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = e.currentTarget.querySelector('i').className.split('-')[2];
            console.log(`${platform} login clicked`);
            // Here you would implement the social media login logic
        });
    });

    // Password visibility toggle
    const togglePasswordVisibility = (inputField, icon) => {
        if (inputField.type === 'password') {
            inputField.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            inputField.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    };

    // Add password visibility toggle to all password fields
    document.querySelectorAll('input[type="password"]').forEach(passwordField => {
        const toggleIcon = document.createElement('i');
        toggleIcon.classList.add('fas', 'fa-eye', 'password-toggle');
        passwordField.parentNode.appendChild(toggleIcon);
        
        toggleIcon.addEventListener('click', () => togglePasswordVisibility(passwordField, toggleIcon));
    });
});