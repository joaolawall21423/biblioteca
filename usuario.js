const conectar = require('./database')

async function listarUsuarios(){
    try{
        const conexao = await conectar();
        const [rows] = await conexao.execute('SELECT * FROM usuario')
        return rows;
    }catch (error){
    throw new Error (`aconteceu um erro inesperado ao coleta de dados do usuario. \n ${error.message}` )
    }

}

async function inserirUsuario(data) {
    try{
        const {nome, tipoUser, email, telefone} = data;
        const conexao = await conectar();

        const resultado = await conexao.execute
        (`insert into usuario (nome, tipoUser, email, telefone) values (?, ?, ?, ?)`, [nome, tipoUser, email, telefone])
        console.log(resultado.insertId)
    }catch(error){
        throw new Error (`Aconteceu um erro inesperado ao inserir um novo usuario no banco de dados \n ${error.message}`)
    }
    
    
}

async function atualizarUsuario(id, data){
    try{
        const {nome, tipoUser, email, telefone} = data;
        const conexao = await conectar();

        await conexao.execute(`update usuario set nome = ? , tipoUser = ?, email = ?, telefone = ? where idusuario =  ?`, [nome, tipoUser, email, telefone, id])
    } catch (error){
        throw new Error (`Aconteceu um erro inesperado ao atualizar o usuario no banco de dados \n ${id}. \n \n ${error.message}`)
    }
}

async function  excluirusuario(idusuario){
  try{
    const conexao = await conectar();
    await conexao.execute(`delete from usuario where idusuario = ?`, [idusuario])
    return

  } catch (error){
      throw new Error (`Aconteceu um erro inesperado ao excluir o usuario no banco de dados \n ${idusuario}. \n \n ${error.message}`)
    
  }
}

module.exports = {listarUsuarios, inserirUsuario, atualizarUsuario, excluirusuario}