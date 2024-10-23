// Adiciona um listener que aguarda o carregamento completo do Dom
document.addEventListener('DOMContentLoaded', async () =>{
    // Obtém o token do localStorage
    const token = localStorage.getItem('token');

    // Verifica se não tem token, redirecinando para a página de login
    if(!token) {
        window.location.href = 'login.html'; // redirecinando para a página de login
        return
    }
    // Obtém dados do usuário da API
    const response = await fetch('http://localhost:3000/user', {
        method:'GET',
        headers: {
            'Authorization': `Bearer ${token}` // adiciona o token no cabeçalho de autorização
        }
    })

    // Seleciona os elementos onde as informações serão exibidas
    const userEmailElement = document.getElementById('userEmail')
    const messageElement = document.getElementById('message')

    //Verifica se a resposta da API foi bem-sucedida
    if(respon.ok) {
        //converte a resposta em JSON
        const userData = await response.json()
        userEmailElement.textContent = userData.email // Exibe o email do usuário na página

        // Preenche os campos de entrada com os dados do usuário
        document.getElementById('newEmail').value = userData.email
    }else{
        // Se houver erro ao obter dados do usuário, exibe uma mensagem
        messageElement.textContent = 'Erro ao obter dados do usuário.'
    }
});