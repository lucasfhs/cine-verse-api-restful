# Usa uma imagem base do Node.js
FROM node:22.12.0

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de configuração do projeto (package.json e package-lock.json)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o conteúdo do projeto para o container (incluindo a pasta src/)
COPY . .

# Expõe a porta que o servidor Express vai rodar
EXPOSE 8080

# Comando para iniciar o servidor
CMD ["npm", "run", "dev"]