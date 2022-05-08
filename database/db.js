/* EQUIRENT
lo realizó: juan antonio cu cauich 
fecha de ultima actualizacion: /abril/22
Entrada: datos para conectar a la BD
Salida: una conexion para poder usarlo en diferentes acciones*/ 

//utilizo el modulo de mysql para poder realizar una conexion a la base de datos
const mysql2 = require('mysql2');

//creo una conexion a mysql con sus respectivos datos
const conexion = mysql2.createConnection({
  host: 'bedrctcnz48xlyvc03ro-mysql.services.clever-cloud.com',
  user: 'ugkkerzofhfn8atd',
  password: 'Whqmsfa0Va8PjUMckulf',
  database: 'bedrctcnz48xlyvc03ro',
  port: 3306
});


//se verifica si la conexion se realiza correctamente o si hay algun error
conexion.connect((error) =>{
  if (error) {
    console.error('El error de conexion es:'+ error);
    return
  }

  console.log('CONEXION A LA BD EXITOSA');
});


//la conexion creada se exporta para poder se utilizada en otras operaciones
module.exports = conexion;

