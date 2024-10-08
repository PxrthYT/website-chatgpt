const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const OpenAI = require('openai');
const messages = []

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use environment variable for API key
});

async function main(input) {
    messages.push({ role: 'user', content: input })
    console.log(messages)
    const completion = await openai.chat.completions.create({
      messages: messages,
      model: 'gpt-3.5-turbo',
    });
  
    // console.log(completion.choices);
    return completion.choices[0]?.message?.content 
  }
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.post('/api', async function (req, res, next) {
    console.log(req.body)
    const mes = await main(req.body.input)
    res.json({success: true, message: mes})
  })
  
  
  app.listen(port, () => {
    console.log("Running...")
    
  })
