const express = require ('express')
const favicon = require ('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require ('./src/db/sequelize')

const app = express()
const port = process.env.PORT || 3000

app.use(favicon(__dirname + '/favicon.ico'))
app.use(bodyParser.json())

sequelize.initDb()

app.get('/', (req,res)=>{
    res.json('Hello, heroku')
})

require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonbyPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/destroyPokemon')(app)
require('./src/routes/login')(app)

app.use(({res}) => {
    const message = `impossible de trouver la ressource demandée. Essayer un autre URL.`
    res.status(404).json({message});
})


app.listen(port, () => console.log (`Notre application Node est démarrée sur : http://localhost:${port})`))