# TaskManager

Aplicación demo.

## Contenido

* [Requerimientos](#requirimientos-para-desarrollo)

* [Ejecutar el proyecto](#ejecutar-el-proyecto)

* [Producción](#produccien)

* [Servidor de desarrollo](#servidor-de-desarrollo)

* [Seed para desarrollo](#seed-para-desarrollo)

* [Endpoints](#endpoints)

* [Equipo](#equipo)

## Requerimientos para desarrollo

En aras de tener un ambiente de desarrollo apropiado por favor instala el siguiente software:

* [NVM](https://github.com/creationix/nvm)

* [NodeJS](https://nodejs.org)

	- Instalar utilizando `nvm install` dentro de la carpeta del proyecto

* [SailsJS](http://sailsjs.org/get-started)

	- Instalar la version 0.12.13.
  Verifica esto ejecutando `sails -v`
	- Verifica que la version de sails en `package.json` sea la misma utilizando `./node_modules/sails/bin/sails.js --version`

* [MySQL](https://www.mysql.com)

	- Crear la base de datos.
	```
	CREATE DATABASE task_manager;
	```
## Ejecutar proyecto

1. Clonar repositorio con el comando `git clone REPO --recurse-submodules`

2. Ejecutar los siguientes comandos de configuración dentro del proyecto:
  ```
  git config diff.submodule log
  git config status.submodulesummary true
  git config push.recurseSubmodules check
  ```

2. Iniciar los submódulos `git submodule init`

2. Actualizar los submódulos `git submodule update`

2. Ejecutar `nvm use`

2. Instalar modulos de node `npm install`

3. Dentro de la carpeta del proyecto ejecuta en terminal `sails lift`

Si no se quiere utilizar llamadas externas por falta de conexión **al iniciar**, se puede ejecutar `OFFLINE=true sails lift`.

## Producción

Para configuración en modo de producción, se necesita iniciar como
```
NODE_ENV=production node app.js
```

## Servidor de desarrollo

Para configuración en modo de servidor de pruebas, se necesita iniciar como
```
NODE_ENV=development node app.js
```

## Seed de desarrollo

Disponible para todos los entornos, a excepción de `production`. Rutas disponibles para
inicializar la base de datos con una serie de datos predefinidos. A continuación se definen las rutas.

### /db/all
---
##### ***GET***
**Summary:** Seed all models with default data

**Description:** Seeds all models with default data

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | Seed successful | [SeedInfo](#seedInfo) |
| 500 | Unexpected error | [SeedInfo](#seedInfo) |

##### ***DELETE***
**Summary:** Unseed all models with default data

**Description:** Unseeds all models with default data

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | Unseed successful | [SeedInfo](#seedInfo) |
| 500 | Unexpected error | [SeedInfo](#seedInfo) |

### /db/{model_name}
---
##### ***POST***
**Summary:** Seed a model with certain data

**Description:** Seeds all models with default data

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| model_name | path | Name of model | Yes | string |
| data | body | The data to insert. You may send an array of objects. | No | object |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | Seed successful | [SeedInfo](#seedInfo) |
| 500 | Unexpected error | [SeedInfo](#seedInfo) |

##### ***DELETE***
**Summary:** Unseed a model with certain data

**Description:** Unseeds all models with default data

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| model_name | path | Name of model | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | Seed successful | [SeedInfo](#seedInfo) |
| 500 | Unexpected error | [SeedInfo](#seedInfo) |

### /db/query
---
##### ***POST***
**Summary:** Seed with certain data

**Description:** Seeds all models with query data

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| data | body | The data to insert. You may send an array of objects. | No | object |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 201 | Seed successful | [SeedInfo](#seedInfo) |
| 500 | Unexpected error | [SeedInfo](#seedInfo) |

### Responses
---

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| model | string | Model/all | Yes |
| status | string | seed/unseed successful or error| Yes |
| type | string | error type | No |
| message | string | error message | No |

## Endpoints

La aplicación recibe poticiones con `Content-Type = application/json` y los cuerpos con el formato más sencillo posible que represente
al modelo correspendiente.

### /users
---
##### ***POST***
**Acción:** Creación de usuarios

### /auth

Por ser una demo, la implementación está basada en Bearer simplificado.

---
##### ***POST***
**Acción:** Autenticación. Recibe `email` y `password`

##### ***DELETE***
**Acción:** Logout

### /api/tasks

---
##### ***POST***
**Acción:** Creación de una tarea

### /api/tasks/:id

---
##### ***PUT***
**Acción:** Actualización de una tarea

##### ***DELETE***
**Acción:** Borrado de una tarea

### /api/tasks?q=example

---
##### ***GET***
**Acción:** Búsqueda de una tarea que contenga la cadena `q`


### /api/tasks/:status

---
##### ***GET***
**Acción:** Búsqueda de una tarea que cuyo estado sea `status`


## Equipo

1. Daniel González Espinoza

    * <a href="mailto:danielglezespinoza@gmail.com">danielglezespinoza@gmail.com</a>

    * [github.com/malpercio](http://github.com/malpercio)
