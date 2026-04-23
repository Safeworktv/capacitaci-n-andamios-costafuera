let armado = { base: false, marco: false, plataforma: false };
let vientoVal = Math.floor(Math.random() * 55) + 5;

// Inicialización
const vientoBadge = document.getElementById('viento-badge');
vientoBadge.innerText = `💨 Viento: ${vientoVal} km/hr`;
if(vientoVal > 45) {
    vientoBadge.style.background = "#fee2e2";
    vientoBadge.style.color = "#ef4444";
}

function allowDrop(ev) { ev.preventDefault(); }
function drag(ev) { ev.dataTransfer.setData("pieza", ev.target.dataset.pieza); }

function drop(ev) {
    ev.preventDefault();
    let tipo = ev.dataTransfer.getData("pieza");
    
    if (tipo === 'base' && !armado.base) {
        crearPieza('tipo-base', 'Nivelación OK');
        armado.base = true;
    } else if (tipo === 'marco' && armado.base && !armado.marco) {
        crearPieza('tipo-marco', 'Estructura OK');
        armado.marco = true;
    } else if (tipo === 'plataforma' && armado.marco && !armado.plataforma) {
        crearPieza('tipo-plataforma', 'Superficie OK');
        armado.plataforma = true;
        document.getElementById('btn-inspeccion').disabled = false;
        document.getElementById('tarjeta-placeholder').innerHTML = `<img src="assets/etiqueta_roja.jpg" width="80" style="border-radius:8px; box-shadow:0 10px 15px rgba(0,0,0,0.3)">`;
    } else {
        alert("Sigue la secuencia lógica de seguridad: Husillo > Marco > Plataforma");
    }
}

function crearPieza(clase, label) {
    const contenedor = document.getElementById('andamio-visual');
    const div = document.createElement('div');
    div.className = `andamio-pieza ${clase}`;
    div.innerHTML = `<span>${label}</span>`;
    contenedor.appendChild(div);
}

function abrirChecklist() { document.getElementById('modal-checklist').style.display = 'block'; }
function cerrarChecklist() { document.getElementById('modal-checklist').style.display = 'none'; }

function validarYFinalizar() {
    const checks = ['c1','c2','c3','c4','c5'];
    for(let id of checks) {
        if(!document.getElementById(id).checked) {
            alert("🛑 Hallazgo Técnico detectado. Corrige antes de autorizar."); return;
        }
    }
    const firma = document.getElementById('firma-nombre').value.trim();
    if(!firma) { alert("La firma es obligatoria."); return; }
    if(vientoVal > 45) { alert("🛑 Suspendido por ráfagas de viento."); return; }

    alert(`✅ Protocolo Finalizado por: ${firma}`);
    document.getElementById('tarjeta-placeholder').innerHTML = `<img src="assets/etiqueta_verde.jpg" width="80" style="border-radius:8px; box-shadow:0 10px 15px rgba(0,0,0,0.3)">`;
    document.getElementById('etiqueta-status').innerText = "Estado: Seguro (Verde)";
    document.getElementById('etiqueta-status').style.background = "#dcfce7";
    document.getElementById('etiqueta-status').style.color = "#166534";
    cerrarChecklist();
}
