// Base de Datos de Capacitación y Checks (Puntos críticos de tus Excels)
const modulosMontaje = [
    {
        fase: "1. INSPECCIÓN",
        titulo: "Verificación de Integridad Marina",
        desc: "Revise que husillos y plataformas no tengan daños por corrosión marina. Valide EPP con barbiquejo.",
        // CORRECCIÓN: Nombre de imagen incluyendo la carpeta 'assets/'
        imagen: "assets/paso0_inspeccion.png",
        checks: [
            "Husillos con rosca limpia y lubricada (Ref: Punto 3)",
            "Plataformas sin abolladuras o corrosión (Punto 2)",
            "Ganchos de charolas sin deformación (Punto 1)",
            "Casco con barbiquejo y arnés completo (EPP)"
        ],
        tag: "assets/etiqueta_roja.jpg",
        tagTxt: "ESTADO: MATERIAL EN REVISIÓN"
    },
    {
        fase: "2. CIMIENTOS Y BASES",
        titulo: "Arranque Técnico y Nivelación",
        desc: "Las bases regulables deben asentarse sobre durmientes de madera para distribuir carga sobre la rejilla.",
        imagen: "assets/paso1_bases.png",
        checks: [
            "Apoyo sobre durmientes de madera estable (Punto 1)",
            "Base firme sobre rejilla metálica de cubierta",
            "Nivelación inicial comprobada con nivel",
            "Zona delimitada con barreras físicas"
        ],
        tag: "assets/etiqueta_roja.jpg",
        tagTxt: "ESTADO: EN MONTAJE (NO USAR)"
    },
    {
        fase: "3. ESTRUCTURA Y PROTECCIÓN",
        titulo: "Cuerpos y Protecciones Colectivas",
        desc: "Instale rodapiés de 10cm y barandales a 1m de altura. Asegure crucetas.",
        imagen: "assets/paso2_andamio.png",
        checks: [
            "Baranda superior a 1 metro de altura (Punto 5)",
            "Rodapiés de 10 cm instalados (Punto 4)",
            "Crucetas con pasadores/grapas asegurados",
            "Acceso por escalera interna operativa"
        ],
        tag: "assets/etiqueta_roja.jpg",
        tagTxt: "ESTADO: PENDIENTE DE CERTIFICACIÓN"
    }
];

// Base de Datos de Evaluación Final (Preguntas de Selección Múltiple)
const bancoPreguntas = [
    {
        pregunta: "¿Cuál es la distancia mínima obligatoria que debe mantenerse con líneas eléctricas de más de 300V?",
        opciones: ["1.00 metro", "3.00 metros", "1.50 metros", "2.00 metros"],
        respuestaCorrecta: 1 // Índice de "3.00 metros" (Ref: Check-list Punto 21)
    },
    {
        pregunta: "¿Cuál es la altura mínima obligatoria de los rodapiés para evitar la caída de objetos al mar?",
        opciones: ["5 cm", "8 cm", "10 cm", "15 cm"],
        respuestaCorrecta: 2 // Índice de "10 cm" (Ref: Check-list Punto 4)
    },
    {
        pregunta: "¿Cuál es el periodo máximo permitido para realizar una re-inspección de un andamio certificado?",
        opciones: ["Diariamente", "Cada 3 días", "Semanalmente", "Cada 15 días"],
        respuestaCorrecta: 2 // Índice de "Semanalmente" (Ref: Guía SSPA)
    }
];

let faseActual = 0;
let preguntaEvaluacionActual = 0;

// === FUNCIONES DE MONTAJE (FASE A PASO) ===

function cargarPaso() {
    const modulo = modulosMontaje[faseActual];
    
    // Actualizar Textos e Indicador de Fase
    document.getElementById('current-phase-name').innerText = modulo.fase;
    document.getElementById('step-title').innerText = modulo.titulo;
    document.getElementById('step-desc').innerText = modulo.desc;
    
    // Actualizar Imagen Técnica (Debe coincidir con la estructura de assets)
    document.getElementById('guide-image').src = modulo.imagen;
    
    // Actualizar Etiqueta
    document.getElementById('active-tag').src = modulo.tag;
    document.getElementById('tag-note').innerText = modulo.tagTxt;

    // Cargar Check-list dinámicamente
    const container = document.getElementById('checklist-container');
    container.innerHTML = "";
    modulo.checks.forEach(c => {
        container.innerHTML += `
            <label class="check-row">
                <input type="checkbox">
                <span>${c}</span>
            </label>`;
    });
}

function nextStep() {
    const checks = document.querySelectorAll('#checklist-container input[type="checkbox"]');
    const todosSeleccionados = Array.from(checks).every(c => c.checked);

    if(!todosSeleccionados) {
        alert("🛑 HALLAZGO DE SEGURIDAD: Debe validar todos los puntos críticos del check-list antes de avanzar.");
        return;
    }

    faseActual++;
    if(faseActual < modulosMontaje.length) {
        cargarPaso();
    } else {
        iniciarEvaluacionInteractiva();
    }
}

// === FUNCIONES DE EVALUACIÓN INTERACTIVA (MODERNA) ===

function iniciarEvaluacionInteractiva() {
    // Ocultar sección de checks y botón de validar
    document.getElementById('compliance-section').style.display = 'none';
    
    // Mostrar sección de evaluación
    document.getElementById('evaluation-section').style.display = 'block';
    
    // Cargar la primera pregunta
    cargarPreguntaEvaluacion();
}

function cargarPreguntaEvaluacion() {
    const dataPregunta = bancoPreguntas[preguntaEvaluacionActual];
    
    // Cargar el texto de la pregunta
    document.getElementById('quiz-question-text').innerText = dataPregunta.pregunta;
    
    // Cargar los botones de opciones
    const containerOpciones = document.getElementById('quiz-options-container');
    containerOpciones.innerHTML = "";
    
    dataPregunta.opciones.forEach((opcion, indice) => {
        const boton = document.createElement('button');
        boton.classList.add('quiz-btn');
        boton.innerText = opcion;
        boton.onclick = () => verificarRespuestaInteractiva(indice, boton);
        containerOpciones.appendChild(boton);
    });
}

function verificarRespuestaInteractiva(indiceSeleccionado, botonClickeado) {
    const dataPregunta = bancoPreguntas[preguntaEvaluacionActual];
    const botones = document.querySelectorAll('.quiz-options .quiz-btn');
    
    // Deshabilitar todos los botones para evitar doble clic
    botones.forEach(b => b.disabled = true);

    if (indiceSeleccionado === dataPregunta.respuestaCorrecta) {
        // Respuesta Correcta
        botonClickeado.classList.add('correct');
        botonClickeado.innerText += " ✅";
        
        setTimeout(() => {
            preguntaEvaluacionActual++;
            if (preguntaEvaluacionActual < bancoPreguntas.length) {
                cargarPreguntaEvaluacion();
            } else {
                completarCapacitacionExitosamente();
            }
        }, 1200); // Espera 1.2 segundos para cargar la siguiente

    } else {
        // Respuesta Incorrecta
        botonClickeado.classList.add('incorrect');
        botonClickeado.innerText += " ❌";
        
        setTimeout(() => {
            alert("🛑 EVALUACIÓN REPROBADA: No se puede certificar el andamio. Debe repasar los procedimientos técnicos y re-intentar.");
            location.reload(); // Reiniciar la capacitación
        }, 1000);
    }
}

function completarCapacitacionExitosamente() {
    alert("✅ CAPACITACIÓN COMPLETADA: El personal ha validado el montaje y aprobado la evaluación técnica de certificación SSPA.");
    
    // Mostrar el andamio finalizado
    document.getElementById('guide-image').src = "assets/paso3_finalizado.png";
    document.getElementById('step-title').innerText = "Andamio Certificado y Seguro";
    document.getElementById('step-desc').innerText = "Inspección final realizada. Amarrado a estructura marina cada 3m.";
    
    // Cambiar Tarjeta a Verde
    const tagDisplay = document.getElementById('tag-display');
    tagDisplay.classList.remove('status-roja');
    tagDisplay.classList.add('status-verde');
    document.getElementById('active-tag').src = "assets/etiqueta_verde.jpg";
    document.getElementById('tag-note').innerText = "ESTADO: ANDAMIO SEGURO - TARJETA VERDE";
}

// Iniciar cargando el primer paso al cargar la página
window.onload = cargarPaso;
