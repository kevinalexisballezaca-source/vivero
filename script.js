// filtra las filas de una tabla con el buscador y el select
function filtrarFilas() {
    const buscar = document.getElementById('buscar');
    const filtro = document.getElementById('filtro');
    if (!buscar || !filtro) return;
    const texto = buscar.value.toLowerCase();
    document.querySelectorAll('.fila').forEach(function (fila) {
        const coincideTexto = fila.dataset.texto.includes(texto);
        const coincideFiltro = filtro.value === 'todos' || fila.dataset.filtro === filtro.value;
        fila.style.display = (coincideTexto && coincideFiltro) ? '' : 'none';
    });
}

// borra una fila despues de confirmar
function borrarFila(boton) {
    if (confirm('¿Seguro que quieres eliminar este registro?')) {
        boton.closest('.fila').remove();
        if (typeof actualizarResumen === 'function') actualizarResumen();
    }
}

// avisa que el formulario todavia no existe
function proximamente(nombre) {
    alert('Aquí irá el formulario para ' + nombre + '.');
}

document.addEventListener('DOMContentLoaded', function () {
    const buscar = document.getElementById('buscar');
    const filtro = document.getElementById('filtro');
    if (buscar) buscar.addEventListener('input', filtrarFilas);
    if (filtro) filtro.addEventListener('change', filtrarFilas);
    if (typeof actualizarResumen === 'function') actualizarResumen();
});

// cambia entre modo claro y oscuro y guarda la eleccion
function actualizarBotonTema() {
    const boton = document.getElementById('tema');
    if (!boton) return;
    const oscuro = document.documentElement.getAttribute('data-bs-theme') === 'dark';
    boton.textContent = oscuro ? '☀️ Claro' : '🌙 Oscuro';
}

document.addEventListener('DOMContentLoaded', function () {
    const boton = document.getElementById('tema');
    if (!boton) return;
    actualizarBotonTema();
    boton.addEventListener('click', function () {
        const nuevo = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-bs-theme', nuevo);
        try { localStorage.setItem('tema', nuevo); } catch (e) {}
        actualizarBotonTema();
    });
});
