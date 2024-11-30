document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('solicitud-form');
    const cancelarBtn = document.getElementById('cancelar-btn');

    // Al enviar los datos, almacenamos temporalmente y limpiamos el formulario
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar el envío del formulario de forma tradicional

        const nombre = document.getElementById('nombre').value.trim();
        const apellidos = document.getElementById('apellidos').value.trim();
        const dni = document.getElementById('dni').value.trim();
        const fechaNacimiento = document.getElementById('fecha-nacimiento').value;

        // Verificar si todos los campos están completos
        if (nombre === "" || apellidos === "" || dni === "" || fechaNacimiento === "") {
            alert("Por favor, complete todos los campos.");
            return; // No proceder si hay campos vacíos
        }

        // Guardamos los datos en el almacenamiento temporal (localStorage)
        localStorage.setItem('nombre', nombre);
        localStorage.setItem('apellidos', apellidos);
        localStorage.setItem('dni', dni);
        localStorage.setItem('fecha-nacimiento', fechaNacimiento);

        // Limpiamos los campos del formulario
        form.reset();

        // Redirigimos a sintomas.html
        window.location.href = 'sintomas.html';
    });

    // Al hacer clic en cancelar, limpiamos el formulario y regresamos a index.html
    cancelarBtn.addEventListener('click', function () {
        // Limpiamos los datos del formulario
        form.reset();

        // Redirigimos a index.html sin guardar datos
        window.location.href = 'index.html';
    });
});
