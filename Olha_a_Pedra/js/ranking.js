document.addEventListener('DOMContentLoaded', () => {
    const rankingTable = document.getElementById('rankingTable').getElementsByTagName('tbody')[0];

    // Exemplo de dados (deveria ser uma chamada ao backend)
    const rankings = [
        { posicao: 1, username: 'Jogador1', pontuacao: 1000 },
        { posicao: 2, username: 'Jogador2', pontuacao: 900 },
        { posicao: 3, username: 'Jogador3', pontuacao: 800 }
    ];

    rankings.forEach(ranking => {
        const row = rankingTable.insertRow();
        row.insertCell(0).innerText = ranking.posicao;
        row.insertCell(1).innerText = ranking.username;
        row.insertCell(2).innerText = ranking.pontuacao;

        const deleteCell = row.insertCell(3);
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Deletar';
        deleteButton.addEventListener('click', () => {
            // Simular pagamento e exclusão (deveria ser uma chamada ao backend)
            if (confirm(`Você quer deletar a pontuação de ${ranking.username}?`)) {
                alert(`Pagamento realizado. Pontuação de ${ranking.username} deletada.`);
                rankingTable.deleteRow(row.rowIndex - 1);
            }
        });
        deleteCell.appendChild(deleteButton);
    });
});
