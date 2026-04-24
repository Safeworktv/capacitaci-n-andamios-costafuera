let currentStep = 0; 
let currentWind = Math.floor(Math.random() * 50) + 5;

document.getElementById('wind-val').innerText = `${currentWind} KM/H`;

function allowDrop(ev) { ev.preventDefault(); }
function drag(ev) { ev.dataTransfer.setData("type", ev.target.dataset.pieza); }

function drop(ev) {
    ev.preventDefault();
    const type = ev.dataTransfer.getData("type");
    const container = document.getElementById('scaffold-container');

    if (type === 'base' && currentStep === 0) {
        addPiece(container, 'piece-base', 'HUSILLO INSTALADO');
        currentStep = 1;
        updateStatus("PASO 2: ARRASTRE EL MARCO ESTRUCTURAL.", "BASE NIVELADA.");
    } 
    else if (type === 'marco' && currentStep === 1) {
        addPiece(container, 'piece-frame', 'MARCO VERTICAL');
        currentStep = 2;
        updateStatus("PASO 3: ARRASTRE LA PLATAFORMA.", "ESTRUCTURA POSICIONADA.");
    } 
    else if (type === 'plataforma' && currentStep === 2) {
        addPiece(container, 'piece-deck', 'PLATAFORMA FINALIZADA');
        document.getElementById('btn-inspect').disabled = false;
        updateStatus("MONTAJE COMPLETO. INICIE INSPECCIÓN.", "LISTO PARA CERTIFICAR.");
        showRedTag();
    } 
    else {
        alert("SIGA EL ORDEN: 1. HUSILLO, 2. MARCO, 3. PLATAFORMA");
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
    if(!signer) { alert("INGRESE NOMBRE DEL SUPERVISOR."); return; }
    document.getElementById('card-holder').innerHTML = `<img src="assets/etiqueta_verde.jpg" width="90" style="border: 2px solid #00ff73; border-radius: 5px;">`;
    alert("ANDAMIO CERTIFICADO CON TARJETA VERDE.");
    closeProtocol();
}
