
const boton = document.getElementById("generar");
const botonAnalizar = document.getElementById("analizar");
const resultado = document.getElementById("resultado");

// Generar ficha técnica
boton.addEventListener("click", function () {
    const ficha = obtenerFicha();

    if (!ficha.nombre || !ficha.categoria || !ficha.descripcion) {
        alert("Completa el nombre, la categoría y la descripción.");
        return;
    }

    resultado.replaceChildren();

    const titulo = document.createElement("h2");
    titulo.textContent = ficha.nombre;
    resultado.appendChild(titulo);

    mostrarDatos(ficha);
});

// Obtener información del formulario
function obtenerFicha() {
    return {
        nombre: document.getElementById("nombre").value.trim(),
        categoria: document.getElementById("categoria").value,
        descripcion: document.getElementById("descripcion").value.trim(),
        caracteristicas: document.getElementById("caracteristicas").value.trim(),
        materiales: document.getElementById("materiales").value.trim(),
        procedimiento: document.getElementById("procedimiento").value.trim(),
        observaciones: document.getElementById("observaciones").value.trim()
    };
}

// Mostrar información
function mostrarDatos(ficha) {
    const datos = [
        ["Categoría", ficha.categoria],
        ["Descripción", ficha.descripcion],
        ["Características técnicas", ficha.caracteristicas],
        ["Materiales o recursos", ficha.materiales],
        ["Procedimiento", ficha.procedimiento],
        ["Observaciones", ficha.observaciones]
    ];

    datos.forEach(([etiqueta, valor]) => {
        if (valor) {
            const subtitulo = document.createElement("h3");
            subtitulo.textContent = etiqueta;

            const parrafo = document.createElement("p");
            parrafo.textContent = valor;

            resultado.append(subtitulo, parrafo);
        }
    });
}

// Análisis automático gratuito
botonAnalizar.addEventListener("click", function () {
    const ficha = obtenerFicha();
    const errores = [];
    const recomendaciones = [];

    if (!ficha.nombre) errores.push("Falta el nombre de la ficha.");
    if (!ficha.categoria) errores.push("Falta seleccionar una categoría.");
    if (!ficha.descripcion) errores.push("Falta la descripción.");

    if (!ficha.caracteristicas) {
        recomendaciones.push("Agrega las características técnicas.");
    }

    if (!ficha.materiales) {
        recomendaciones.push("Especifica los materiales o recursos.");
    }

    if (!ficha.procedimiento) {
        recomendaciones.push("Describe el procedimiento paso a paso.");
    }

    if (!ficha.observaciones) {
        recomendaciones.push("Agrega observaciones importantes.");
    }

    resultado.replaceChildren();

    const titulo = document.createElement("h2");
    titulo.textContent = "Análisis automático de la ficha";
    resultado.appendChild(titulo);

    const estado = document.createElement("h3");
    estado.textContent = errores.length === 0
        ? "Ficha con campos obligatorios completos"
        : "Se encontraron datos faltantes";
    resultado.appendChild(estado);

    if (errores.length > 0) {
        agregarSeccion("Datos faltantes", errores);
    }

    if (recomendaciones.length > 0) {
        agregarSeccion("Recomendaciones", recomendaciones);
    }

    if (errores.length === 0 && recomendaciones.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "Todos los campos están completos. La ficha está lista para su revisión.";
        resultado.appendChild(mensaje);
    }
});

function agregarSeccion(titulo, elementos) {
    const subtitulo = document.createElement("h3");
    subtitulo.textContent = titulo;
    resultado.appendChild(subtitulo);

    const lista = document.createElement("ul");

    elementos.forEach(elemento => {
        const item = document.createElement("li");
        item.textContent = elemento;
        lista.appendChild(item);
    });

    resultado.appendChild(lista);
}
// Descargar ficha técnica en PDF
document.getElementById("descargarPDF").addEventListener("click", function () {
    const ficha = obtenerFicha();

    if (!ficha.nombre) {
        alert("Primero escribe el nombre de la ficha.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text("FICHA TÉCNICA", 105, 20, { align: "center" });

    pdf.setFontSize(12);

    let y = 35;

    const datos = [
        ["Nombre", ficha.nombre],
        ["Categoría", ficha.categoria],
        ["Descripción", ficha.descripcion],
        ["Características técnicas", ficha.caracteristicas],
        ["Materiales o recursos", ficha.materiales],
        ["Procedimiento", ficha.procedimiento],
        ["Observaciones", ficha.observaciones]
    ];

    datos.forEach(([titulo, contenido]) => {
        if (contenido) {
            const lineas = pdf.splitTextToSize(titulo + ": " + contenido, 170);

            if (y + lineas.length * 7 > 275) {
                pdf.addPage();
                y = 20;
            }

            pdf.text(lineas, 20, y);
            y += lineas.length * 7 + 8;
        }
    });

    pdf.save("Ficha_Tecnica.pdf");
});// Botón para editar la ficha técnica
document.getElementById("editarFicha").addEventListener("click", function () {
    const campos = [
        "nombre",
        "categoria",
        "descripcion",
        "caracteristicas",
        "materiales",
        "procedimiento",
        "observaciones"
    ];

    campos.forEach(function (campo) {
        document.getElementById(campo).disabled = false;
    });

    alert("Ya puedes modificar los datos de tu ficha técnica.");
});
