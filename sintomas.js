document.addEventListener('DOMContentLoaded', () => {
    const sintomasForm = document.getElementById('sintomasForm');
    
    // Al enviar el formulario
    sintomasForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar el comportamiento por defecto del formulario

        const selectedSymptoms = [];
        
        // Obtener todos los checkboxes seleccionados
        const checkboxes = document.querySelectorAll('input[name="sintomas"]:checked');
        
        // Almacenar los valores seleccionados en el array
        checkboxes.forEach(checkbox => {
            selectedSymptoms.push(checkbox.value);
        });

        // Guardar los síntomas seleccionados en el almacenamiento local (localStorage)
        localStorage.setItem('sintomas', JSON.stringify(selectedSymptoms));

        // Redirigir a resultados.html
        window.location.href = 'resultados.html';
    });
});
