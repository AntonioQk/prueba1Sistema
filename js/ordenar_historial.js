
const hce = document.getElementById('HCE');
const hco = document.getElementById('HCO');
const hcg = document.getElementById('HCG');
const hdefecto = document.getElementById('Hdefecto');

//------------------------------------------------
hce.addEventListener('click', () => {
  window.location.href = "/historial/orderTipoCE";
})

hco.addEventListener('click', () => {
  window.location.href = "/historial/orderTipoCO";
})

hcg.addEventListener('click', () => {
  window.location.href = "/historial/orderTipoCG";
})

hdefecto.addEventListener('click', () => {
  window.location.href = "/historial";
})