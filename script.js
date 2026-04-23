// Validación de Reglas Críticas de la Lista B31
function verificarReglasArmado() {
    const viento = 30; // Simulación de viento en km/hr
    const personasAsignadas = 2; // Requisito B31: Mínimo 2 personas

    if (personasAsignadas < 2) {
        alert("🛑 ERROR B31: El montaje debe realizarse por un mínimo de 2 personas.");
        return false;
    }

    if (viento > 45) {
        alert("🛑 ALERTA CLIMÁTICA: Viento superior a 45 km/hr. Detenga el armado inmediatamente.");
        return false;
    }

    console.log("Condiciones de seguridad iniciales validadas.");
}

// Función para verificar el uso de las charolas
function verificarCharolas() {
    let segurosCerrados = true; // Simulación
    if (!segurosCerrados) {
        alert("⚠️ HALLAZGO: Charolas sin seguro inferior. Riesgo de levantamiento por viento.");
        return false;
    }
}
