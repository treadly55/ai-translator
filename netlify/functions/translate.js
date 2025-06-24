import OpenAI from 'openai';

export const handler = async function(event, context) {
    // Note the change from exports.handler to export const handler
    
    // Rest of your function remains the same
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }
    
    try {
        const { prompt, selectedLanguage } = JSON.parse(event.body);
        
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
        
        const completion = await openai.chat.completions.create({
            messages: [
                { 
                    role: "system", 
                    content: `You are an expert in ${selectedLanguage}. Translate the given text to the language of your expertise and return back only the translated text and nothing else.`
                },
                { role: "user", content: prompt }
            ],
            model: "gpt-3.5-turbo",
        });
        
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                translation: completion.choices[0].message.content 
            })
        };
        
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};