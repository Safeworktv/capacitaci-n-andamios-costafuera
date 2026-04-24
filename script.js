let step = 0; 
let wind = Math.floor(Math.random() * 50) + 5;

// Mostrar viento inicial
document.getElementById('wind-val').innerText = `${wind} KM/H`;

function allowDrop(ev) { ev.preventDefault(); }

function drag(ev) { 
    ev.dataTransfer.setData("type", ev.target.dataset.pieza); 
}

function drop(ev) {
    ev.preventDefault();
    const type = ev.dataTransfer.getData("type");
    const log = document.getElementById('log-text');
    const container = document.getElementById('scaffold-container');

    // PASO 1: HUSILLO
    if (type === 'base' && step === 0) {
        addPieceVisual(container, 'piece-base', 'HUSILLO NIVELADO');
        step = 1;
        updateUI("PASO 2: ARRASTRE EL MARCO ESTRUCTURAL.", "BASE INSTALADA. ESPERANDO MARCO...");
    } 
    // PASO 2: MARCO
    else if (type === 'marco' && step === 1) {
        addPieceVisual(container, 'piece-frame', 'ESTRUCTURA VERTICAL');
        step = 2;
        updateUI("PASO 3: ARRASTRE LA PLATAFORMA (CHAROLA).", "MARCO POSICIONADO. ESPERANDO PLATAFORMA...");
    } 
    // PASO 3: PLATAFORMA
    else if (type === 'plataforma' && step === 2) {
        addPieceVisual(container, 'piece-deck', 'PLATAFORMA DE TRABAJO');
        document.getElementById('btn-inspect').disabled = false;
        updateUI("MONTAJE FINALIZADO. INICIE INSPECCIÓN TÉCNICA.", "ESTRUCTURA COMPLETA. LISTA PARA VALIDACIÓN.");
        showRedTag();
    } 
    else {
        log.innerText = "ORDEN INCORRECTO. SIGA LA SECUENCIA TÉCNICA.";
        log.style.color = "#ee2d24";
    }
}

function addPieceVisual(parent, className, label) {
    const div = document.createElement('div');
    div.className = `scaffold-piece ${className}`;
    div.innerHTML = `<span>${label}</span>`;
    parent.appendChild(div);
}

function updateUI(guide, log) {
    document.getElementById('guide-text').innerText = guide;
    const logEl = document.getElementById('log-text');
    logEl.innerText = log;
    logEl.style.color = "#00ff73";
}

function showRedTag() {
    document.getElementById('card-holder').innerHTML = `<img src="assets/etiqueta_roja.jpg" width="100" style="border: 2px solid red; border-radius: 8px;">`;
}
