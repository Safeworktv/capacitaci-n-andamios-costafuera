const datos = [
    {
        fase: "1. INSPECCIÓN",
        titulo: "Verificación de Componentes",
        desc: "Revise que husillos y plataformas no tengan daños estructurales.",
        img: "assets/paso0_inspeccion.png",
        checks: ["Roscas limpias", "Ganchos sin deformación", "EPP completo"],
        tag: "assets/etiqueta_roja.jpg"
    },
    {
        fase: "2. CIMIENTOS",
        titulo: "Apoyo en Viguetas",
        desc: "Bases sobre durmientes apoyados en viguetas maestras de la plataforma.",
        img: "assets/paso1_bases.png",
        checks: ["Apoyo en vigueta maestra", "Durmientes nivelados", "Zona delimitada"],
        tag: "assets/etiqueta_roja.jpg"
    },
    {
        fase: "3. PROTECCIÓN",
        titulo: "Barandales y Rodapiés",
        desc: "Instale rodapiés de 10cm y pasamanos a 1m de altura.",
        img: "assets/paso2_andamio.png",
        checks: ["Rodapiés 10cm", "Pasamanos 1m", "Crucetas con seguro"],
        tag: "assets/etiqueta_roja.jpg"
    }
];

const preguntas = [
    {
        p: "¿Distancia mínima a líneas eléctricas?",
        o: ["1.00 metro", "3.00 metros", "5.00 metros"],
        r: 1
    },
    {
        p: "¿Altura obligatoria del rodapié?",
        o: ["5 cm", "10 cm", "15 cm"],
        r: 1
    }
];

let fase = 0;
let pregIdx = 0;

function cargar() {
    const d = datos[fase];
    document.getElementById('current-phase-name').innerText = d.fase;
    document.getElementById('step-title').innerText = d.titulo;
    document.getElementById('step-desc').innerText = d.desc;
    document.getElementById('guide-image').src = d.img;
    document.getElementById('active-tag').src = d.tag;

    const cont = document.getElementById('checklist-container');
    cont.innerHTML = "";
    d.checks.forEach(c => {
        cont.innerHTML += `<label class="check-row"><input type="checkbox"><span>${c}</span></label>`;
    });
}

function nextStep() {
    const checks = document.querySelectorAll('#checklist-container input[type="checkbox"]');
    if (!Array.from(checks).every(c => c.checked)) {
        alert("Faltan puntos por validar.");
        return;
    }
    fase++;
    if (fase < datos.length) cargar();
    else iniciarQuiz();
}

function iniciarQuiz() {
    document.getElementById('compliance-section').style.display = 'none';
    document.getElementById('evaluation-section').style.display = 'block';
    mostrarPregunta();
}

function mostrarPregunta() {
    const q = preguntas[pregIdx];
    document.getElementById('quiz-question-text').innerText = q.p;
    const optCont = document.getElementById('quiz-options-container');
    optCont.innerHTML = "";
    q.o.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-btn';
        btn.innerText = opt;
        btn.onclick = () => validarRespuesta(i, btn);
        optCont.appendChild(btn);
    });
}

function validarRespuesta(idx, btn) {
    if (idx === preguntas[pregIdx].r) {
        btn.classList.add('correct');
        setTimeout(() => {
            pregIdx++;
            if (pregIdx < preguntas.length) mostrarPregunta();
            else finalizar();
        }, 1000);
    } else {
        btn.classList.add('incorrect');
        alert("Incorrecto. Repase la normativa.");
        location.reload();
    }
}

function finalizar() {
    alert("Certificación Exitosa.");
    document.getElementById('guide-image').src = "assets/paso3_finalizado.png";
    document.getElementById('tag-display').classList.add('status-verde');
    document.getElementById('active-tag').src = "assets/etiqueta_verde.jpg";
    document.getElementById('tag-note').innerText = "ANDAMIO SEGURO";
}

window.onload = cargar;
