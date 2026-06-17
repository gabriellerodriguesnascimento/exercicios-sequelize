const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

sequelize.authenticate()
    .then(() => {
        console.log('Conectado ao SQLite com sucesso!');
    })
    .catch(err => {
        console.log('Erro ao conectar:', err);
    });

module.exports = sequelize;

const { DataTypes } = require('sequelize');
const db = require('../db');

const Produto = db.define('Produto', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = Produto;


const { DataTypes } = require('sequelize');
const db = require('../db');

const Usuario = db.define('Usuario', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Usuario;



const express = require('express');
const exphbs = require('express-handlebars');

const db = require('./db');
const Produto = require('./models/Produto');
const Usuario = require('./models/Usuario');

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.sync()
    .then(() => {
        console.log('Banco sincronizado!');
    })
    .catch(err => console.log(err));

/*

EXERCÍCIO 4

*/
app.get('/exercicio4', async (req, res) => {

    await Produto.create({
        nome: 'Notebook',
        preco: 3500
    });

    await Produto.create({
        nome: 'Mouse',
        preco: 80
    });

    await Produto.create({
        nome: 'Teclado',
        preco: 150
    });

    const produtos = await Produto.findAll();

    console.log('LISTA DE PRODUTOS');
    console.log(produtos.map(p => p.toJSON()));

    res.send('Exercício 4 executado. Veja o terminal.');
});

/*

EXERCÍCIO 5

*/
app.get('/exercicio5', async (req, res) => {

    const produto = await Produto.findByPk(1);

    if (produto) {
        console.log('Nome:', produto.nome);
        console.log('Preço:', produto.preco);
    } else {
        console.log('Produto não encontrado.');
    }

    res.send('Exercício 5 executado. Veja o terminal.');
});

/*

EXERCÍCIO 6

*/

app.get('/exercicio6', async (req, res) => {

    const produto = await Produto.findByPk(1);

    if (produto) {
        produto.preco = 5000;
        await produto.save();
        console.log('Produto atualizado!');
        console.log(produto.toJSON());
    }

    res.send('Exercício 6 executado. Veja o terminal.');
});

/*

EXERCÍCIO 7

*/
app.get('/exercicio7', async (req, res) => {

    const produto = await Produto.findByPk(1);

    if (produto) {
        await produto.destroy();
        console.log('Produto removido!');
    }

    const produtos = await Produto.findAll();

    console.log('Produtos restantes:');

    produtos.forEach(produto => {
        console.log(produto.toJSON());
    });

    res.send('Exercício 7 executado. Veja o terminal.');
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});