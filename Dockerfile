# Usa una imagen base de Node.js
FROM node:20.18.0-alpine3.20

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y yarn.lock al directorio de trabajo
COPY package.json yarn.lock ./

# Instala las dependencias del proyecto
RUN yarn install

# Copia el resto del código de la aplicación al directorio de trabajo
COPY . .

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["yarn", "start:dev"]