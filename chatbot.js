// Obtención de elementos del DOM
const chatbotBubble = document.getElementById('chatbot');
const chatbotWindow = document.getElementById('chatbot-window');
const closeChatbotButton = document.getElementById('close-chatbot');
const chatbotMessages = document.getElementById('chatbot-messages');

// Función para abrir la ventana del chatbot
chatbotBubble.addEventListener('click', () => {
    chatbotWindow.classList.add('show'); // Muestra la ventana del chatbot
    loadWelcomeMessage(); // Carga el mensaje de bienvenida
});

// Función para cerrar la ventana del chatbot
closeChatbotButton.addEventListener('click', () => {
    chatbotWindow.classList.remove('show'); // Oculta la ventana
    clearChat(); // Limpia el chat cuando se cierra
});

// Función para limpiar el chat (borrar los mensajes)
function clearChat() {
    chatbotMessages.innerHTML = ''; // Elimina todos los mensajes del chat
}

// Función para cargar el mensaje de bienvenida inicial
function loadWelcomeMessage() {
    clearChat(); // Elimina los mensajes previos

    // Mensaje de bienvenida al usuario
    const welcomeMessage = createMessage('¡Hola! Soy el Chatbot. ¿En qué puedo ayudarte?', 'bot');
    chatbotMessages.appendChild(welcomeMessage);

    // Opciones interactivas que el chatbot puede ofrecer
    const options = [
        'Información sobre enfermedades',
        'Tratamientos para enfermedades',
        'Síntomas de enfermedades',
        'Consejos generales de salud'
    ];

    // Añadir las opciones al chat
    options.forEach(option => {
        const button = createOptionButton(option);
        chatbotMessages.appendChild(button);
    });
}

// Función para crear un mensaje
function createMessage(text, sender) {
    const message = document.createElement('div');
    message.classList.add('chatbot-message', sender);
    message.textContent = text;  // Asegúrate de que sea texto, no un objeto
    return message;
}

// Función para crear un botón de opción
function createOptionButton(text) {
    const button = document.createElement('button');
    button.classList.add('chat-option');
    button.textContent = text;

    // Usamos una función de callback para asegurarnos de pasar el valor correcto
    button.addEventListener('click', function() {
        handleOptionClick(text); // Llamada a handleOptionClick con el valor correcto
    });

    return button;
}

// Función que maneja la opción seleccionada por el usuario
function handleOptionClick(option) {
    clearChat(); // Limpiar el chat cuando se selecciona una opción

    let responseMessage;

    // Responder según la opción seleccionada
    if (option === 'Información sobre enfermedades') {
        responseMessage = createMessage('Te puedo proporcionar información sobre varias enfermedades. ¿Sobre cuál te gustaría saber más?', 'bot');
        showDiseasesOptions(); // Mostrar opciones de enfermedades
    } else if (option === 'Tratamientos para enfermedades') {
        responseMessage = createMessage('Puedo darte detalles sobre tratamientos disponibles para distintas enfermedades. ¿Te gustaría conocer algún tratamiento en particular?', 'bot');
        showTreatmentsOptions(); // Mostrar opciones de tratamientos
    } else if (option === 'Síntomas de enfermedades') {
        responseMessage = createMessage('Te puedo ayudar a identificar síntomas relacionados con diversas enfermedades. ¿Tienes algún síntoma específico en mente?', 'bot');
        showSymptomsOptions(); // Mostrar opciones de síntomas
    } else if (option === 'Consejos generales de salud') {
        responseMessage = createMessage('Te puedo ofrecer algunos consejos generales de salud para llevar un estilo de vida más saludable. ¿Te gustaría saber más?', 'bot');
        showHealthTipsOptions(); // Mostrar opciones de consejos generales
    }

    chatbotMessages.appendChild(responseMessage);
}

// Función para mostrar opciones de enfermedades
function showDiseasesOptions() {
    const diseases = [
        'Diabetes',
        'Hipertensión',
        'Cáncer',
        'Resfriado Común'
    ];

    diseases.forEach(disease => {
        const button = createOptionButton(disease);
        chatbotMessages.appendChild(button);
    });
}

// Función para mostrar la información de la enfermedad seleccionada
function showDiseaseInfo(disease) {
    let diseaseInfo;

    switch (disease) {
        case 'Diabetes':
            diseaseInfo = 'La diabetes es una enfermedad que afecta la forma en que el cuerpo procesa el azúcar en sangre. Los síntomas incluyen aumento de la sed, cansancio, visión borrosa y pérdida de peso inexplicada. El tratamiento incluye cambios en la dieta, ejercicio regular, y medicamentos o insulina.';
            break;
        case 'Hipertensión':
            diseaseInfo = 'La hipertensión es una condición en la que la presión arterial se encuentra elevada. Los síntomas pueden ser dolores de cabeza, cansancio y visión borrosa. El tratamiento incluye dieta saludable, ejercicio, y medicamentos antihipertensivos.';
            break;
        case 'Cáncer':
            diseaseInfo = 'El cáncer es el crecimiento descontrolado de células anormales en el cuerpo. Los síntomas varían según el tipo de cáncer, pero pueden incluir pérdida de peso inexplicada, fatiga y dolor. El tratamiento depende del tipo de cáncer e incluye cirugía, quimioterapia y radioterapia.';
            break;
        case 'Resfriado Común':
            diseaseInfo = 'El resfriado común es una infección viral que afecta las vías respiratorias. Los síntomas incluyen dolor de garganta, congestión nasal, tos, y fiebre ligera. Se trata con reposo, líquidos y medicamentos para aliviar los síntomas.';
            break;
    }

    clearChat();
    const diseaseMessage = createMessage(diseaseInfo, 'bot');
    chatbotMessages.appendChild(diseaseMessage);
    showBackToStartOption(); // Mostrar opción de volver al inicio
}

// Función para mostrar opciones de tratamientos
function showTreatmentsOptions() {
    const treatments = [
        'Tratamiento para Diabetes',
        'Tratamiento para Hipertensión',
        'Tratamiento para Cáncer',
        'Tratamiento para Resfriado Común'
    ];

    treatments.forEach(treatment => {
        const button = createOptionButton(treatment);
        chatbotMessages.appendChild(button);
    });
}

// Función para mostrar la información sobre los tratamientos
function showTreatmentInfo(treatment) {
    let treatmentInfo;

    switch (treatment) {
        case 'Tratamiento para Diabetes':
            treatmentInfo = 'El tratamiento para la diabetes incluye cambios en la dieta, ejercicio, y medicamentos orales o insulina.';
            break;
        case 'Tratamiento para Hipertensión':
            treatmentInfo = 'El tratamiento para la hipertensión incluye dieta baja en sodio, ejercicio regular y medicamentos antihipertensivos.';
            break;
        case 'Tratamiento para Cáncer':
            treatmentInfo = 'El tratamiento para el cáncer depende del tipo y puede incluir cirugía, quimioterapia, radioterapia o terapia dirigida.';
            break;
        case 'Tratamiento para Resfriado Común':
            treatmentInfo = 'El tratamiento para el resfriado común incluye descanso, líquidos, y medicamentos para aliviar los síntomas como descongestionantes y analgésicos.';
            break;
    }

    clearChat();
    const treatmentMessage = createMessage(treatmentInfo, 'bot');
    chatbotMessages.appendChild(treatmentMessage);
    showBackToStartOption(); // Mostrar opción de volver al inicio
}

// Función para mostrar los síntomas de las enfermedades
function showSymptomsOptions() {
    const symptoms = [
        'Síntomas de Diabetes',
        'Síntomas de Hipertensión',
        'Síntomas de Cáncer',
        'Síntomas de Resfriado Común'
    ];

    symptoms.forEach(symptom => {
        const button = createOptionButton(symptom);
        chatbotMessages.appendChild(button);
    });
}

// Función para mostrar la información de los síntomas
function showSymptomInfo(symptom) {
    let symptomInfo;

    switch (symptom) {
        case 'Síntomas de Diabetes':
            symptomInfo = 'Los síntomas de la diabetes incluyen sed excesiva, hambre constante, cansancio, y visión borrosa.';
            break;
        case 'Síntomas de Hipertensión':
            symptomInfo = 'La hipertensión a menudo no presenta síntomas evidentes. En etapas avanzadas puede causar dolores de cabeza y visión borrosa.';
            break;
        case 'Síntomas de Cáncer':
            symptomInfo = 'Los síntomas del cáncer dependen del tipo, pero pueden incluir fatiga, pérdida de peso inexplicada, y dolor persistente.';
            break;
        case 'Síntomas de Resfriado Común':
            symptomInfo = 'Los síntomas incluyen dolor de garganta, congestión nasal, tos, estornudos y fiebre ligera.';
            break;
    }

    clearChat();
    const symptomMessage = createMessage(symptomInfo, 'bot');
    chatbotMessages.appendChild(symptomMessage);
    showBackToStartOption(); // Mostrar opción de volver al inicio
}

// Función para mostrar los consejos de salud
function showHealthTipsOptions() {
    const tips = [
        'Consejos para una dieta saludable',
        'Consejos para hacer ejercicio',
        'Consejos para mejorar el sueño',
        'Consejos para reducir el estrés'
    ];

    tips.forEach(tip => {
        const button = createOptionButton(tip);
        chatbotMessages.appendChild(button);
    });
}

// Función para mostrar los consejos de salud
function showHealthTipsInfo(tip) {
    let tipInfo;

    switch (tip) {
        case 'Consejos para una dieta saludable':
            tipInfo = 'Una dieta saludable incluye más frutas, verduras, proteínas magras, y limitar azúcares y grasas saturadas.';
            break;
        case 'Consejos para hacer ejercicio':
            tipInfo = 'El ejercicio regular mejora la salud cardiovascular, reduce el estrés, y mejora el ánimo. Haz ejercicio al menos 30 minutos al día.';
            break;
        case 'Consejos para mejorar el sueño':
            tipInfo = 'Establecer una rutina de sueño, evitar pantallas antes de dormir, y crear un ambiente cómodo para descansar puede mejorar tu sueño.';
            break;
        case 'Consejos para reducir el estrés':
            tipInfo = 'Practicar la meditación, respirar profundamente y tomar descansos frecuentes puede reducir el estrés.';
            break;
    }

    clearChat();
    const tipMessage = createMessage(tipInfo, 'bot');
    chatbotMessages.appendChild(tipMessage);
    showBackToStartOption(); // Mostrar opción de volver al inicio
}

// Función para mostrar la opción de volver al inicio
function showBackToStartOption() {
    const button = createOptionButton('Volver al inicio');
    button.addEventListener('click', loadWelcomeMessage); // Llamada a la función de inicio
    chatbotMessages.appendChild(button);
}
