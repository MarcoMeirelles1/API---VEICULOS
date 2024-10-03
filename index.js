const express = require('express');
const app = express();

const port = 3001;
let list = [];

app.use(express.json());

app.get('/visualizar', (req, res) => {
    res.send(list);
}); // responsável pela resposta

app.post('/cadastrar', (req, res) => {
    const { nome, idade } = req.body;
    const id = list.length 
    list.push({ nome, idade, id });
    res.send(`Usuário cadastrado: nome = ${nome}, idade = ${idade}`);
});

app.delete('/deletar/:id', (req, res) => {
    const { id } = req.params;
    const index = parseInt(id, 10);
    list.splice(index, 1);
    res.send(`Usuário deletado. Lista atual: ${JSON.stringify(list)}`);
});

app.put('/up/:id', (req, res) => {
   const {id} = req.params
   const {nome,idade} = req.body
   try{
    list[id] = {nome, idade}
    res.send(`Usuario atualizido nome = ${nome} idade = ${idade} id = ${id}`)
   }catch(err){
    res.send(`Usuario não atualizido ${nome}${idade}${id}`)
   }
});

app.listen(port, () => {
    console.log(`Exemplo na porta ${port}`);
}); // inicia o servidor