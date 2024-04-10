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

        // Retornar o resultado
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;