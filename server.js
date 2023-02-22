const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const marked = require('marked');
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))

marked.setOptions({
  table: true
});


const configuration = new Configuration({
    apiKey: process.env.API_KEY
  });
const openai = new OpenAIApi(configuration)

const generateCompletion = async (prompt) => {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 200,
    })
    return completion.data.choices[0].text
}

app.get('/',async (req,res) => {
  res.render('index',{result:"",html:""})
})


app.post('/genmd', async (req,res) => {
  const result = await generateCompletion("generate markdown for this: "+req.body.prompt)
  const html = marked.parse(result)
  console.log(result)
  res.render('index',{result:result, html:html})
})

  






const port = process.env.PORT || 3000
app.listen(port, (err) => {
    console.log(`app listening on ${port}!`)
    if (err) throw err
})