document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const responseMessage = document.getElementById('responseMessage');

    // Adjust port to match backend (e.g. 5048 or 5000)
    const API_BASE_URL = 'http://localhost:5048';

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');

        if (!usernameInput || !passwordInput) {
            console.error('Form inputs not found');
            return;
        }

        const requestData = {
            username: usernameInput.value.trim(),
            password: passwordInput.value.trim()
        };

        responseMessage.className = 'message';
        responseMessage.style.display = 'none';

        const baseUrl = API_BASE_URL.replace(/\/$/, '');

        try {
            const response = await fetch(`${baseUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                responseMessage.textContent = `${data.message} Welcome, ${data.username}! Token: ${data.token}`;
                responseMessage.className = 'message success';
            } else {
                responseMessage.textContent = data.message || 'Login failed. Please check your credentials.';
                responseMessage.className = 'message error';
            }
        } catch (error) {
            responseMessage.textContent = `Unable to connect to the backend server at ${baseUrl}. Make sure the API is running.`;
            responseMessage.className = 'message error';
            console.error('Login request error:', error);
        }
    });
});

