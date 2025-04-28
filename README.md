# Riu Challenge - Gregory Lopez

Este proyecto es una aplicación Angular para la gestión de héroes, desarrollada como parte del Riu Challenge.

## Requisitos

- Node.js >= 18.x
- npm >= 9.x
- Angular CLI >= 18.x

## Instalación

1. Clona el repositorio:

   ```sh
   git clone https://github.com/iamgld/riu-frontend-gregory-lopez.git
   ```

   ```sh
   cd riu-frontend-gregory-lopez
   ```

2. Instala las dependencias:

   ```sh
   pnpm install
   ```

## Levantar el proyecto en desarrollo

```sh
pnpm start
```

La aplicación estará disponible en [http://localhost:4200](http://localhost:4200).

## Scripts útiles

- `pnpm start` : Levanta el servidor de desarrollo.
- `pnpm build`: Compila la aplicación para producción.
- `pnpm test`: Ejecuta los tests unitarios.
- `pnpm linter`: Ejecuta los linters y el formateador.

## Estructura principal

- `src/app/modules/heroes`: Módulo principal de gestión de héroes.
- `src/app/shared`: Componentes y utilidades compartidas.
- `src/styles`: Estilos globales y variables.

---

## Puntos principales del reto

- [x] **Utilizar la última versión LTS de Angular**
- [x] **Crear un servicio que permita:**
  - [x] Registrar un héroe
  - [x] Consultar todos los héroes
  - [x] Consultar un único héroe por ID
  - [x] Consultar todos los superhéroes que contienen en su nombre el valor de la búsqueda (por ejemplo, si buscamos “man” debe devolver “spiderman”, “superman”, “manolito el fuerte”)
  - [x] Modificar un superhéroe
  - [x] Eliminar un superhéroe
  - [ ] Test unitario de este servicio
- [x] **Crear un componente donde se consuma el servicio anterior:**
  - [x] Mostrar una lista paginada de héroes donde aparecerán botones de añadir, editar y eliminar
  - [x] Encima de la lista paginada debe haber un campo que permita hacer búsquedas
  - [x] Al pulsar el botón de añadir se debe mostrar un formulario vacío con las validaciones para agregar un nuevo héroe. Al agregar el nuevo héroe se debe volver a la página de héroes
  - [x] Al pulsar el botón de editar se debe mostrar un formulario con los datos del héroe seleccionado y permitir modificar su información. Al editar el héroe se debe volver a la página de héroes
  - [x] Al pulsar el botón de eliminar se debe preguntar si está seguro usando un diálogo y, al confirmar, se debe eliminar el héroe de la lista
  - [ ] Test unitario de este componente

## Puntos adicionales implementados

- [x] Mostrar un elemento de loading mientras se realiza alguna operación como “borrado” o “edición”
- [x] Directiva para que al crear o editar, en la caja de texto del nombre del héroe, siempre se muestre en mayúscula
- [x] Comunicación entre componentes orientada a eventos
- [x] Uso de programación reactiva
- [x] Código legible usando lambdas
- [x] Construcción de los modelos de datos

## Notas

- El proyecto utiliza Angular Material y RxJS.
- Para cualquier duda o sugerencia, contacta a Gregory Lopez.

---
