/* EQUIRENT
lo realizó: juan antonio cu cauich 
fecha de ultima actualizacion: 28/abril/22
Entrada: se obtienen registros de la BD
Salida: se muestran los registros de la BD en el navegador y tambien se pueden actualizar dichos registros*/ 


//Se importa la conexion a la BD que se realizó en su respectivo archivo (db.js)
const pool = require('../database/db');

//INSERTAR DATOS
exports.save = (req, res) =>{
  //se capturan los datos de los inputs
  const nombre = req.body.nombre;
  const apell = req.body.apell;
  const tel = req.body.tel;
  const direc = req.body.direc;
  const tipo_bano = req.body.tipo_bano;
  const canti = req.body.canti;
  const fecha = new Date();

  //se mandan a guardar los datos capturados en la BD
  pool.query('INSERT INTO clientes_renta SET ?', {Nombre:nombre, apellidos:apell, telefono:tel, direccion_renta:direc, tipo_baño:tipo_bano, cantidad:canti, devolver:fecha, ingreso:fecha}, (error, results) =>{
    if (error) {
      console.log(error);
      res.redirect('/clientes');
    }else{
      //Una vez ingresados los datos, se redirecciona a la pagina de clientes para vizualizar los datos en el navegador
      res.redirect('/clientes');
    }
  })
  //Se le pone la cantidad de dias restantes para entregar
  pool.query('update clientes_renta set devolver = date_add(devolver, interval 15 day)');
  //Se captura la cantidad de baños rentados para restarselos a la tabla de baños disponobles, ya que estaran ocucpados esos baños
  pool.query(`update baños set disponibles = disponibles - ${canti} where tipo_baño = "${tipo_bano}"`);
  //Se agrega esos dias en la tabla
  //pool.query(`update clientes_renta set dia_restantes = timestampdiff(day, ingreso, devolver)`);
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
  pool.query('UPDATE clientes_renta SET ? WHERE id_cliente = ?', [{Nombre:nombre, apellidos:apell, telefono:tel, direccion_renta:direc}, id] , (error, results) => {
    if (error) {
      console.log(error);
      res.redirect('/clientes');
    }else{
      //Una vez actualizado los datos, se redirecciona a la pagina de clientes para vizualizar los datos en el navegador
      res.redirect('/clientes');
    }
  })
 
};
