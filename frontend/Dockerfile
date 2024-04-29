# Usa una imagen base de Node.js
FROM node:21-alpine

RUN npm install nodemon -g

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo de dependencias package.json y el bloqueo de bloqueo de versiones package-lock.json
COPY package.json package-lock.json ./

# Instala las dependencias, incluyendo las de desarrollo
RUN npm install

# Copia el código fuente de la aplicación al contenedor
COPY . .

# Expón el puerto en el que se ejecuta la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]