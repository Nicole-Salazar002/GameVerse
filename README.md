# GameVerse

GameVerse es una aplicación web para organizar y consultar una biblioteca de videojuegos. Permite registrar videojuegos, géneros, editoras y plataformas, además de relacionar cada juego con las plataformas en las que está disponible.

## Funcionalidades

- Registrar géneros, editoras, plataformas y videojuegos.
- Consultar los registros existentes y sus IDs.
- Ver los géneros y las editoras disponibles al registrar un videojuego.
- Ver los videojuegos y las plataformas disponibles al crear una asignación.
- Relacionar videojuegos con plataformas y consultar las asignaciones registradas.
- Evitar nombres duplicados y asignaciones repetidas.

## Tecnologías

- HTML
- CSS
- JavaScript
- Bootstrap 5
- Supabase

## Estructura del proyecto

- `portada.html`: portada de GameVerse.
- `index.html`: página principal y acceso a las secciones.
- `videojuegos.html`: registro y consulta de videojuegos.
- `generos.html`: registro y consulta de géneros.
- `editoras.html`: registro y consulta de editoras.
- `plataformas.html`: registro y consulta de plataformas.
- `videojuego_plataforma.html`: relación entre videojuegos y plataformas.
- `css/styles.css`: estilos de la aplicación.
- `js/app.js`: consultas y operaciones con Supabase.
- `js/navigation.js`: comportamiento del menú de navegación.

## Base de datos

La aplicación utiliza estas tablas en Supabase:

- `generos`
- `editoras`
- `plataformas`
- `videojuegos`
- `videojuego_plataforma`

La tabla `videojuegos` relaciona cada juego con un género y una editora mediante sus IDs. La tabla `videojuego_plataforma` vincula los videojuegos con las plataformas disponibles.

## Configuración

1. Crear un proyecto en [Supabase](https://supabase.com/).
2. Configurar las tablas y permisos necesarios para la aplicación.
3. Añadir la URL del proyecto y la clave pública correspondiente en `js/app.js`.
4. Abre el proyecto desde un servidor web local o publícalo en un servicio de alojamiento estático.

## Diseño

La interfaz utiliza un tema oscuro con acentos violeta y lima, y se adapta a distintos tamaños de pantalla.
