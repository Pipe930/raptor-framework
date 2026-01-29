# Framework Web en TypeScript

Framework web ligero y experimental, inspirado en **Express**, escrito completamente en **TypeScript**. El objetivo del proyecto es aprender, experimentar y construir una base sólida para un framework backend más completo en el futuro.

Actualmente, el enfoque principal está en el **manejo de rutas**, **estructura interna** y **tipado**, dejando funcionalidades avanzadas para etapas posteriores del desarrollo.

---

## 🎯 Objetivos actuales

* Proveer una base simple para registrar y manejar rutas HTTP.
* Mantener una arquitectura clara y extensible.
* Aprovechar TypeScript para mejorar la seguridad y legibilidad del código.
* Servir como proyecto de aprendizaje y evolución progresiva.

---

## ✨ Características actuales

* TypeScript first
* Registro de rutas por método HTTP
* Separación básica entre aplicación y router
* Diseño simple y fácil de extender

---

## 📦 Instalación

```bash
npm install my-framework
```

---

## 🏁 Uso básico

```ts
import { App } from "my-framework";
import { text } from "my-framework/helpers";

const app = App.bootstrap();

app.router.get("/test", (request: Request) => {
  return text("Hello, World!");
});

app.listen(3000);
```

---

## 🛣️ Rutas

Las rutas se registran por método HTTP y path.

```ts
app.router.get("/test/{param}", (request: Request) => {
  return json(request.getlayerParameters());
});

app.router.post("/test", (request: Request) => {
  return json(request.getData());
});
```

Internamente, el framework mantiene una estructura de datos para mapear métodos HTTP a sus rutas correspondientes.

## 🛠️ Middlewares
Para registrar middlewares, tienes que crear una clase que implemente la interfaz `Middleware`, con el metodo handle donde se ejecutara la funcionalidad que quieras que ejecute el middleware, y luego registrar el middleware en la aplicación.

```ts
import { Middleware, Request } from "my-framework/http";
import { Layer } from "my-framework/routes";
import { NextFunction } from "my-framework/utils/types";

class TestMiddleware implements Middleware {
  public async handle(request: Request, next: NextFunction): Promise<Response> {
    if (request.getHeaders["authorization"] !== "test") {
      return json({
        message: "NotAuthenticated",
      }).setStatus(401);
    }

    return await next(request);
  }
}

Layer.get("/testMiddleware", (request: Request) =>
  json({ message: "hola" }),
).setMiddlewares([TestMiddleware]);

```

## 📄 Motor de Plantillas o Vistas
Para poder utilizar el motor de plantillas del framework, debes utilizar el helper `view`, el cual recibe como primer parametro el nombre de la vista (archivo .html) y como segundo parametro un objeto con las variables que quieres pasar a la vista.

```ts
app.router.get("/home", (request: Request) => {
  return view(
    "home", // nombre de la vista (archivo .html)
    {
      title: "Productos",
      products: [
        { name: "Laptop", price: 999.99, inStock: true },
        { name: "Mouse", price: 29.99, inStock: false },
      ],
      user: {
        name: "Juan Pérez",
        role: "admin",
      },
    }, // variables para la vista
    "main", // nombre del layout (opcional) 
  );
});
```

Por ahora el motor se encuentra en una etapa muy temprana de desarrollo, por lo que solo soporta funcionalidades básicas como:
* Renderizado de variables
* Estructuras de control (if, for)
* Layouts
* Helpers simples (uppercase, lowercase, date)
* Helpers personalizados

---

## 🧱 Estado del proyecto

⚠️ **Proyecto en desarrollo temprano**

* EL framework aún no está completo.
* No se encuentra en una versión 100% estable.
* Muchas funcionalidades aún no están implementadas.
* No se recomienda su uso en producción.

---

## 🔮 Roadmap (tentativo)

* Middlewares (✅)
* Motor de plantillas simple (✅)
* Contexto de request/response (✅)
* Manejo de errores
* Validación de datos
* ORM y bases de datos
* Autenticación y autorización
* Sessiones y cookies
* Sistema de plugins

---

## 🧠 Motivación

Este proyecto nace como una forma de entender mejor cómo funcionan frameworks como Express, Fastify o Koa, implementando sus conceptos desde cero y adaptándolos a un enfoque moderno con TypeScript.

---

## 📄 Licencia

MIT
