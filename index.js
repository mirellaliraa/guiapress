const express = require("express");
const app = express(); // define express como app
const bodyParser = require ("body-parser") // importa o body-parser
const connection = require ("./database/database") // importa o banco de dados

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

const Article = require("./articles/Article")
const Category = require("./categories/Category")

// view engine - importa o ejs para interpretar códigos html
app.set("view engine", "ejs");

//static
app.use(express.static('public')); // define a pasta public para arquivos estáticos (css, img, js)

//body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

connection // faz a conexão com banco de dados
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso");
    }).catch((error) => {
        console.log(error);
    })

app.use("/", categoriesController);
app.use("/", articlesController);


app.get("/", (req,res) => {
    res.render("index"); // exibe a mensagem na página web
})

app.listen(4000, () => {
    console.log("O servidor está rodando") // inicia o servidor na porta 4000
})