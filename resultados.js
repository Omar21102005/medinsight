document.addEventListener('DOMContentLoaded', () => {
    // Obtener los datos de la solicitud
    const nombre = localStorage.getItem('nombre');
    const apellidos = localStorage.getItem('apellidos');
    const dni = localStorage.getItem('dni');
    const fechaNacimiento = localStorage.getItem('fecha-nacimiento');

    // Mostrar los datos personales
    document.getElementById('nombre').textContent = nombre || 'No disponible';
    document.getElementById('apellidos').textContent = apellidos || 'No disponible';
    document.getElementById('dni').textContent = dni || 'No disponible';
    document.getElementById('fecha-nacimiento').textContent = fechaNacimiento || 'No disponible';

    // Obtener los síntomas seleccionados
    const sintomas = JSON.parse(localStorage.getItem('sintomas')) || [];

    // Mostrar los síntomas seleccionados
    const sintomasList = document.getElementById('sintomas-list');
    if (sintomas.length > 0) {
        sintomas.forEach(sintoma => {
            const li = document.createElement('li');
            li.textContent = sintoma;
            sintomasList.appendChild(li);
        });
    } else {
        sintomasList.innerHTML = '<li>No se seleccionaron síntomas.</li>';
    }

    // Predicción de enfermedad
    const enfermedades = getEnfermedades();
    const predicciones = hacerPrediccion(sintomas, enfermedades);
    mostrarPredicciones(predicciones);
});

// Función para obtener la base de datos de enfermedades y sus síntomas
function getEnfermedades() {
    return [
        { nombre: 'Gripe', sintomas: ['tos', 'fiebre', 'dolor de garganta', 'dolor muscular'] },
        { nombre: 'COVID-19', sintomas: ['tos', 'fiebre', 'dificultad para respirar', 'cansancio'] },
        { nombre: 'Resfriado común', sintomas: ['tos', 'dolor de garganta', 'mucosidad', 'congestión nasal'] },
        { nombre: 'Neumonía', sintomas: ['tos', 'fiebre', 'dificultad para respirar', 'dolor de pecho'] },
        { nombre: 'Asma', sintomas: ['dificultad para respirar', 'tos', 'sibilancias', 'opresión en el pecho'] },
        { nombre: 'Bronquitis', sintomas: ['tos', 'fiebre', 'dolor de garganta', 'mucosidad'] },
        { nombre: 'Intoxicación alimentaria', sintomas: ['náuseas', 'vómito', 'dolor abdominal', 'diarrea'] },
        { nombre: 'Apendicitis', sintomas: ['dolor abdominal', 'fiebre', 'náuseas', 'vómito'] },
        { nombre: 'Gastritis', sintomas: ['dolor abdominal', 'náuseas', 'pérdida de apetito', 'acidez estomacal'] },
        { nombre: 'Diabetes', sintomas: ['cansancio', 'sed excesiva', 'orina frecuente', 'perdida de peso'] },
        { nombre: 'Migraña', sintomas: ['dolor de cabeza', 'náuseas', 'sensibilidad a la luz', 'mareo'] },
        { nombre: 'Viral gastroenteritis', sintomas: ['diarrea', 'náuseas', 'vómito', 'dolor abdominal'] },
        { nombre: 'Otitis media', sintomas: ['dolor de oído', 'fiebre', 'irritabilidad', 'dificultad para dormir'] },
        { nombre: 'Insuficiencia cardíaca', sintomas: ['dificultad para respirar', 'cansancio', 'hinchazón en las piernas', 'mareo'] },
        { nombre: 'Hipertensión', sintomas: ['dolor de cabeza', 'mareo', 'dificultad para respirar', 'fatiga'] },
        { nombre: 'Sinusitis', sintomas: ['dolor de cabeza', 'congestión nasal', 'dolor facial', 'secreción nasal'] },
        { nombre: 'Enfermedad de Lyme', sintomas: ['erupción en la piel', 'fiebre', 'dolor muscular', 'dolor de cabeza'] },
        { nombre: 'Cáncer de colon', sintomas: ['dolor abdominal', 'cansancio', 'pérdida de apetito', 'cambio en los hábitos intestinales'] },
        { nombre: 'Gripe estomacal', sintomas: ['náuseas', 'vómito', 'dolor abdominal', 'diarrea'] },
        { nombre: 'Hepatitis', sintomas: ['fiebre', 'dolor abdominal', 'ictericia', 'náuseas'] },
        { nombre: 'Tuberculosis', sintomas: ['tos', 'fiebre', 'sudores nocturnos', 'pérdida de peso'] },
        { nombre: 'Hemorroides', sintomas: ['dolor abdominal', 'sangrado rectal', 'picazón', 'inflamación'] },
        // Agregar más enfermedades si es necesario
    ];
}

// Función para hacer una predicción más precisa de acuerdo a los síntomas seleccionados
function hacerPrediccion(sintomas, enfermedades) {
    // Si se seleccionan síntomas, calculamos la coincidencia exacta
    return enfermedades.map(enfermedad => {
        const sintomasCoincidentes = enfermedad.sintomas.filter(sintoma => sintomas.includes(sintoma));
        
        // Si la enfermedad tiene todos los síntomas seleccionados, la marcamos como 100% coincidente
        const coincidenciasExactas = sintomasCoincidentes.length === sintomas.length;

        return {
            nombre: enfermedad.nombre,
            sintomasCoincidentes,
            coincidenciasExactas,
            totalCoincidencias: sintomasCoincidentes.length,
        };
    })
    // Filtramos solo las que tienen una coincidencia exacta o las que tienen más coincidencias
    .filter(enfermedad => enfermedad.coincidenciasExactas || enfermedad.totalCoincidencias > 1)
    // Ordenamos primero por coincidencias exactas y luego por la cantidad total de coincidencias
    .sort((a, b) => {
        if (b.coincidenciasExactas === a.coincidenciasExactas) {
            return b.totalCoincidencias - a.totalCoincidencias;
        }
        return b.coincidenciasExactas - a.coincidenciasExactas;
    })
    // Tomamos las 5 mejores enfermedades
    .slice(0, 5);
}

// Función para mostrar las predicciones en la página
function mostrarPredicciones(predicciones) {
    const contenedor = document.getElementById('enfermedad-prediccion');
    contenedor.innerHTML = '';

    if (predicciones.length === 0) {
        contenedor.textContent = 'No se encontraron enfermedades coincidentes con los síntomas seleccionados.';
    } else {
        const lista = document.createElement('ul');
        predicciones.forEach(prediccion => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${prediccion.nombre}</strong>: ${prediccion.sintomasCoincidentes.join(', ')}`;
            lista.appendChild(li);
        });
        contenedor.appendChild(lista);
    }
}
