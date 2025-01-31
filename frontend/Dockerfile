# ----------------------------------------
# Stage 1 : Build
#-----------------------------------------
    FROM node:16 AS build

    WORKDIR /app
    
    # Copier les fichiers de dépendances
    COPY package*.json ./
    
    # Installer les dépendances 
    RUN npm install
    
    # Copier le reste du code 
    COPY . .
    
    # Construire le bundle production 
    RUN npm run build 
    
    # ------------------------------------------
    # Stage 2 : Serveur NGINX
    # ------------------------------------------
    FROM nginx:alpine
    
    # Supprime la configuration par défaut d'NGINX (optionnel)
    RUN rm /etc/nginx/conf.d/default.conf
    
    # Ajoute une nouvelle configuration pour NGINX
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    # Copier le build React dans le dossier HTML d'NGINX
    COPY --from=build /app/build /usr/share/nginx/html
    
    # Exposer le port 80 du conteneur
    EXPOSE  80
    
    # Lancement de NGINX 
    CMD ["nginx", "-g", "daemon off;"]
    