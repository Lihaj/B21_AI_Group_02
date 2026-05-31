# QA Training App

This is a Spring Boot application designed for QA training, containerized using Docker. It includes a MySQL database and an automated seeder to initialize the environment.

## Prerequisites

Before running the application, ensure you have the following installed:

*   **Docker Desktop**: Required to run the application and database in containers. [Download Docker](https://www.docker.com/products/docker-desktop/)
*   **Visual Studio Code**: Recommended IDE for development. [Download VS Code](https://code.visualstudio.com/)

## Getting Started

### 1. Clone the Repository
Open your terminal and navigate to the project root directory.

### 2. Run the Application with Docker
The easiest way to run the entire stack (App + MySQL + Seeder) is using Docker Compose. Run the following command in your terminal:

```powershell
docker compose up --build
```

This command will:
1.  **Build** the application image using the `Dockerfile`.
2.  **Start** a MySQL 8.0 container.
3.  **Run** a seeder container that initializes the database using [init.sql](init.sql).
4.  **Start** the Spring Boot application on port `8080`.

### 3. Verify the Application is Running
Once the containers are up and running, you can access the application at:

*   **Home Page**: [http://localhost:8080/ui/login](http://localhost:8080/ui/login)
*   **Swagger UI (API Docs)**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

## Project Structure

*   [application.properties](application.properties): Main configuration file for the Spring Boot app.
*   [docker-compose.yml](docker-compose.yml): Defines the multi-container setup (mysql, seeder, app).
*   [Dockerfile](Dockerfile): Instructions to build the application image.
*   [init.sql](init.sql): SQL script used by the seeder to initialize the database schema and data.
*   [qa-training-app.jar](qa-training-app.jar): The compiled application artifact.

## Stopping the Application
To stop the application and remove the containers, run:

```powershell
docker compose down
```

If you want to remove the database volume as well (to start with a fresh DB next time), run:
```powershell
docker compose down -v
```
