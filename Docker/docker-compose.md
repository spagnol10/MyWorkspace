# Summary of `docker-compose.yml`

This file configures two main services: `postgres` and `nest`.

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:16
    container_name: postgres
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  nest:
    build: .
    container_name: nest
    depends_on:
      - postgres
    environment:
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_USER: myuser
      DATABASE_PASSWORD: mypassword
      DATABASE_NAME: mydb
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    command: npm run start:dev

volumes:
  postgres_data:

  # Services

## `postgres`

- **Image**: `postgres:16`
- **Environment Variables**:
  - `POSTGRES_DB`: Database name (`mydb`)
  - `POSTGRES_USER`: Database user (`myuser`)
  - `POSTGRES_PASSWORD`: Database password (`mypassword`)
- **Ports**: Maps port 5432 of the container to port 5432 on the host.
- **Volumes**: `postgres_data` for persisting database data.

## `nest`

- **Build**: Builds from the Dockerfile in the current directory.
- **Dependencies**: Depends on the `postgres` service.
- **Environment Variables**:
  - `DATABASE_HOST`: Database address (`postgres`)
  - `DATABASE_PORT`: Database port (`5432`)
  - `DATABASE_USER`: Database user (`myuser`)
  - `DATABASE_PASSWORD`: Database password (`mypassword`)
  - `DATABASE_NAME`: Database name (`mydb`)
- **Ports**: Maps port 3000 of the container to port 3000 on the host.
- **Volumes**: Mounts the current directory (`.`) in the container and excludes the `node_modules` directory.
- **Command**: Runs `npm run start:dev` to start the application in development mode.

# Volumes

- **`postgres_data`**: Volume for persisting PostgreSQL data.