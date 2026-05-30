FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copy the JAR and properties file into the image
COPY qa-training-app.jar app.jar
COPY application.properties application.properties

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar", "--spring.config.location=file:/app/application.properties"]