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
import { App, Router } from "my-framework";

const app = new App();
const router = new Router();

router.get("/", () => {
  return "Hello world";
});

app.use(router);
app.listen(3000);
```

---

## 🛣️ Rutas

Las rutas se registran por método HTTP y path.

```ts
router.post("/users", () => {
  return { message: "User created" };
});
```

Internamente, el framework mantiene una estructura de datos para mapear métodos HTTP a sus rutas correspondientes.

---

## 🧱 Estado del proyecto

⚠️ **Proyecto en desarrollo temprano**

* La API puede cambiar sin previo aviso.
* Muchas funcionalidades aún no están implementadas.
* No se recomienda su uso en producción.

---

## 🔮 Roadmap (tentativo)

* Middlewares
* Manejo de errores
* Contexto de request/response
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
