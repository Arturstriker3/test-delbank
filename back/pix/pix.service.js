// pix.service.js
const axios = require('axios');

module.exports = {
    newStaticPix
};

async function newStaticPix(requestBody) {
    try {
        // Remover a chave 'baKey' do objeto requestBody e usá-la como cabeçalho
        const { baKey, ...pixData } = requestBody;

        // Configurar o cabeçalho com a chave 'x-delbank-api-key'
        const headers = {
            'Content-Type': 'application/json',
            'x-delbank-api-key': baKey
        };

        // Log do objeto enviado para a API do Delbank e o cabeçalho
        console.log('Objeto enviado para API Delbank:', pixData);
        console.log('Header:', headers);

        // Enviar os dados restantes para a API do Delbank
        const response = await axios.post('https://apisandbox.delbank.com.br/baas/api/v1/charges', pixData, { headers });

        // Log do código de status da resposta da API do Delbank
        console.log('Código de status da resposta da API do Delbank:', response.status);

        // Verificar se a resposta da API foi bem-sucedida
        if (response.status === 200) {
            console.log('Response Service:', response.data)
            return response.data; // Retorna os dados do Pix em caso de sucesso
        } else {
            throw new Error(`Erro ao criar o Pix. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Erro ao enviar a solicitação para a API do Delbank: ${error.message}`);
    }
}