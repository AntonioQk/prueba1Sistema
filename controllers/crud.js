/* EQUIRENT
lo realizó: juan antonio cu cauich 
fecha de ultima actualizacion: 28/abril/22
Entrada: se obtienen registros de la BD
Salida: se muestran los registros de la BD en el navegador y tambien se pueden actualizar dichos registros*/ 


//Se importa la conexion a la BD que se realizó en su respectivo archivo (db.js)
const pool = require('../database/db');

//funcion para los dias
function dateDiff(d) {
  const dia_entrega = new Date(d);
  const hoy = new Date();
  const difference = dia_entrega.getTime() - hoy.getTime();
  const dias = Math.ceil(difference / (1000 * 3600 * 24));
  return dias;
}

//INSERTAR DATOS
exports.save = (req, res) =>{
  //se capturan los datos de los inputs
  const nombre = req.body.nombre;
  const apell = req.body.apell;
  const tel = req.body.tel;
  const direc = req.body.direc;
  const normal = req.body.normal;
  const vip = req.body.vip;
  //lineas para sumar los 15 dias a la fecha del registro
  const fecha = new Date();
  fecha.setDate(fecha.getDate()+15);
  const diass = dateDiff(fecha);

  //se mandan a guardar los datos capturados en la BD
  pool.query('INSERT INTO clientes_renta SET ?', {Nombre:nombre, apellidos:apell, telefono:tel, direccion_renta:direc, baños_normales:normal, baños_vip:vip, devolver:diass}, (error, results) =>{
    if (error) {
      console.log(error);
      res.redirect('/rentas');
    }else{
      //Una vez ingresados los datos, se redirecciona a la pagina de clientes para vizualizar los datos en el navegador
      res.redirect('/rentas');
    }
  })
  //Se le pone la cantidad de dias restantes para entregar
  //pool.query('update clientes_renta set devolver = date_add(devolver, interval 15 day)');
  //Se captura la cantidad de baños rentados para restarselos a la tabla de baños disponobles, ya que estaran ocucpados esos baños
  pool.query(`update baños set disponibles = disponibles - ${normal} where id_baño = 1`);
  pool.query(`update baños set disponibles = disponibles - ${vip} where id_baño = 2`);
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
      res.redirect('/rentas');
    }else{
      //Una vez actualizado los datos, se redirecciona a la pagina de clientes para vizualizar los datos en el navegador
      res.redirect('/rentas');
    }
  })
 
};

//Insertar nuevo cliente
exports.save_cliente = (req, res) =>{
  //se capturan los datos de los inputs
  const nombre = req.body.nombre;
  const apell = req.body.apell;
  const tel = req.body.tel;
  const curp = req.body.curp;
  const fecha = new Date();
  
  //se mandan a guardar los datos capturados en la BD
  pool.query('INSERT INTO clientes SET ?', {nombre:nombre, apellidos:apell, telefono:tel, curp:curp, dia_registro: fecha}, (error, results) =>{
    if (error) {
      console.log(error);
      res.redirect('/clientes');
    }else{
      //Una vez ingresados los datos, se redirecciona a la pagina de clientes para vizualizar los datos en el navegador
      res.redirect('/clientes');
      
    }
  })

};

//actualizar cliente
exports.update_cliente = (req, res) =>{
  //se capturan los datos que se quieren modificar de los registros
  const id = req.body.id_cliente
  const nombre = req.body.nombre;
  const apell = req.body.apell;
  const tel = req.body.tel;
  const curp = req.body.curp;

    //mandar a guardar el UPDATE de los datos en la BD
  pool.query('UPDATE clientes SET ? WHERE id = ?', [{nombre:nombre, apellidos:apell, telefono:tel, curp:curp}, id] , (error, results) => {
    if (error) {
      console.log(error);
      res.redirect('/clientes');
    }else{
      //Una vez actualizado los datos, se redirecciona a la pagina de clientes para vizualizar los datos en el navegador
      res.redirect('/clientes');
    }
  })
 
};
