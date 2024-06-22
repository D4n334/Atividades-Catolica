document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (!response.ok) {
            throw new Error('Falha no cadastro');
        }

        const result = await response.json();
        if (result.status === 'Registered') {
            alert('Cadastro realizado com sucesso');
            window.location.href = 'index.html';
        } else {
            alert('Falha no cadastro: ' + result.message);
        }
    } catch (error) {
        console.error('Erro ao fazer cadastro:', error);
        alert('Erro ao fazer cadastro: ' + error.message);
    }
});
