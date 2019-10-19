# Ejemplo de API REST con Express, Docker y Mocha

Para arrancar el proyecto:
* `.env`
  ```
  PORT=3000
  DB_URI=mongodb://movie-db:27017/moviedb
  ```
* `docker-compose:`
  ```
  docker-compose up
  ```

## Ejercicio

El ejercicio consiste en una biblioteca de películas donde se pueda:

* Crear una película dado el siguiente JSON 
  ```json
  {
    "name": "Star Wars",
    "director": "George Lucas",
    "yearRelease": 1977,
    "genre": ["Sci-fi", "Adventure"]
  }
  ```
* Poder editar y borrar la película
* Listar las películas por género.

Y además:
* Uso de docker
* Realización de tests

**May the Force be with you!** 


## Desarrollo

Se plantea la siguiente solución en dos capas (web y datos) con Docker

Docker-compose para levantar dos servicios: uno para la aplicación web con Express y otro para la base de datos MongoDB

Endpoints:

* `GET "/"` para listar todas las películas
* `GET "/:genre"` para filtrar las películas por un género
* `POST "/"` para crear una nueva película
* `PATCH "/:id"` para actualizar parcialmente una película
* `DELETE "/:id"` para eliminar una película

### Proceso iterativo

1. Docker, Docker-Compose, Express initial setup
2. Modelo de Movie, conexión con MongoDB y endpoint para la creación de un recurso Movie
3. Resto de endpoints
4. Tests (**pendiente**)
