const pasos = [
    {
        fase: "1. INSPECCIÓN",
        titulo: "Verificación de Componentes",
        desc: "Revise que husillos y plataformas no tengan daños estructurales antes de iniciar la maniobra en cubierta.",
        img: "paso0_inspeccion.png",
        checks: ["Roscas de husillos limpias", "Ganchos de charolas sin deformación", "EPP: Arnés y casco con barbiquejo"],
        tag: "etiqueta_roja.jpg"
    },
    {
        fase: "2. CIMENTACIÓN",
        titulo: "Soporte sobre Viguetas Maestras",
        desc: "Las bases deben asentarse sobre durmientes de madera colocados directamente en las viguetas maestras de la plataforma.",
        img: "paso1_bases.png",
        checks: ["Apoyo directo en viguetas maestras", "Uso de durmientes de madera estable", "Nivelación inicial comprobada"],
        tag: "etiqueta_roja.jpg"
    },
    {
        fase: "3. MONTAJE",
        titulo: "Protecciones y Estructura",
        desc: "Instale rodapiés de 10cm y pasamanos a 1 metro. Verifique que todas las crucetas tengan sus seguros.",
        img: "paso2_andamio.png",
        checks: ["Rodapiés de 10cm instalados", "Pasamanos a 1m de altura", "Crucetas con seguros activos"],
        tag: "etiqueta_roja.jpg"
    }
];

let indiceActual = 0;

function cargarPaso() {
    const p = pasos[indiceActual];
    document.getElementById('phase-badge').innerText = p.fase;
    document.getElementById('step-title').innerText = p.titulo;
    document.getElementById('step-desc').innerText = p.desc;
    document.getElementById('main-image').src = `assets/${p.img}`;
    document.getElementById('current-tag').src = `assets/${p.tag}`;

    const list = document.getElementById('check-list');
    list.innerHTML = "";
    p.checks.forEach(c => {
        list.innerHTML += `<label class="check-item"><input type="checkbox"> <span>${c}</span></label>`;
    });
}

function validarPaso() {
    const checks = document.querySelectorAll('#check-list input[type="checkbox"]');
    const todos = Array.from(checks).every(c => c.checked);

    if (!todos) {
        alert("🛑 HALLAZGO SSPA: Debe validar todos los puntos de seguridad antes de continuar.");
        return;
    }

    indiceActual++;
    if (indiceActual < pasos.length) {
        cargarPaso();
    } else {
        iniciarExamenFinal();
    }
}

function iniciarExamenFinal() {
    alert("📝 INICIANDO EVALUACIÓN DE CERTIFICACIÓN");
    const r1 = prompt("¿Cuál es la distancia mínima a líneas eléctricas? \n A) 1m \n B) 3m \n C) 5m");
    
    if (r1.toLowerCase() === 'b' || r1 === '3m') {
        alert("✅ CERTIFICACIÓN EXITOSA. El andamio cuenta con Tarjeta Verde.");
        document.getElementById('main-image').src = "assets/paso3_finalizado.png";
        document.getElementById('current-tag').src = "assets/etiqueta_verde.jpg";
        document.getElementById('tag-text').innerText = "SEGURO PARA USO";
        document.getElementById('tag-text').style.color = "#007336";
    } else {
        alert("❌ EXAMEN REPROBADO. Repase la distancia de seguridad normativa.");
        location.reload();
    }
}

window.onload = cargarPaso;
