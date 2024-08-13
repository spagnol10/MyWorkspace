## LoggingMiddleware Implementation in NestJS

### Overview

This document describes the implementation of a custom logging middleware in NestJS. The middleware logs request details, including method and URL, and the response status code and timing.

### Middleware Implementation

1. **Create the Middleware Class**

   ```typescript
   import { Injectable, NestMiddleware } from '@nestjs/common';
   import { Request, Response, NextFunction } from 'express';

   @Injectable()
   export class LoggingMiddleware implements NestMiddleware {
     use(req: Request, res: Response, next: NextFunction) {
       const { method, originalUrl: url } = req;
       const reqTime = new Date().toISOString(); // Standardized time format

       console.log(`[${reqTime}] ${method} ${url}`);

       // Listener to log response status code and time
       res.on('finish', () => {
         const resTime = new Date().toISOString();
         console.log(`[${resTime}] ${method} ${url} ${res.statusCode}`);
       });

       next(); // Pass the request to the next middleware or handler
     }
   }
   ```

2. **Register the Middleware**
To ensure the middleware is applied, register it in the appropriate module:

```typescript
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { LoggingMiddleware } from './logging.middleware';

@Module({})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes('*'); // Apply middleware to all routes
  }
}
```
