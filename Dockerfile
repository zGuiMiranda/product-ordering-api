# Usar a imagem base do Node.js
FROM node:21 AS build

# Definir o diretório de trabalho
WORKDIR /usr/src/app

# # Copiar os arquivos de configuração do projeto
# COPY package*.json ./


# Instalar as dependências
RUN yarn install

# Copiar os arquivos de configuração do projeto
COPY package*.json yarn*.lock ./

# Copiar o restante do código do aplicativo
COPY . .

# Compilar o projeto
RUN yarn build

# Usar a imagem base do Node.js para a etapa de produção
FROM node:21

# Definir o diretório de trabalho
WORKDIR /usr/src/app

# Copiar as dependências e o código compilado da etapa de build
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

# Expôr a porta em que o aplicativo vai rodar
EXPOSE 9000

# Definir o comando para iniciar o aplicativo
CMD ["yarn", "start"]