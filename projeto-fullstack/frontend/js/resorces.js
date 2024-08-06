document.getElementById('btnAdicionarRecurso').addEventListener('click', () => {
    const nomeRecurso = prompt('Digite o nome do recurso:');
    if (nomeRecurso) {
        adicionarRecurso(nomeRecurso);
    }
});

async function adicionarRecurso(nome) {
    const response = await fetch('http://localhost:5000/api/recursos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({ nome })
    });

    const data = await response.json();
    if (response.ok) {
        const listaRecursos = document.getElementById('listaRecursos');
        const li = document.createElement('li');
        li.textContent = data.nome;
        listaRecursos.appendChild(li);
    } else {
        alert(data.mensagem);
    }
}

async function buscarRecursos() {
    const response = await fetch('http://localhost:5000/api/recursos', {
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    });

    const data = await response.json();
    if (response.ok) {
        const listaRecursos = document.getElementById('listaRecursos');
        listaRecursos.innerHTML = '';
        data.forEach(recurso => {
            const li = document.createElement('li');
            li.textContent = recurso.nome;
            listaRecursos.appendChild(li);
        });
    } else {
        alert(data.mensagem);
    }
}

buscarRecursos();
