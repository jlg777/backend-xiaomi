# backend-xiaomi

<div>
  <p style="text-align:center">
    <img align="center" src="./public/programador.png" alt="JuveYell" width="300px">
  </p>
</div>
<h2 align="center" style="color:#CD5C5C">
  JLG'777'
  <img src="https://github.com/blackcater/blackcater/raw/main/images/Hi.gif" height="22" />
</h2>
<p align="center">
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&duration=4000&pause=1000&multiline=true&random=false&width=435&lines=Un+proyecto+creado+por+J0RG1T0" alt="Typing SVG" />
  </a>
</p>
<hr>

## 📧 Conéctate conmigo

[![GMAIL](https://img.shields.io/badge/Gmail-Gmail?style=white&logo=Gmail&logoColor=white&color=%23EA4335)](mailto:proyectojlg777@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-LinkedIn?style=white&logo=LinkedIn&logoColor=white&color=%230A66C2)](https://linkedin.com/in/)
[![Discord](https://img.shields.io/badge/Discord-Discord?style=white&logo=Discord&logoColor=white&color=%235865F2)](https://discordapp.com/users/jorgeg777#9720)

# Xiaomi Backend

**backend-xiaomi** es una API REST desarrollada con **Node.js**, **Express 5** y **MongoDB** (Mongoose). Incluye autenticación con JWT, roles, gestión de productos, usuarios y órdenes, más carga de avatars.

## 🚀 Características

- API RESTful para productos, usuarios y órdenes.
- Autenticación con JWT y control de roles (admin/user).
- CRUD completo para productos y usuarios.
- Creación y gestión de órdenes con estados.
- Paginación y filtro por categoría en productos.
- Upload de avatar con Multer.
- Conexión a MongoDB Atlas (configurable por .env).
- Rutas organizadas por recursos y middlewares.

## 🧰 Requisitos

- Node.js 18+ (recomendado)
- MongoDB Atlas o local
- npm

## ⚙️ Instalación y ejecución

1. Instalar dependencias:

```bash
npm install
```

2. Crear `.env` en la raíz del proyecto con estas variables:

```env
PORT=3000
MONGO_URI=mongodb+srv://usuario:password@cluster/tu_db
SALT_ROUND_HASH=10
JWT_SECRET=tu_clave_secreta
MONGO_LOCAL=mongodb://localhost:27017
```

3. Ejecutar en desarrollo:

```bash
npm start
```

## 🧪 Scripts

- `npm start` inicia el servidor con nodemon.
- `npm run lint` ejecuta eslint en `src/**/*.js`.
- `npm run lint:fix` corrige issues automáticos de eslint.
- `npm run format` ejecuta prettier sobre `src/**/*.js`.

## 📁 Estructura de carpetas

```text
backend-xiaomi/
│
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── server.js
│   ├── controllers/
│   ├── middleware/
│   ├── mock/
│   ├── models/
│   ├── postman/
│   ├── routes/
│   ├── app.js
│   └── index.js
├── uploads/
├── .env
├── package.json
├── README.md
└── .vscode/
```

## 🚦 Autenticación

- Header requerido: `Authorization: Bearer <token>`
- El token se obtiene en `POST /user/login`.
- Roles usados en el token: `admin` y `user` (también existe `client` a nivel de modelo, no habilitado en rutas).

## 📸 Endpoints

**Base**

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/` | Health check: "Servidor funcionando correctamente". |

**Usuarios**

| Método | Ruta | Auth/Rol | Descripción |
| --- | --- | --- | --- |
| GET | `/user` | Bearer | Valida token y devuelve `req.user`. |
| GET | `/user/all` | admin | Lista todos los usuarios. |
| GET | `/user/all/:id` | user/admin | Devuelve un usuario por id. |
| POST | `/user` | Público | Crea usuario (admite avatar). |
| PUT | `/user/:id` | user/admin | Actualiza usuario (name, email, password, avatar). |
| DELETE | `/user/:id` | admin | Elimina usuario. |
| POST | `/user/login` | Público | Login y emisión de JWT. |

**Productos**

| Método | Ruta | Auth/Rol | Descripción |
| --- | --- | --- | --- |
| GET | `/products` | Público | Lista productos con paginado y filtro. |
| GET | `/products/:id` | admin | Producto por id. |
| POST | `/products` | admin | Crear producto. |
| PUT | `/products/:id` | admin | Actualizar producto. |
| DELETE | `/products/:id` | admin | Eliminar producto. |

**Órdenes**

| Método | Ruta | Auth/Rol | Descripción |
| --- | --- | --- | --- |
| POST | `/orders` | user/admin | Crear orden. |
| GET | `/orders/users` | admin | Listar todas las órdenes. |
| GET | `/orders/user` | user/admin | Órdenes del usuario autenticado. |
| GET | `/orders/:id` | user/admin | Orden por id (solo owner/admin). |
| PUT | `/orders/:id` | admin | Actualizar estado de orden. |
| DELETE | `/orders/:id` | user/admin | Eliminar orden (owner/admin). |

**Errores de prueba**

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/test-errors/401` | Respuesta 401. |
| GET | `/test-errors/403` | Respuesta 403. |
| GET | `/test-errors/404` | Respuesta 404. |
| GET | `/test-errors/500` | Respuesta 500. |

## 🧾 Paginación y filtros (productos)

- `GET /products?page=1&limit=10&category=Smartphones`
- `category` acepta: `Smartphones`, `Wearables`, `Accessories`, `Home Appliances`, `Electronics`.
- `page` y `limit` por defecto: `1`.

## 📦 Órdenes: reglas de estado

Transiciones válidas: `pending -> paid/cancelled`, `paid -> shipped/cancelled`, `shipped -> delivered`. Los estados `delivered` y `cancelled` no aceptan cambios.

## 📤 Subida de avatar

Usar `multipart/form-data` con el campo `avatar` en:

- `POST /user`
- `PUT /user/:id`

Los archivos se guardan en `uploads/`.

## 🌐 CORS

Orígenes habilitados:

- `http://localhost:5173`
- `http://127.0.0.1:5173`
- `https://fronten-xiaomi-react.vercel.app`

## 🧩 Modelos (resumen)

**Producto**

| Campo | Tipo | Notas |
| --- | --- | --- |
| name | string | Requerido, único, 3-100 chars. |
| image | string | Opcional, tiene default. |
| price | number | Requerido, min 0. |
| category | string | Enum: Smartphones, Wearables, Accessories, Home Appliances, Electronics. |
| description | string | Requerido, 10-2000 chars. |
| createdAt | date | Auto. |

**Usuario**

| Campo | Tipo | Notas |
| --- | --- | --- |
| name | string | Requerido, solo letras y espacios. |
| avatar | string | Opcional, tiene default. |
| roleAdmin | string | Enum: admin, user, client. |
| email | string | Requerido, único. |
| password | string | Requerido, hasheado. |
| createdAt | date | Auto. |

**Orden**

| Campo | Tipo | Notas |
| --- | --- | --- |
| user | ObjectId | Ref: user. |
| items | array | `{ product, quantity, priceAtPurchase }`. |
| total | number | Requerido, min 0. |
| status | string | Enum: pending, paid, shipped, delivered, cancelled. |
| paymentMethod | string | Enum: card, paypal, cash, transfer. |
| shippingAddress | object | `{ street, city, zip, country }`. |
| createdAt | date | Auto. |

## 📸 Postman

Puedes importar la colección `src/postman/digitalers.postman_collection.json` en Postman para probar los endpoints.

---
## ✒️ Autor

**Jorge Grandía** - [JLG777](https://github.com/jlg777)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más información.

## 🎁 Expresiones de Gratitud

- Comenta a otros sobre este proyecto 📢
- Invita una cerveza 🍺 o un café ☕ a alguien del equipo.
- Da las gracias públicamente 🤓.
- Dona con cripto a esta dirección:
  - (btc) 16ApGFxMXfF8ktysSkmLBzLEJPHubtwKjp
  - (btc-SegWit) bc1q0v8fvv3gvga02h9xspcg7npghjfyny20lavc37
  - (Ethereum) 0x1ee2842c194c95bc54473c6b27d602fc0bfc81a9

---

⌨️ con ❤️ por JLG777 😊

_Copyright (c) 2025 [jlg777]_
