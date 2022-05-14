/* EQUIRENT
lo realizó: juan antonio cu cauich 
fecha de ultima actualizacion: 28/abril/22
*/ 


//hago uso de express
const express = require('express');
const { query } = require('./database/db');
const router = express.Router();

//utilizo la conexion de mysql que se creo en su respectivo archivo (db.js)




// SE DEFINE LA RUTA PARA LA PAGINA DE LOGIN Y SE DEFINE QUE OPERACION SE REALIZARÁ CUANDO SE ENTRE A ESTA RUTA
router.get('/', (req, res) =>{
  //una vez que se entra a la ruta '/' se renderiza el archivo index.html
  res.render('index.html');
});

//SE DEFINE LA RUTA DE REGISTRO
router.get('/register', (req, res) => {
  //una vez que se entra a la ruta '/register' se renderiza el archivo registro.html
  res.render('registro.html');
})

//Incocamos a bcryptjs, el cual es un modulo que me permite encriptar las contraseñas
const bcrypt = require('bcryptjs');


//CReando la accion del registro
router.post('/register', async(req, res)=> {
  //se obtienen los datos del formulario para crear una cuenta
  const name = req.body.nombre;
  const correo = req.body.correo;
  const pass = req.body.contraseña
  let passwordHash = await bcrypt.hash(pass, 8);
  //una vez que se obtiene los datos se mandan a guardar a la base de datos
  pool.query('INSERT INTO usuarios SET ?', {nombre_completo:name, correo:correo, contraseña:passwordHash}, async(error, results) =>{
    if (error) {
      console.log(error);
    }else{
      res.render('registro.html', {
        alert: true,
        alertTitle: "Registro",
        alertMessage: "Registro realizado exitosamente!!", 
        alertIcon: 'success',
        showConfirmButton: false,
        timer: 2500, 
        ruta: ''
      });
    }
  })
})

// SE DEFINE LA RUTA PARA LA PAGINA DE LOGIN Y SE AUTENTICA AL USUARIO
router.post('/auth', async (req, res) => {
  //se obtienen los datos para iniciar sesion
  const email = req.body.email;
  const contra = req.body.contra;
  //se verifica que el correo y la contraseña existan en la BD
  pool.query('SELECT * FROM usuarios WHERE correo = ?', [email], async (error, results) => {
    if (results.length == 0 || !(await bcrypt.compare(contra, results[0].contraseña))){
      res.render('index.html', {
        alert:true,
        icon: 'error',
        title: 'Correo o contraseña incorrecto!',
        alertMessage: "Vuelve a intentarlo",         
        showConfirmButton: false,
        timer: 2500,
        ruta: ''
      });
    } else{
      req.session.loggedin = true;
      res.render('index.html', {
        alert:true,
        icon: 'success',
        title: 'Bienvenido!!',
        alertMessage: email,         
        showConfirmButton: false,
        timer: 2500,
        ruta: 'rentas'
      });
    } 
    }) 
})

//SE DEFINEN LAS RUTAS PARA LOS CLIENTES, (ingresar, editar y mostrar)
router.get('/clientes', (req, res) => {
  if (req.session.loggedin) {
    pool.query('SELECT * FROM clientes', (error, results) =>{
      if (error) {
        throw error;
      }else{
        res.render('clientes_registrados.html', {results:results}); 
        
      }
    })
    
  }else{
    res.redirect('/');
  }
})

//nuevo cliente
router.get('/nuevo_cliente', (req, res) => {
  if (req.session.loggedin) {
    
   res.render('nuevo_cliente.html');
    
  } else{
    res.redirect('/');
  }
})
//editar cliente
router.get('/editar_cliente/:id', (req, res) => {
  if (req.session.loggedin) {
    const id = req.params.id;
    //una vez que se entra a la ruta EDIT, se utiliza una sentencia query para mostrar datos de la BD en los inputs, para despues realizar la actualizacion de lo que se necesite
    pool.query('SELECT * FROM clientes WHERE id = ?',[id], (error, results) => {
      if (error) {
        throw error;
      }else{
        res.render('editar_cliente.html', {cliente:results[0]}); 
      }
    })
  }else{
    res.redirect('/');
  }
})

// SE DEFINE LA RUTA PARA LA PAGINA DE RENTAS Y SE DEFINE QUE OPERACION SE REALIZARÁ CUANDO SE ENTRE A ESTA RUTA
router.get('/rentas', (req, res) =>{
  if (req.session.loggedin) {
    //una vez que se entra a esta ruta, se utiliza una sentencia query para mostrar datos de la BD
    pool.query('SELECT * FROM clientes_renta', (error, results) =>{
      if (error) {
        throw error;
      }else{
        res.render('Rentas.html', {results:results}); 
      }
    })
  }else{
    res.redirect('/');
  }

})

//ruta de ingreso
router.get('/ingreso', (req, res) => {
  if (req.session.loggedin) {
    res.render('ingresar.html');
  }else{
    res.redirect('/');
  }
})
  

// SE DEFINE LA RUTA PARA LA PAGINA DE eliminar un registro Y SE DEFINE QUE OPERACION SE REALIZARÁ CUANDO SE ENTRE A ESTA RUTA
router.get('/delete/:id_cliente', (req, res)=>{
  if (req.session.loggedin) {
      //se obitiene el id del registro que se quiere eliminar
    const id = req.params.id_cliente;
    //Se realiza la actualizacion en los baños disponibles, ya que se va a elimar este registro deja disponibles los baños que rentó, por lo tanto se suman otra vez estos baños a los disponibles
    pool.query(`update baños inner join clientes_renta on baños.tipo_baño = "normal"
  set baños.disponibles = baños.disponibles + clientes_renta.baños_normales where clientes_renta.id_cliente = ${id}`);
    pool.query(`update baños inner join clientes_renta on baños.tipo_baño = "vip"
  set baños.disponibles = baños.disponibles + clientes_renta.baños_vip where clientes_renta.id_cliente = ${id}`);
  //Se elimina el registro seleccionado
      pool.query('DELETE FROM clientes_renta WHERE id_cliente = ?', [id], (error, results) => {
        if (error) {
          throw error;
        }else{
          res.redirect('/rentas');
        }
      })
  }else{
    res.redirect('/');
  }
    

})


// SE DEFINE LA RUTA PARA EDITAR REGISTROS Y SE DEFINE QUE OPERACION SE REALIZARÁ CUANDO SE ENTRE A ESTA RUTA
router.get('/edit/:id_cliente', (req, res) =>{
  if (req.session.loggedin) {
    const id = req.params.id_cliente;
    //una vez que se entra a la ruta EDIT, se utiliza una sentencia query para mostrar datos de la BD en los inputs, para despues realizar la actualizacion de lo que se necesite
    pool.query('SELECT * FROM clientes_renta WHERE id_cliente = ?',[id], (error, results) => {
      if (error) {
        throw error;
      }else{
        res.render('edit.html', {cliente:results[0]}); 
      }
    })
  }else{
    res.redirect('/');
  }
})



//se utiliza las acciones de guardar y actualizar datos, los cuales se definieron arriba de este archivo, ya que antes solo se crearon y no se utiliza, para que funcionen se tiene que hacer estas siguientes lineas
const crud = require('./controllers/crud');
const pool = require('./database/db');
router.post('/save', crud.save);
router.post('/update', crud.update);
router.post('/nuevo_cliente', crud.save_cliente);
router.post('/update_cliente', crud.update_cliente);


// SE DEFINE LA RUTA PARA LA PAGINA DE BAÑOS Y SE DEFINE QUE OPERACION SE REALIZARÁ CUANDO SE ENTRE A ESTA RUTA
router.get('/banos', (req, res) =>{
  if (req.session.loggedin) {
    pool.query('select tipo_baño, disponibles from baños;', (error, results) => {
    if (error) {
      throw error;
    }else{
      //Una vez que se entre a esta ruta de '/banos', se renderiza el archivo BañosDisponibles.html
      res.render('BañosDisponibles.html', {results:results})
    }
    })
  }else{
    res.redirect('/');
  }
  
})

//RUTA PARA CERRAR SESION
router.get('/logout', (req, res) => {
  //Se destruye la sesion para cerrarla
  req.session.destroy( () => {
    //una vez cerrada la sesion se redirecciona a la pagina raiz, que en este case el login
    res.redirect('/');
  })
})

//Se exportan estas rutas creadas para poder utilizarlas en donde se necesite
module.exports = router;

