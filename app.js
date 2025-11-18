//INCLUI BIBLIOTECA

const express = require('express')
const bp = require('body-parser')
const {listarUsuarios, inserirUsuario, atualizarUsuario, excluirusuario} = require('./usuario')

//PREPARA A EXPRESS
const app = express();

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

//MIDDLEWARES

app.get('/', (req, res) => {
  let body = req.body;
  res.send('Adicionar novo usuário')
})

app.get('/usuario', async (req, res) => {
  try{
  const rows = await listarUsuarios();
  res.status(200).send(`lista de usuarios \n 
      ${JSON.stringify (rows)}`)
  } catch (e){
    res.status(500).json({'error': e.message})
  }
})
 
app.post('/usuario',async (req, res) => {
try{
      let body = req.body
      console.log(body)
      inserirUsuario(body)
      res.status(201).send(`Usuário inserido`)
    } catch (e) {
      res.status(500).json({
      "erro": e.message
        })
    }
})

app.put('/usuario/:idusuario', async (req, res) => {
  try{
    const idusuario = req.params.idusuario
    const body      = req.body

    await atualizarUsuario(idusuario, body);

    res.status(200).send(`{usuario ${idusuario} foi atualizado}` )

  } catch (erro){
    res.status(200).json({"erro": erro.message})
    
  }
})

app.delete('/usuario/:idusuario', async (req, res) => {
  try{
    const idusuario = req.params.idusuario
    await excluirusuario (idusuario);

    res.status(202).send(`{usuario ${idusuario} foi excluído}` )

  } catch (erro){
    res.status(200).json({"erro": erro.message})

  }
})

app.listen(3000)