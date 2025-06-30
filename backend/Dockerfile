# Use Eclipse Temurin JDK 17 as base image
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY target/insurebot-backend.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
# For multi-stage build, add Maven build stage above (optional) 