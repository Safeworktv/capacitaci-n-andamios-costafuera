// --- VARIABLES DE ESTADO ---
let vientoActual = 25; // Simulación inicial de viento en km/hr
let etapaActual = "inicio";

// --- CONTROL DE PANTALLAS ---

function iniciarJuego() {
    document.getElementById('pantalla-inicio').style.display = 'none';
    document.getElementById('zona-inspeccion').style.display = 'block';
    
    // Simular un cambio de viento aleatorio para cada sesión
    vientoActual = Math.floor(Math.random() * (55 - 10 + 1)) + 10;
    actualizarClima();
}

function mostrarGlosario() {
    alert("Módulo de Reconocimiento: \n1. Poste (Estándar)\n2. Larguero\n3. Charola con Seguro\n4. Base Niveladora\n5. Rodapié\n\nPróximamente: Galería interactiva de piezas.");
}

// --- LÓGICA DEL CLIMA (Basado en B31) ---

function actualizarClima() {
    const indicadorViento = document.getElementById('clima-viento');
    if (vientoActual > 45) {
        indicadorViento.innerHTML = `🛑 Viento: ${vientoActual} km/hr (¡PELIGRO!)`;
        indicadorViento.style.color = "red";
    } else {
        indicadorViento.innerHTML = `💨 Viento: ${vientoActual} km/hr (Seguro)`;
        indicadorViento.style.color = "green";
    }
}

// --- CONTROL DEL MODAL (CHECKLIST B31) ---

function abrirChecklist() {
    document.getElementById('modal-checklist').style.display = 'block';
}

function cerrarChecklist() {
    document.getElementById('modal-checklist').style.display = 'none';
}

// --- VALIDACIÓN FINAL Y AUTORIZACIÓN ---

function validarYFinalizar() {
    // 1. Verificar todos los checkboxes de la B31
    const checks = [
        document.getElementById('c1').checked,
        document.getElementById('c2').checked,
        document.getElementById('c3').checked,
        document.getElementById('c4').checked,
        document.getElementById('c5').checked,
        document.getElementById('c6').checked
    ];

    const firma = document.getElementById('firma-nombre').value.trim();

    // 2. Lógica de validación cruzada
    const todosMarcados = checks.every(item => item === true);

    if (!todosMarcados) {
        alert("🛑 ERROR SSPA: No puede autorizar el andamio. Debe verificar y marcar todos los puntos de la Lista B31.");
        return;
    }

    if (vientoActual > 45) {
        alert(`🛑 ACCIÓN PROHIBIDA: Según la B31, no se pueden realizar trabajos si el viento excede los 45 km/hr. (Viento actual: ${vientoActual} km/hr)`);
        return;
    }

    if (firma === "") {
        alert("⚠️ FALTA FIRMA: Debe ingresar el nombre del Supervisor del Trabajo para validar el permiso.");
        return;
    }

    // 3. Éxito de la inspección
    confirmarAutorizacion(firma);
}

function confirmarAutorizacion(nombre) {
    alert(`✅ ¡AUTORIZACIÓN EXITOSA!\n\nSupervisor: ${nombre}\nEl andamio cumple con la normativa B31.\n\nLa Tarjeta Verde ha sido colocada. El personal puede iniciar actividades.`);
    
    // Cambiar visualmente el slot de etiqueta (simulación)
    const slot = document.getElementById('slot-etiqueta');
    slot.innerHTML = `<img src="assets/etiqueta_verde.jpg" style="width:100%; height:100%; border-radius:5px;">`;
    slot.style.borderColor = "#007336";
    
    cerrarChecklist();
}

// --- CIERRE DE SEGURIDAD ---
// Cerrar modal si se hace clic fuera de él
window.onclick = function(event) {
    let modal = document.getElementById('modal-checklist');
    if (event.target == modal) {
        cerrarChecklist();
    }
}
