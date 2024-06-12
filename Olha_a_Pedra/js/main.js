document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Simular login (deveria ser uma chamada ao backend)
            if (localStorage.getItem(email) === password) {
                alert('Login bem-sucedido!');
                window.location.href = '../pages/game.html';
            } else {
                alert('Email ou senha incorretos!');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Simular cadastro (deveria ser uma chamada ao backend)
            if (!localStorage.getItem(email)) {
                localStorage.setItem(email, password);
                alert('Cadastro realizado com sucesso!');
                window.location.href = '../pages/index.html';
            } else {
                alert('Email já cadastrado!');
            }
        });
    }
});
