let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

// Carregar tarefas do localStorage
function carregarTarefas() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tarefas.forEach((tarefa, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${tarefa.concluida ? 'completed' : ''}`;
        
        li.innerHTML = `
            <span class="task-text">${tarefa.texto}</span>
            <button onclick="concluirTarefa(${index})" class="complete-btn">
                ${tarefa.concluida ? '✓' : '○'}
            </button>
            <button onclick="removerTarefa(${index})" class="remove-btn">🗑️</button>
        `;
        
        taskList.appendChild(li);
    });
}

// Adicionar nova tarefa
function adicionarTarefa() {
    const input = document.getElementById('taskInput');
    const texto = input.value.trim();
    
    if (texto === '') {
        alert('Por favor, digite uma tarefa!');
        return;
    }
    
    tarefas.push({
        texto: texto,
        concluida: false
    });
    
    salvarTarefas();
    input.value = '';
    input.focus();
}

// Concluir tarefa
function concluirTarefa(index) {
    tarefas[index].concluida = !tarefas[index].concluida;
    salvarTarefas();
}

// Remover tarefa
function removerTarefa(index) {
    if (confirm('Tem certeza que deseja remover esta tarefa?')) {
        tarefas.splice(index, 1);
        salvarTarefas();
    }
}

// Salvar tarefas no localStorage
function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    carregarTarefas();
}

// Filtrar tarefas
function filtrarTarefas(status) {
    const buttons = document.querySelectorAll('.filters button');
    buttons.forEach(btn => btn.classList.remove('active'));
    const button = document.querySelector(`[onclick*="${status}"]`);
    button.classList.add('active');
    
    const taskList = document.getElementById('taskList');
    const tasks = taskList.getElementsByClassName('task-item');
    
    for (let task of tasks) {
        if (status === 'todas') {
            task.style.display = 'flex';
        } else if (status === 'pendentes' && !task.classList.contains('completed')) {
            task.style.display = 'flex';
        } else if (status === 'concluidas' && task.classList.contains('completed')) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    }
}

// Inicializar a aplicação
document.addEventListener('DOMContentLoaded', () => {
    carregarTarefas();
    const input = document.getElementById('taskInput');
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            adicionarTarefa();
        }
    });
});
