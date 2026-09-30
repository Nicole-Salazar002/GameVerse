const SUPABASE_URL = 'https://dbqjvfvgwtaztjpweojp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRicWp2ZnZnd3RhenRqcHdlb2pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2NTAxNzEsImV4cCI6MjA4ODIyNjE3MX0.Ow3sPqpF7KBxcbvNBQ-Z-90clDx07Kq9VOsuVXcHCp4';

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

function normalizarNombre(nombre) {
    return nombre.trim().toLocaleLowerCase();
}

function actualizarConteo(id, cantidad) {
    const conteo = document.getElementById(id);
    if (conteo) conteo.textContent = `${cantidad} ${cantidad === 1 ? 'registro' : 'registros'}`;
}

function mostrarErrorCarga(contenedor, idConteo, error) {
    console.error(error);
    if (idConteo) {
        const conteo = document.getElementById(idConteo);
        if (conteo) conteo.textContent = 'Error al cargar';
    }
    if (!contenedor) return;

    const aviso = document.createElement('div');
    aviso.className = 'lista-item lista-error';
    aviso.textContent = 'No se pudieron cargar los registros. Recarga la página para intentarlo de nuevo.';
    contenedor.replaceChildren(aviso);
}

function renderizarRegistros(contenedor, registros, mensajeVacio, idConteo, crearContenido) {
    if (!contenedor) return;

    contenedor.replaceChildren();
    actualizarConteo(idConteo, registros.length);

    if (registros.length === 0) {
        const aviso = document.createElement('div');
        aviso.className = 'lista-item';
        aviso.textContent = mensajeVacio;
        contenedor.append(aviso);
        return;
    }

    registros.forEach(registro => {
        const item = document.createElement('div');
        item.className = 'lista-item';

        const contenido = crearContenido(registro);
        if (contenido.titulo) {
            const titulo = document.createElement('strong');
            titulo.textContent = contenido.titulo;
            item.append(titulo);
        }

        contenido.detalles.forEach(([etiqueta, valor]) => {
            const detalle = document.createElement('div');
            detalle.textContent = `${etiqueta}: ${valor}`;
            item.append(detalle);
        });

        contenedor.append(item);
    });
}

async function nombreYaExiste(tabla, nombre) {
    const { data, error } = await supabaseClient
        .from(tabla)
        .select('nombre');

    if (error) {
        console.error(`Error al comprobar el nombre en ${tabla}:`, error);
        return null;
    }

    return (data || []).some(registro => normalizarNombre(registro.nombre) === normalizarNombre(nombre));
}

// GÉNERO

async function cargarGeneros() {
    const { data, error } = await supabaseClient
        .from('generos')
        .select('*')
        .order('nombre', { ascending: true });

    const contenedor = document.getElementById('lista-generos') || document.getElementById('catalogo-generos');
    if (error) {
        mostrarErrorCarga(contenedor, 'conteo-generos', error);
        return;
    }

    renderizarRegistros(contenedor, data || [], 'Aún no hay géneros registrados.', 'conteo-generos',
        genero => ({ titulo: genero.nombre, detalles: [['ID', genero.id]] }));
}

async function agregarGenero() {
    const input = document.getElementById('nuevo-genero');
    if (!input) return;

    const nombreGenero = input.value.trim();

    if (!nombreGenero) {
        alert("Por favor ingresa un género");
        return;
    }

    const existe = await nombreYaExiste('generos', nombreGenero);
    if (existe === null) return;
    if (existe) {
        alert("Ese género ya existe");
        return;
    }

    const { error } = await supabaseClient
        .from('generos')
        .insert([{ nombre: nombreGenero }]);

    if (error) {
        console.error(error);
        alert("Error al agregar género");
        return;
    }

    alert("Género agregado correctamente");
    input.value = '';
    cargarGeneros();
}

// EDITORAS

async function cargarEditoras() {
    const { data, error } = await supabaseClient
        .from('editoras')
        .select('*')
        .order('nombre', { ascending: true });

    const contenedor = document.getElementById('lista-editoras') || document.getElementById('catalogo-editoras');
    if (error) {
        mostrarErrorCarga(contenedor, 'conteo-editoras', error);
        return;
    }

    renderizarRegistros(contenedor, data || [], 'Aún no hay editoras registradas.', 'conteo-editoras',
        editora => ({ titulo: editora.nombre, detalles: [['ID', editora.id]] }));
}

async function agregarEditora() {
    const input = document.getElementById('nueva-editora');
    if (!input) return;

    const nombre = input.value.trim();

    if (!nombre) {
        alert("Por favor ingresa una editora");
        return;
    }

    const existe = await nombreYaExiste('editoras', nombre);
    if (existe === null) return;
    if (existe) {
        alert("Esa editora ya existe");
        return;
    }

    const { error } = await supabaseClient
        .from('editoras')
        .insert([{ nombre }]);

    if (error) {
        console.error(error);
        alert("Error al agregar editora");
        return;
    }

    alert("Editora agregada correctamente");
    input.value = '';
    cargarEditoras();
}

// PLATAFORMAS

async function cargarPlataformas() {
    const { data, error } = await supabaseClient
        .from('plataformas')
        .select('*')
        .order('nombre', { ascending: true });

    const contenedor = document.getElementById('lista-plataformas') || document.getElementById('catalogo-plataformas');
    if (error) {
        mostrarErrorCarga(contenedor, 'conteo-plataformas', error);
        return;
    }

    renderizarRegistros(contenedor, data || [], 'Aún no hay plataformas registradas.', 'conteo-plataformas',
        plataforma => ({ titulo: plataforma.nombre, detalles: [['ID', plataforma.id]] }));
}

async function agregarPlataforma() {
    const input = document.getElementById('nueva-plataforma');
    if (!input) return;

    const nombre = input.value.trim();

    if (!nombre) {
        alert("Por favor ingresa una plataforma");
        return;
    }

    const existe = await nombreYaExiste('plataformas', nombre);
    if (existe === null) return;
    if (existe) {
        alert("Esa plataforma ya existe");
        return;
    }

    const { error } = await supabaseClient
        .from('plataformas')
        .insert([{ nombre }]);

    if (error) {
        console.error(error);
        alert("Error al agregar plataforma");
        return;
    }

    alert("Plataforma agregada correctamente");
    input.value = '';
    cargarPlataformas();
}

// VIDEOJUEGOS

async function cargarVideojuegos() {
    const { data, error } = await supabaseClient
        .from('videojuegos')
        .select('*')
        .order('nombre', { ascending: true });

    const contenedor = document.getElementById('lista-videojuegos') || document.getElementById('catalogo-videojuegos');
    if (error) {
        mostrarErrorCarga(contenedor, 'conteo-videojuegos', error);
        return;
    }

    renderizarRegistros(contenedor, data || [], 'Aún no hay videojuegos registrados.', 'conteo-videojuegos',
        juego => ({
            titulo: juego.nombre,
            detalles: [
                ['ID', juego.id],
                ['Año', juego.anio_lanzamiento],
                ['Género ID', juego.genero_id],
                ['Editora ID', juego.editora_id]
            ]
        }));
}

async function agregarVideojuego() {
    const nombre = document.getElementById('nombre-videojuego')?.value.trim();
    const anio = document.getElementById('anio-videojuego')?.value;
    const generoId = document.getElementById('genero-id')?.value;
    const editoraId = document.getElementById('editora-id')?.value;

    if (!nombre || !anio || !generoId || !editoraId) {
        alert("Completa todos los campos");
        return;
    }

    const existe = await nombreYaExiste('videojuegos', nombre);
    if (existe === null) return;
    if (existe) {
        alert("Ese videojuego ya existe");
        return;
    }

    const { error } = await supabaseClient
        .from('videojuegos')
        .insert([
            {
                nombre,
                anio_lanzamiento: parseInt(anio),
                genero_id: parseInt(generoId),
                editora_id: parseInt(editoraId)
            }
        ]);

    if (error) {
        console.error(error);
        alert("Error al agregar videojuego");
        return;
    }

    alert("Videojuego agregado correctamente");

    document.getElementById('nombre-videojuego').value = '';
    document.getElementById('anio-videojuego').value = '';
    document.getElementById('genero-id').value = '';
    document.getElementById('editora-id').value = '';

    cargarVideojuegos();
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('lista-generos') || document.getElementById('catalogo-generos')) cargarGeneros();
    if (document.getElementById('lista-editoras') || document.getElementById('catalogo-editoras')) cargarEditoras();
    if (document.getElementById('lista-plataformas') || document.getElementById('catalogo-plataformas')) cargarPlataformas();
    if (document.getElementById('lista-videojuegos') || document.getElementById('catalogo-videojuegos')) cargarVideojuegos();
    if (document.getElementById('lista-asignaciones')) cargarAsignaciones();
});

// ASIGNACIONES

async function cargarAsignaciones() {
    const contenedor = document.getElementById('lista-asignaciones');
    if (!contenedor) return;

    const [asignacionesResult, videojuegosResult, plataformasResult] = await Promise.all([
        supabaseClient.from('videojuego_plataforma').select('*'),
        supabaseClient.from('videojuegos').select('id, nombre').order('nombre', { ascending: true }),
        supabaseClient.from('plataformas').select('id, nombre').order('nombre', { ascending: true })
    ]);

    if (videojuegosResult.error) {
        mostrarErrorCarga(document.getElementById('catalogo-videojuegos'), 'conteo-videojuegos', videojuegosResult.error);
    } else {
        renderizarRegistros(
            document.getElementById('catalogo-videojuegos'),
            videojuegosResult.data || [],
            'Aún no hay videojuegos registrados.',
            'conteo-videojuegos',
            juego => ({ titulo: juego.nombre, detalles: [['ID', juego.id]] })
        );
    }

    if (plataformasResult.error) {
        mostrarErrorCarga(document.getElementById('catalogo-plataformas'), 'conteo-plataformas', plataformasResult.error);
    } else {
        renderizarRegistros(
            document.getElementById('catalogo-plataformas'),
            plataformasResult.data || [],
            'Aún no hay plataformas registradas.',
            'conteo-plataformas',
            plataforma => ({ titulo: plataforma.nombre, detalles: [['ID', plataforma.id]] })
        );
    }

    if (asignacionesResult.error) {
        mostrarErrorCarga(contenedor, 'conteo-asignaciones', asignacionesResult.error);
        return;
    }

    const videojuegos = new Map((videojuegosResult.data || []).map(juego => [String(juego.id), juego.nombre]));
    const plataformas = new Map((plataformasResult.data || []).map(plataforma => [String(plataforma.id), plataforma.nombre]));
    renderizarRegistros(contenedor, asignacionesResult.data || [], 'Aún no hay asignaciones registradas.', 'conteo-asignaciones',
        asignacion => ({
            titulo: `${videojuegos.get(String(asignacion.videojuego_id)) || 'Videojuego no encontrado'} ↔ ${plataformas.get(String(asignacion.plataforma_id)) || 'Plataforma no encontrada'}`,
            detalles: [
                ['Videojuego ID', asignacion.videojuego_id],
                ['Plataforma ID', asignacion.plataforma_id]
            ]
        }));
}

async function agregarAsignacion() {
    const videojuegoId = document.getElementById('videojuego-id')?.value;
    const plataformaId = document.getElementById('plataforma-id')?.value;

    if (!videojuegoId || !plataformaId) {
        alert("Completa ambos campos");
        return;
    }

    const { data: asignaciones, error: errorConsulta } = await supabaseClient
        .from('videojuego_plataforma')
        .select('videojuego_id, plataforma_id');

    if (errorConsulta) {
        console.error("Error al comprobar la asignación:", errorConsulta);
        return;
    }

    const asignacionExiste = (asignaciones || []).some(asignacion =>
        Number(asignacion.videojuego_id) === Number(videojuegoId) &&
        Number(asignacion.plataforma_id) === Number(plataformaId)
    );

    if (asignacionExiste) {
        alert("Esta asignación ya existe");
        return;
    }

    const { error } = await supabaseClient
        .from('videojuego_plataforma')
        .insert([
            {
                videojuego_id: parseInt(videojuegoId),
                plataforma_id: parseInt(plataformaId)
            }
        ]);

    if (error) {
        console.error(error);
        alert("Error al asignar plataforma");
        return;
    }

    alert("Plataforma asignada correctamente");

    document.getElementById('videojuego-id').value = '';
    document.getElementById('plataforma-id').value = '';

    cargarAsignaciones();
}