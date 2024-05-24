const users = [];

const hashPassword = (password) => {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return hash;
};

document.addEventListener('DOMContentLoaded', () => {
    const registerFormContainer = document.getElementById('registerFormContainer');
    const loginFormContainer = document.getElementById('loginFormContainer');
    const showLoginFormButton = document.getElementById('showLoginForm');
    const showRegisterFormButton = document.getElementById('showRegisterForm');

    if (showLoginFormButton) {
        showLoginFormButton.addEventListener('click', () => {
            registerFormContainer.style.display = 'none';
            loginFormContainer.style.display = 'block';
        });
    }

    if (showRegisterFormButton) {
        showRegisterFormButton.addEventListener('click', () => {
            loginFormContainer.style.display = 'none';
            registerFormContainer.style.display = 'block';
        });
    }

    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('regUsername').value;
            const password = document.getElementById('regPassword').value;
            const hashedPassword = hashPassword(password);

            if (users.some(user => user.username === username)) {
                alert('User already exists!');
            } else {
                users.push({ username, password: hashedPassword });
                alert('Registration successful!');
                registerForm.reset();
                showLoginFormButton.click();
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            const hashedPassword = hashPassword(password);

            const user = users.find(user => user.username === username && user.password === hashedPassword);
            if (user) {
                sessionStorage.setItem('loggedInUser', username);
                window.location.href = 'secured.html';
            } else {
                loginForm.classList.add('shake');
                setTimeout(() => {
                    loginForm.classList.remove('shake');
                    document.getElementById('loginUsername').value = '';
                    document.getElementById('loginPassword').value = '';
                    const userExists = users.find(user => user.username === username);
                    if (!userExists) {
                        alert('User does not exist!');
                    } else {
                        alert('Invalid credentials!');
                    }
                }, 500);
            }
        });
    }

    if (window.location.pathname.endsWith('secured.html')) {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            window.location.href = 'login.html';
        } else {
            document.getElementById('welcomeMessage').textContent = `Welcome, ${loggedInUser}! You have successfully logged in.`;
            const logoutButton = document.getElementById('logoutButton');
            if (logoutButton) {
                logoutButton.addEventListener('click', () => {
                    sessionStorage.removeItem('loggedInUser');
                    window.location.href = 'login.html';
                });
            }
        }
    }
});

document.getElementById('logoutButton').addEventListener('click', function () {
    alert('You have been logged out.');
});
