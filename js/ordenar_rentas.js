const ce = document.getElementById('CE');
const co = document.getElementById('CO');
const cg = document.getElementById('CG');
const defecto = document.getElementById('defecto');

ce.addEventListener('click', () => {
  window.location.href = "/rentas/orderTipoCE";
})

co.addEventListener('click', () => {
  window.location.href = "/rentas/orderTipoCO";
})

cg.addEventListener('click', () => {
  window.location.href = "/rentas/orderTipoCG";
})

defecto.addEventListener('click', () => {
  window.location.href = "/rentas";
})
