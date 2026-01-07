  const boton = document.querySelector("button");
  const resultado = document.getElementById("resultado");

  const id1 = document.getElementById("idmb");
  const sp = document.getElementById("sp");
  const fecha = document.getElementById("fecha");
  const importe = document.getElementById("importe");

function esSoloDigitos(texto) {
  return /^\d+$/.test(texto);
}

function validarIdMB(valor) {
  const v = valor.trim();

  if (v === "") return "Falta ID MB.";
  if (!esSoloDigitos(v)) return "ID MB debe contener solo números (sin letras ni espacios).";
  if (v.length < 6 || v.length > 12) return "ID MB debe tener entre 6 y 12 dígitos.";
  return null; // null = OK
}

function validarFechaNoHoyNiFuturo(valorFecha) {
  if (valorFecha === "") return "Falta fecha.";

  // valorFecha viene como "YYYY-MM-DD"
  const fechaIngresada = new Date(valorFecha + "T00:00:00");

  // "hoy" a las 00:00 para comparar solo fechas (no horas)
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  if (fechaIngresada >= hoy) return "La fecha no puede ser hoy ni un día futuro.";
  return null;
}

  boton.addEventListener("click", function () {
  const spTexto = sp.options[sp.selectedIndex].text;
// Limpia estilos previos
resultado.classList.remove("alert-ok", "alert-error");

// Validar ID MB
const errorId = validarIdMB(id1.value);
if (errorId) {
  resultado.classList.add("alert-error");
  resultado.textContent = errorId;
  return;
}

// Validar Fecha
const errorFecha = validarFechaNoHoyNiFuturo(fecha.value);
if (errorFecha) {
  resultado.classList.add("alert-error");
  resultado.textContent = errorFecha;
  return;
}
if (sp.value === "") {
  resultado.classList.add("alert-error");
  resultado.textContent = "Selecciona un Service Provider.";
  return;
}
// Si todo OK
resultado.classList.add("alert-ok");
resultado.textContent =
  "Consulta: " +
  "ID MB= " + id1.value.trim() +
  ", SP= " + spTexto +
  ", Fecha= " + fecha.value +
  ", Importe= " + importe.value +
  ", ESTADO= CONCILIADO / NO CONCILIADO / EN DEVOLUCION";

  });


