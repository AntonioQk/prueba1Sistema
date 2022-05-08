/* EQUIRENT
lo realizó: juan antonio cu cauich 
fecha de ultima actualizacion: 28/abril/22
Entrada: se obtienen registros de la BD
Salida: se muestran los registros de la BD en el navegador y tambien se pueden actualizar dichos registros*/ 


//Se importa la conexion a la BD que se realizó en su respectivo archivo (db.js)
const conexion = require('../database/db');

//INSERTAR DATOS
exports.save = (req, res) =>{
  //se capturan los datos de los inputs
  const nombre = req.body.nombre;
  const apell = req.body.apell;
  const tel = req.body.tel;
  const direc = req.body.direc;
  const tipo_bano = req.body.tipo_bano;
  const canti = req.body.canti;

  //se mandan a guardar los datos capturados en la BD
  conexion.query('INSERT INTO clientes_renta SET ?', {Nombre:nombre, apellidos:apell, telefono:tel, direccion_renta:direc, tipo_baño:tipo_bano, cantidad:canti}, (error, results) =>{
    if (error) {
      console.log(error);
      res.redirect('/clientes');
    }else{
      //Una vez ingresados los datos, se redirecciona a la pagina de clientes para vizualizar los datos en el navegador
      res.redirect('/clientes');
    }
  })
  //Se captura la cantidad de baños rentados para restarselos a la tabla de baños disponobles, ya que estaran ocucpados esos baños
  conexion.query(`update baños set disponibles = disponibles - ${canti} where tipo_baño = "${tipo_bano}"`);
};

//ACTUALIZAR REGISTROS
exports.update = (req, res) =>{
  //se capturan los datos que se quieren modificar de los registros
  const id = req.body.id_cliente
  const nombre = req.body.nombre;
  const apell = req.body.apell;
  const tel = req.body.tel;
  const direc = req.body.direc;

    //mandar a guardar el UPDATE de los datos en la BD
  conexion.query('UPDATE clientes_renta SET ? WHERE id_cliente = ?', [{Nombre:nombre, apellidos:apell, telefono:tel, direccion_renta:direc}, id] , (error, results) => {
    if (error) {
      console.log(error);
      res.redirect('/clientes');
    }else{
      //Una vez actualizado los datos, se redirecciona a la pagina de clientes para vizualizar los datos en el navegador
      res.redirect('/clientes');
    }
  })
 
};