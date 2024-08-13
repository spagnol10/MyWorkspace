```markdown
# Configuração de CORS no NestJS

## 1. Configuração Global de CORS

No NestJS, a configuração de CORS geralmente é feita globalmente no arquivo principal da aplicação (`main.ts`). Veja como configurar o CORS para toda a aplicação:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração global de CORS
  app.enableCors({
    origin: '*', // Permite qualquer origem
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Permite cookies e cabeçalhos de autenticação
  });

  await app.listen(3000);
}
bootstrap();
```

Isso garante que todas as rotas na aplicação estejam protegidas ou permitidas conforme a configuração de CORS que você definir.

## 2. Configuração de CORS por Controller ou Rota

Se for necessário habilitar CORS apenas para uma rota ou controller específico, você pode usar o decorador `@Header` diretamente na controller:

### Usando o decorador `@Header` na Controller:

```typescript
import { Controller, Get, Header } from '@nestjs/common';

@Controller('exemplo')
export class ExemploController {
  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Methods', 'GET, POST')
  async getExemplo() {
    return { message: 'Hello NestJS!' };
  }
}
```

### Usando um Middleware Específico:

Outra opção seria aplicar o middleware CORS apenas para as rotas desejadas. No entanto, isso é menos comum, e a configuração global costuma ser suficiente.

## 3. Utilizar um Middleware de Terceiros

Você também pode configurar um middleware de terceiros, como o `cors`, de forma semelhante ao que fizemos no Next.js:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Usando o middleware cors
  app.use(cors({
    origin: '*',
    methods: ['GET', POST', 'PUT', 'DELETE'],
  }));

  await app.listen(3000);
}
bootstrap();
```
```
