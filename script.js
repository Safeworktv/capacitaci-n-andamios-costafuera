let vientoActual = 20;

function iniciarJuego() {
    document.getElementById('pantalla-inicio').style.display = 'none';
    document.getElementById('zona-inspeccion').style.display = 'block';
    vientoActual = Math.floor(Math.random() * 50) + 5;
    actualizarClima();
}

function mostrarGlosario() {
    alert("ELEMENTOS CLAVE:\n1. Husillo (Nivelación)\n2. Cruceta (Diagonal)\n3. Charola (Seguro Inferior)\n4. Rodapié (Protección caída objetos)");
}

function actualizarClima() {
    const el = document.getElementById('clima-viento');
    el.innerHTML = vientoActual > 45 ? `🛑 Viento: ${vientoActual} km/hr (¡SUSPENDER!)` : `💨 Viento: ${vientoActual} km/hr (Seguro)`;
    el.style.color = vientoActual > 45 ? "red" : "green";
}

function abrirChecklist() {
    document.getElementById('modal-checklist').style.display = 'block';
}

function cerrarChecklist() {
    document.getElementById('modal-checklist').style.display = 'none';
}

function validarYFinalizar() {
    // 1. Validar Checkboxes
    const ids = ['c1','c2','c3','c4','c5','c6'];
    for(let id of ids) {
        if(!document.getElementById(id).checked) {
            alert("🛑 HALLAZGO: Debe verificar todos los puntos técnicos del andamio.");
            return;
        }
    }

    // 2. Validar Datos de la Tarjeta (Llenado correcto)
    const ubicacion = document.getElementById('t-ubicacion').value.trim();
    const folio = document.getElementById('t-folio').value.trim();
    const fecha = document.getElementById('t-fecha').value;
    const firma = document.getElementById('firma-nombre').value.trim();

    if(ubicacion === "" || folio === "" || fecha === "") {
        alert("⚠️ ERROR DE LLENADO: Complete la Ubicación, Folio y Fecha en el formulario de la tarjeta.");
        return;
    }

    if(vientoActual > 45) {
        alert("🛑 CONDICIÓN INSEGURA: Viento mayor a 45 km/hr. No se autoriza el uso.");
        return;
    }

    if(firma === "") {
        alert("⚠️ FIRMA: Ingrese su nombre para autorizar la Tarjeta Verde.");
        return;
    }

    // 3. Resultado Final
    alert(`✅ EXCELENTE\n\nAndamio en ${ubicacion} con Permiso ${folio} ha sido autorizado por ${firma}.`);
    
    // Cambiar visualmente el slot a la Tarjeta Verde que subiste
    const slot = document.getElementById('slot-etiqueta');
    slot.innerHTML = `<img src="assets/etiqueta_verde.jpg" style="width:100%; height:100%; border-radius:5px; object-fit:cover;">`;
    slot.style.border = "2px solid #007336";
    
    cerrarChecklist();
}
