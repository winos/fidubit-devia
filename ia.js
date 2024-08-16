const axios = require('axios');

const apiKey = ''; // Reemplaza con tu API Key

const openaiClient = axios.create({
    baseURL: 'https://api.openai.com/v1',
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
    },
});

const getResponseFromOpenAI = async (prompt) => {
    try {
        const response = await openaiClient.post('/chat/completions', {
            model: 'gpt-3.5-turbo', // O el modelo que desees utilizar
            messages: [{ role: 'user', content: prompt }],
        });
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error al conectarse a la API de OpenAI:', error);
        return null;
    }
};


const runScript = async () => {
    // Tu lógica del script aquí...
    const prompt = 'Escribe un modelo de Cats';
    const response = await getResponseFromOpenAI(prompt);
    console.log('Respuesta de OpenAI:', response);
};

runScript();

