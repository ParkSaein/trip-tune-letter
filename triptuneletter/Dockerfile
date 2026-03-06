# Stage 1: Build
FROM eclipse-temurin:25-jdk-alpine AS build
WORKDIR /home/gradle/src
COPY . .
RUN ./gradlew build -x test --no-daemon

# Stage 2: Run
FROM eclipse-temurin:25-jre-alpine
WORKDIR /app
COPY --from=build /home/gradle/src/build/libs/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
