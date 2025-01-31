# -----------------------------------
# Stage 1 : Build 
# -----------------------------------
FROM gradle:7.6-jdk17 AS build 


# Répertoire de travail de la compilation 

WORKDIR /app

# Copier les fichiers Gradle
COPY build.gradle.kts  settings.gradle.kts ./ 


# Télécharger d'abord les dépendances (mise en cache Docker)
RUN gradle dependencies --no-daemon  || true 

# Copier le reste du code
COPY . .


# Construire le jar (on peut ignorer les tests pour gagner du temps en dev)
RUN gradle clean build -x test --no-daemon 

# ----------------------------------------
# Stage 2 : Runtime
# ----------------------------------------
FROM openjdk:17-jdk-slim

# Copier le jar généré
COPY  --from=build /app/build/libs/*.jar /app/app.jar

# Expose le port 8080  (si vous démarrez le spring boot sur 8080)
EXPOSE 8080 

# Démarrer l'application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]


