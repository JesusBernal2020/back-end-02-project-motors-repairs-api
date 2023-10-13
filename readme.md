<p align="center">
<img src="./public/img/presentation.jpg" width="400" alt="Nest Logo" />
</p>




# Proyecto - 02 motors repairs - App


## Description del Proyecto

este proyecto es una api de una empresa de reparaciones de veiculos, que permitira a los usuarios, registrase si es empleado o usuario, iniciar seccion, agendar citas para mantenimiento del veiculo, ahregar que desea realizar en ese mantenimineto, ir al perfinl de usuario y ver sus citas pendientes y completadas.
la aplicacion esta construida utilizandoo node.js express.js y utuliza como base de datos PostgresSQL para almacenar la informacion


## Caracteres principales

3. registrar usuario

4. iniciar seccion con un usuario

6. crear cita para reparacion

7. actualizar usuario

8. Actualizar estado de la reparacion (solo si el usuario es empleado)



# Tecnologias Utilizadas

1. express: un framework minimalista de node.js que facilita la creacion de aplicaciones web y APIs.

2. express-rate-limit: es un middleware que se utiliza para limitar las solicitudes repetidas a APIs públicas y / o puntos finales como la autenticación y el restablecimiento de contraseñas.

3. express-validator: es un middleware de validación de datos para Express. Proporciona validación y saneamiento de datos de entrada.

4. helmet: es un middleware de seguridad que ayuda a proteger las aplicaciones Express / Connect de algunas de las vulnerabilidades conocidas de la web mediante la configuración de encabezados HTTP adecuados.

5. postgreSQL: es un sistema de gestión de bases de datos relacional orientado a objetos y de código abierto.

6. sequelize: Un ORM (Object Relational Mapper) para bases de datos SQL. que simplifica el trabajo con bases de datos SQL escribiendo código JavaScript en lugar de SQL.

7. jsonwebtoken: es una implementación de JSON Web Tokens (JWT) para Node.js que permite la creación y verificación de tokens JWT.


## Requisitos previos para la utilizacion del proyecto

1. tener instalado node.js

2. tener instalado postgresSQL

3. tener creada una base de datos en postgresSQL


## Como ejecutar el proyecto en desarrollo

1. clonar el repositorio

2. ejecutar el siguiente comando para instalar las dependencias:
```

  npm install

```
3. crear una base de datos local en postgreSQL

4. clonar el .env.template y renombrarlo a .env y llenar las variables de entorno

5. levantar el modo desarrollo con el siguiente comando:
```

  npm run start:dev

```