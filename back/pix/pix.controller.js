// pix.controller.js

const express = require('express');
const router = express.Router();
const pixService = require('./pix.service');

// Rota para criar um novo Pix estático
router.post('/newStaticPix', async (req, res, next) => {
    try {
        // Extrair os dados necessários do corpo da requisição
        const { type, correlationId, description, amount, additionalInformation, baKey } = req.body;

        // Log dos dados recebidos
        console.log('Objeto recebido /newStaticPix:', req.body);

        // Verificar se os dados necessários foram fornecidos
        if (!type || !correlationId || !description || !amount || !additionalInformation || !baKey) {
            return res.status(400).json({ message: 'Dados do Pix incompletos' });
        }

        // Chamar o serviço para criar o novo Pix
        const result = await pixService.newStaticPix(req.body);

        // Verificar se a resposta da API foi bem-sucedida
        if (result) {
            console.log('Result Controler:', result)
            // Retornar os dados do Pix para o front-end
            res.status(200).json(result);
        } else {
            res.status(500).json({ message: 'Erro ao processar o Pix' });
        }
    } catch (error) {
        next(error);
    }
});

router.post('/payStaticPix', async (req, res, next) => {
    try {
        // Extrair os dados necessários do corpo da requisição
        const { payload, baKey } = req.body;

        // Log dos dados recebidos
        console.log('Objeto recebido /payStaticPix:', req.body);

        // Verificar se os dados necessários foram fornecidos
        if (!payload || !baKey) {
            return res.status(400).json({ message: 'Dados do Pix incompletos' });
        }

        // Chamar o serviço para pagar o Pix estático
        const result = await pixService.payStaticPix(payload, baKey);

        // Verificar se a resposta da API foi bem-sucedida
        if (result) {
            // Retornar os dados do pagamento para o front-end
            console.log('Paid Pix Controler:', result)
            res.status(200).json(result);
        } else {
            res.status(500).json({ message: 'Erro ao processar o pagamento do Pix' });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;