/* EQUIRENT
lo realizó: juan antonio cu cauich 
fecha de ultima actualizacion: 27/abril/22
Entrada: se obtienen los elementos html para poder usarlos
Salida: una accion cuando se oprima un boton*/ 

//esto permite que se cargue primero todo el html antes de usar el javascript
document.addEventListener('DOMContentLoaded', () =>{

  //aqui se obtiene los elementos de html para poder utilizarlos, por ejemplo se identifica el boton de menu para que cuando se oprima haga algo
  const btn_menu2 = document.getElementById('btn_menu');

  const menu2 = document.getElementById('menu2');

  const menu_close = document.getElementById('menu_close');

  const nav2 = document.getElementById('nav2');

  //accion a realizar cuando el btn menu se presione

  btn_menu2.addEventListener('click', () => {
    menu2.style.display = 'block';
    btn_menu2.style.display = 'none';
    menu_close.style.display = 'block';
    nav2.style.width = '200px';
    nav2.style.backgroundColor = 'rgb(204, 204, 204)';
    nav2.style.borderRadius = '10px';
    nav2.style.top = '0';
  })

  //accion a realizar cuando el btn menu_cerrar se presione
  menu_close.addEventListener('click', () => {
    menu2.style.display = 'none';
    btn_menu2.style.display = 'block';
    menu_close.style.display = 'none';
    nav2.style.width = 'auto';
    nav2.style.backgroundColor = '#f2eae1';
    nav2.style.top = '20px';

  })
})