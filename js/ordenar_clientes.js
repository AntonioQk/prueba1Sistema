
const Cce = document.getElementById('CCE');
const Cco = document.getElementById('CCO');
const Ccg = document.getElementById('CCG');
const Cdefecto = document.getElementById('Cdefecto');

//------------------------------------------------
Cce.addEventListener('click', () => {
  window.location.href = "/clientes/orderTipoCE";
})

Cco.addEventListener('click', () => {
  window.location.href = "/clientes/orderTipoCO";
})

Ccg.addEventListener('click', () => {
  window.location.href = "/clientes/orderTipoCG";
})

Cdefecto.addEventListener('click', () => {
  window.location.href = "/clientes";
})