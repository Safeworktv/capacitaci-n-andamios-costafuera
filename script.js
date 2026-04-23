let step = 0; // 0:Base, 1:Marco, 2:Plataforma
let wind = Math.floor(Math.random() * 55) + 5;
let hasError = false;

// Inicialización de Pantalla
document.getElementById('wind-val').innerText = `${wind} KM/H`;
if(wind > 45) document.getElementById('wind-val').style.color = "#ee2d24";

function allowDrop(ev) { ev.preventDefault(); }
function drag(ev) { ev.dataTransfer.setData("type", ev.target.dataset.pieza); }

function drop(ev) {
    ev.preventDefault();
    const type = ev.dataTransfer.getData("type");
    const log = document.getElementById('log-text');

    if (type === 'base' && step === 0) {
        addPiece('piece-base', 'NIVELACIÓN BASE');
        triggerRandomError("HUSILLO DESNIVELADO");
        step = 1;
        updateGuide("PASO 2: INSTALACIÓN DE MARCO ESTRUCTURAL");
    } 
    else if (type === 'marco' && step === 1 && !hasError) {
        addPiece('piece-frame', 'POSTE VERTICAL');
        triggerRandomError("FALTA PLOMEO EN MARCO");
        step = 2;
        updateGuide("PASO 3: MONTAJE DE PLATAFORMA");
    } 
    else if (type === 'plataforma' && step === 2 && !hasError) {
        addPiece('piece-deck', 'CHAROLA');
        triggerRandomError("SEGURO NO ACCIONADO");
        document.getElementById('btn-inspect').disabled = false;
        updateGuide("MONTAJE FINALIZADO. INICIE PROTOCOLO.");
        showRedTag();
    } 
    else if (hasError) {
        log.innerText = "ACCION RECHAZADA: CORRIJA EL HALLAZGO VISUAL EN EL ANDAMIO.";
        log.style.color = "#ee2d24";
    }
}

function addPiece(className, label) {
    const container = document.getElementById('scaffold-container');
    const div = document.createElement('div');
    div.className = `scaffold-piece ${className}`;
    div.id = `piece-${step}`;
    div.innerHTML = `<span>${label}</span>`;
    
    // Corregir error al hacer clic
    div.onclick = function() {
        if(this.classList.contains('error')) {
            this.classList.remove('error');
            hasError = false;
            document.getElementById('log-text').innerText = "HALLAZGO CORREGIDO SATISFACTORIAMENTE.";
            document.getElementById('log-text').style.color = "#00ff73";
        }
    };
    
    container.prepend(div);
}

function triggerRandomError(msg) {
    if (Math.random() > 0.4) { // 60% probabilidad de error
        setTimeout(() => {
            const last = document.getElementById(`piece-${step-1}`);
            last.classList.add('error');
            hasError = true;
            document.getElementById('log-text').innerText = `ALERTA TÉCNICA: ${msg}`;
            document.getElementById('log-text').style.color = "yellow";
        }, 300);
    }
}

function updateGuide(txt) { document.getElementById('guide-text').innerText = txt; }

function showRedTag() {
    document.getElementById('card-holder').innerHTML = `<img src="assets/etiqueta_roja.jpg" width="90" style="border-radius:10px; border:2px solid red;">`;
}

function openProtocol() { 
    if(hasError) return;
    document.getElementById('modal-protocol').style.display = 'block'; 
}

function closeProtocol() { document.getElementById('modal-protocol').style.display = 'none'; }

function completeProcess() {
    const checks = ['chk1','chk2','chk3','chk4','chk5'];
    const signer = document.getElementById('signer').value;

    if(wind > 45) { alert("OPERACIÓN CANCELADA: VIENTO EXCESIVO."); return; }
    if(!signer) { alert("FIRMA REQUERIDA."); return; }
    
    for(let id of checks) {
        if(!document.getElementById(id).checked) {
            alert("VERIFIQUE TODOS LOS RUBROS DEL PROTOCOLO.");
            return;
        }
    }

    alert(`CERTIFICACIÓN EXITOSA: ${signer}`);
    document.getElementById('card-holder').innerHTML = `<img src="assets/etiqueta_verde.jpg" width="90" style="border-radius:10px; border:2px solid #00ff73;">`;
    closeProtocol();
}
