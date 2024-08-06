document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const nomeUsuario = event.target.nomeUsuario.value;
    const senha = event.target.senha.value;
    
    const response = await fetch('http://localhost:5000/api/autenticacao/entrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nomeUsuario, senha })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = 'dashboard.html';
    } else {
        alert(data.mensagem);
    }
});

document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const nomeUsuario = event.target.nomeUsuario.value;
    const senha = event.target.senha.value;
    const papel = event.target.papel.value;

    const response = await fetch('http://localhost:5000/api/autenticacao/registrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nomeUsuario, senha, papel })
    });

    const data = await response.json();
    if (response.ok) {
        window.location.href = 'login.html';
    } else {
        alert(data.mensagem);
    }
});
