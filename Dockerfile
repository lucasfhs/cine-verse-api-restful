# Usa uma imagem base do Node.js
FROM node:22.12.0

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de configuração do projeto
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos (inclusive src/, server.ts etc.)
COPY . .

# Compila o código TypeScript e aplica os aliases
RUN npm run build

# Expõe a porta que o servidor Express vai rodar
EXPOSE 8080

# Comando para iniciar o servidor (já compilado, via dist/server.js)
CMD ["npm", "start"]
