const express = require('express');
const app = express();

const port = 3005;
let list = [];

app.use(express.json());

app.get('/visualizar', (req, res) => {
    res.send(list);
});

// Esse aqui vai visualizar por id
app.get('/visualizar/:id', (req, res) => {
    const { id } = req.params;
    const verId = list.find(v => v.id == id);
    if (!verId) {
        return res.send('Veículo não encontrado.');
    }
    res.send(verId);
});

// Esse aqui vai visualizar por ano
app.get('/visualizar/ano/:ano', (req, res) => {
    const { ano } = req.params;
    const verAno = list.filter(v => v.ano == ano);
    res.send(verAno);
});

// Esse aqui vai visualizar por cor azul
app.get('/visualizar/cor/azul', (req, res) => {
    const verCor = list.filter(v => v.cor.toLowerCase() === 'azul');
    res.send(verCor);
});

// Esse aqui vai cadastrar
app.post('/cadastrar', (req, res) => {
    const { marca, modelo, ano, proprietario, cor } = req.body;

    if (!marca || !modelo || !ano || !proprietario || !cor) {
        return res.send('Todos os campos são obrigatórios.');
    }

    const id = list.length; 
    list.push({ marca, modelo, ano, proprietario, cor, id });
    
    res.send(`Carro cadastrado:\n marca = ${marca}\n modelo = ${modelo}\n ano = ${ano}\n proprietario = ${proprietario}\n cor = ${cor}`);
});

// Esse aqui vai atualizar, exemplo: o nome era(fiat uno) voce pode mudar e atualizar para (fiat2 uno2)
app.put('/atualizar/:id', (req, res) => {
    const { id } = req.params;
    const { marca, modelo, ano, proprietario, cor } = req.body;

    const index = list.findIndex(v => v.id == id);
    if (index === -1) {
        return res.send('Veículo não encontrado.');
    }

    list[index] = { marca, modelo, ano, proprietario, cor, id: parseInt(id) };
    res.send(`Carro atualizado:\n marca = ${marca}\n modelo = ${modelo}\n ano = ${ano}\n proprietario = ${proprietario}\n cor = ${cor}`);
});

// Esse aqui vai deletar por id
app.delete('/deletar/:id', (req, res) => {
    const { id } = req.params;
    const index = list.findIndex(v => v.id == id);
    if (index === -1) {
        return res.send('Veículo não encontrado.');
    }

    list.splice(index, 1);
    res.send('Veículo deletado com sucesso.');
});

app.listen(port, () => {
    console.log(`Exemplo na porta ${port}`);
}); // inicia o servidor