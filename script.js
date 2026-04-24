let currentStep = 0; // 0:Base, 1:Marco, 2:Plataforma
let currentWind = Math.floor(Math.random() * 50) + 5;

document.getElementById('wind-val').innerText = `${currentWind} KM/H`;

function allowDrop(ev) { ev.preventDefault(); }
function drag(ev) { ev.dataTransfer.setData("type", ev.target.dataset.pieza); }

function drop(ev) {
    ev.preventDefault();
    const type = ev.dataTransfer.getData("type");
    const container = document.getElementById('scaffold-container');
    const log = document.getElementById('log-text');

    if (type === 'base' && currentStep === 0) {
        addPiece(container, 'piece-base', 'HUSILLO NIVELADO');
        currentStep = 1;
        updateStatus("PASO 2: ARRASTRE EL MARCO.", "BASE INSTALADA.");
    } 
    else if (type === 'marco' && currentStep === 1) {
        addPiece(container, 'piece-frame', 'MARCO ESTRUCTURAL');
        currentStep = 2;
        updateStatus("PASO 3: ARRASTRE LA PLATAFORMA.", "MARCO POSICIONADO.");
    } 
    else if (type === 'plataforma' && currentStep === 2) {
        addPiece(container, 'piece-deck', 'PLATAFORMA INSTALADA');
        document.getElementById('btn-inspect').disabled = false;
        updateStatus("MONTAJE COMPLETO. INICIE INSPECCIÓN.", "ESTRUCTURA LISTA.");
        showRedTag();
    } 
    else {
        log.innerText = "ERROR: SIGA LA SECUENCIA TÉCNICA (BASE > MARCO > PLATAFORMA).";
        log.style.color = "red";
    }
}

function addPiece(parent, className, label) {
    const div = document.createElement('div');
    div.className = `scaffold-piece ${className}`;
    div.innerHTML = `<span>${label}</span>`;
    parent.appendChild(div);
}

function updateStatus(guide, log) {
    document.getElementById('guide-text').innerText = guide;
    document.getElementById('log-text').innerText = log;
    document.getElementById('log-text').style.color = "#00ff73";
}

function showRedTag() {
    document.getElementById('card-holder').innerHTML = `<img src="assets/etiqueta_roja.jpg" width="90" style="border: 2px solid red; border-radius: 5px;">`;
}

function openProtocol() { document.getElementById('modal-protocol').style.display = 'flex'; }
function closeProtocol() { document.getElementById('modal-protocol').style.display = 'none'; }

function completeProcess() {
    const signer = document.getElementById('signer').value;
    if(!signer) { alert("FIRMA REQUERIDA."); return; }
    alert("CERTIFICACIÓN EXITOSA.");
    document.getElementById('card-holder').innerHTML = `<img src="assets/etiqueta_verde.jpg" width="90" style="border: 2px solid #00ff73; border-radius: 5px;">`;
    closeProtocol();
}
