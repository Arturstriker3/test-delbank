// pix.service.js
const axios = require('axios');

module.exports = {
    newStaticPix,
    payStaticPix
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

async function payStaticPix(payload, baKey) {
    try {
        const options = {
            method: 'POST',
            url: 'https://apisandbox.delbank.com.br/baas/api/v2/pix/qrcode/payment-initialization',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'x-delbank-api-key': baKey
            },
            data: {
                payload: payload
            }
        };

        // Enviar a solicitação para a API do Delbank para inicializar o pagamento do Pix
        const response = await axios.request(options);

        // Log do código de status da resposta da API do Delbank
        console.log('Código de status da resposta da API do Delbank:', response.status);

        // Log dos dados da resposta da API do Delbank
        console.log('Dados da resposta da API do Delbank:', response.data);

        // Verificar se a resposta da API foi bem-sucedida
        if (response.status === 200) {
            return response.data; // Retorna os dados do pagamento do Pix em caso de sucesso
        } else {
            throw new Error(`Erro ao inicializar o pagamento do Pix. Status: ${response.status}`);
        }
    } catch (error) {
        throw new Error(`Erro ao enviar a solicitação para a API do Delbank: ${error.message}`);
    }
}