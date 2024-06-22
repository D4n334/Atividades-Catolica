document.addEventListener('DOMContentLoaded', async () => {
    try {
        const rankingList = document.getElementById('rankingList');
        console.log('Tentando buscar o ranking...');
        const response = await fetch('/ranking');

        if (!response.ok) {
            console.error('Resposta não OK:', response);
            throw new Error('Erro ao buscar ranking');
        }

        const rankings = await response.json();
        console.log('Ranking recebido:', rankings);

        rankingList.innerHTML = ''; // Limpar a lista antes de adicionar novos itens

        rankings.forEach((entry) => {
            const li = document.createElement('li');
            li.textContent = `${entry.User.username}........................${entry.score}`;
            rankingList.appendChild(li);

            // Adicionando botão para deletar pontuação
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Deletar';
            deleteButton.addEventListener('click', async () => {
                try {
                    const deleteResponse = await fetch('/delete-score', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ user: entry.User.username })
                    });

                    if (!deleteResponse.ok) {
                        throw new Error('Erro ao deletar pontuação');
                    }

                    const deleteResult = await deleteResponse.json();
                    if (deleteResult.status === 'Score deleted') {
                        alert('Pontuação deletada com sucesso');
                        window.location.reload();
                    } else {
                        alert('Falha ao deletar pontuação');
                    }
                } catch (error) {
                    console.error('Erro ao deletar pontuação:', error);
                    alert('Erro ao deletar pontuação: ' + error.message);
                }
            });

            li.appendChild(deleteButton);
        });
    } catch (error) {
        console.error('Erro ao buscar ranking:', error);
        alert('Erro ao buscar ranking: ' + error.message);
    }
});
