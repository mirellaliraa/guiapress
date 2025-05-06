const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Articles");
const slugify = require("slugify");

// Rota para listar artigos
router.get("/admin/articles", (req, res) => {
    Article.findAll({
        include: [Category] // Traz a categoria junto com o artigo
    }).then(articles => {
        res.render("admin/articles/index", { articles });
    }).catch(err => {
        console.error("Erro ao buscar artigos:", err);
        res.redirect("/");
    });
});

// Rota para exibir formulário de novo artigo
router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", { categories });
    }).catch(err => {
        console.error("Erro ao carregar categorias:", err);
        res.redirect("/admin/articles");
    });
});

// Rota para salvar novo artigo
router.post("/articles/save", (req, res) => {
    const { title, body, category } = req.body;

    console.log("Dados recebidos:", title, body, category);

    if (title && body && category) {
        Article.create({
            title: title,
            slug: slugify(title),
            body: body,
            categoryId: category
        }).then(() => {
            res.redirect("/admin/articles");
        }).catch(err => {
            console.error("Erro ao salvar artigo:", err);
            res.redirect("/admin/articles/new");
        });
    } else {
        res.redirect("/admin/articles/new");
    }
});

module.exports = router;
