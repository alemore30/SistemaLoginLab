document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const responseMessage = document.getElementById('responseMessage');

    const API_BASE_URL = 'http://localhost:5048';

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const usernameInput = document.getElementById('alexander');
        const passwordInput = document.getElementById('password');

        const requestData = {
            username: usernameInput.value.trim(),
            password: passwordInput.value.trim()
        };

        responseMessage.className = 'message';
        responseMessage.style.display = 'none';

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
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
            responseMessage.textContent = 'Unable to connect to the backend server. Make sure the API is running at http://localhost:5000.';
            responseMessage.className = 'message error';
            console.error('Login request error:', error);
        }
    });
});
