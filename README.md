# 🤖 AI Chat — Asistente con Gemini / Gemini AI Assistant

[![Turborepo](https://img.shields.io/badge/Turborepo-2.x-EF4444?style=flat-square&logo=turborepo)](https://turbo.build)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-Latest-08A854?style=flat-square)](https://orm.drizzle.team)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.5_Flash-4285F4?style=flat-square&logo=google)](https://ai.google.dev)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com)

**Chat gratis con Gemini 2.5 Flash.** | **Free chat with Gemini 2.5 Flash.**

Una aplicación fullstack de chat con inteligencia artificial impulsada por los modelos gratuitos de Google Gemini. Construida con Next.js 14, TypeScript estricto y alojada en Vercel sin costo.

A fullstack AI chat application powered by Google's free Gemini models. Built with Next.js 14, strict TypeScript, and hosted on Vercel for free.

---

## ✨ Características / Features

- ⚡ **Streaming en tiempo real** — Respuestas instantáneas con Gemini 2.5 Flash usando Vercel AI SDK
- 🆓 **100% Gratis** — API Key sin tarjeta de crédito en [Google AI Studio](https://aistudio.google.com/apikey)
- 🔄 **Dos modelos gratuitos** — Selector entre Gemini 2.5 Flash (equilibrio) y Gemini 2.5 Flash-Lite (velocidad)
- 💾 **Historial persistente** — Conversaciones guardadas en SQLite con Drizzle ORM
- 🔐 **Autenticación** — Email/contraseña con NextAuth.js v5 y bcrypt (12 salt rounds)
- 🌙 **Dark/Light Mode** — Tema adaptable con next-themes
- 🌐 **Bilingüe ES/EN** — Interfaz en español (por defecto) e inglés
- 📦 **Monorepo profesional** — Turborepo + pnpm workspaces + TypeScript estricto
- 🚀 **Deploy gratuito** — Listo para Vercel (plan gratuito)

---

## 🏗️ Arquitectura / Architecture

```
ai-chat/
├── apps/
│   └── web/                          # Next.js 14 fullstack (frontend + API)
│       ├── app/
│       │   ├── globals.css           # Estilos globales + Tailwind
│       │   ├── layout.tsx            # Root layout
│       │   ├── page.tsx              # Landing page
│       │   ├── (auth)/               # Auth routes group
│       │   │   ├── layout.tsx        # Auth layout
│       │   │   ├── login/page.tsx    # Login
│       │   │   └── register/page.tsx # Registro
│       │   ├── (chat)/               # Chat routes group (protected)
│       │   │   ├── layout.tsx        # Chat layout + sidebar
│       │   │   ├── chat/
│       │   │   │   ├── page.tsx      # Nueva conversación
│       │   │   │   └── [id]/page.tsx # Conversación existente
│       │   └── api/                  # API routes (fullstack)
│       │       ├── auth/[...nextauth]/route.ts
│       │       ├── auth/register/route.ts
│       │       └── chat/route.ts     # Streaming de IA
│       ├── components/
│       │   ├── auth/                 # Formularios login/registro
│       │   ├── chat/                 # Chat UI (input, message, sidebar)
│       │   ├── layout/               # Header, theme toggle
│       │   ├── providers/            # Session + Theme providers
│       │   └── ui/                   # shadcn/ui components
│       ├── hooks/                    # React hooks custom
│       ├── lib/
│       │   ├── auth.ts               # NextAuth config
│       │   ├── auth-helpers.ts       # Utilidades auth
│       │   ├── ai/
│       │   │   └── providers.ts      # Google Gemini SDK config
│       │   └── db/
│       │       ├── index.ts          # Drizzle client
│       │       ├── schema.ts         # Tablas: users, conversations, messages, chat_sessions
│       │       └── migrations/       # SQL migrations
│       ├── middleware.ts             # Auth middleware
│       ├── package.json
│       ├── tsconfig.json
│       ├── next.config.js
│       ├── tailwind.config.ts
│       ├── drizzle.config.ts
│       └── .env.local               # Variables de entorno
│
├── packages/
│   ├── ai-core/                      # Shared AI logic
│   │   ├── src/
│   │   │   ├── gemini.ts            # Google Gemini provider
│   │   │   └── index.ts             # Exports
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── types/                        # Shared types
│   │   ├── src/
│   │   │   └── index.ts             # Type definitions
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── ui/                           # Shared UI components (shadcn/ui)
│       ├── src/
│       │   ├── index.ts
│       │   └── utils.ts
│       ├── package.json
│       └── tsconfig.json
│
├── turbo.json                        # Turborepo config
├── pnpm-workspace.yaml               # pnpm workspaces config
├── pnpm-lock.yaml                    # Lock file (generated)
├── package.json                      # Root workspace
├── tsconfig.json                     # TypeScript base config
└── README.md                         # Este archivo
```

**Descripción de cada carpeta:**

- **`apps/web/`** — Aplicación Next.js 14 fullstack. Frontend + API routes en un mismo proyecto (App Router).
- **`packages/ai-core/`** — Lógica compartida de IA. Integraciones con Google Gemini.
- **`packages/types/`** — Tipos TypeScript compartidos entre workspaces.
- **`packages/ui/`** — Componentes UI reutilizables (shadcn/ui).

---

## 🚀 Inicio Rápido / Quick Start

### Prerrequisitos / Prerequisites

- **Node.js** 20+ ([descargar](https://nodejs.org))
- **pnpm** 9+ (`npm install -g pnpm`)
- **Cuenta en Google AI Studio** (gratis, sin tarjeta de crédito) — [ir aquí](https://aistudio.google.com/apikey)

### Pasos / Steps

#### 1. Clonar el repositorio / Clone the repository
```bash
git clone https://github.com/tuusuario/ai-chat.git
cd ai-chat
```

#### 2. Obtener API Key gratuita / Get free API Key
Ve a [Google AI Studio](https://aistudio.google.com/apikey) y crea una API Key gratuita (sin tarjeta de crédito).

Go to [Google AI Studio](https://aistudio.google.com/apikey) and create a free API Key (no credit card needed).

#### 3. Configurar variables de entorno / Set environment variables
```bash
# En apps/web/, crear .env.local:
# In apps/web/, create .env.local:

cp .env.example .env.local
```

Editar `.env.local` con:

Edit `.env.local` with:
```env
# Google Gemini API
GOOGLE_GENERATIVE_AI_API_KEY=tu-api-key-aqui

# NextAuth (generar con: openssl rand -base64 32)
NEXTAUTH_SECRET=tu-secret-aqui
NEXTAUTH_URL=http://localhost:3000

# Base de datos (SQLite para desarrollo)
DATABASE_URL=file:./dev.db
```

#### 4. Instalar dependencias / Install dependencies
```bash
pnpm install
```

#### 5. Configurar base de datos / Setup database
```bash
cd apps/web
pnpm db:generate   # Generar Drizzle client
pnpm db:migrate    # Ejecutar migraciones
cd ../..
```

#### 6. Iniciar servidor de desarrollo / Start dev server
```bash
pnpm dev
```

Se abrirán:
- **http://localhost:3000** — Aplicación web

#### 7. Registrarse y chatear / Sign up and chat
1. Ve a `http://localhost:3000`
2. Haz clic en "Registrarse" (Register)
3. Crea una cuenta con email y contraseña
4. Inicia chat y selecciona un modelo de Gemini
5. ¡A chatear!

Go to `http://localhost:3000`, register, and start chatting!

---

## 🆓 API Gratuita de Gemini / Free Gemini API

Google ofrece dos modelos **100% gratuitos** sin tarjeta de crédito:

Google offers two **100% free** models without credit card:

### Límites del Plan Gratuito (Junio 2026)

| Modelo | RPM | RPD | Context | Descripción |
|--------|-----|-----|---------|-------------|
| **Gemini 2.5 Flash** | 10 | 250 | 1M tokens | Equilibrio velocidad/calidad. Recomendado. |
| **Gemini 2.5 Flash-Lite** | 15 | 1,000 | 1M tokens | Máxima velocidad. Ideal para uso frecuente. |

**Notas:**
- **RPM** = Requests Per Minute (solicitudes por minuto)
- **RPD** = Requests Per Day (solicitudes por día)
- Los límites se reinician a **medianoche PT (Pacific Time)**
- Los límites son **por proyecto** en Google AI Studio, no por API Key
- Cambios frecuentes: verifica [documentación oficial](https://ai.google.dev/pricing) para valores actualizados

### Privacidad en el Plan Gratuito

⚠️ **Importante:** En el plan gratuito, Google puede usar los datos enviados a sus modelos para mejorar sus productos y servicios.

Si necesitas **privacidad total**, considera:
1. Plan de pago de Google AI Studio (pago por uso)
2. Ejecutar modelos localmente (Ollama, LLaMA)
3. Otros proveedores (OpenAI, Anthropic, etc.)

Para esta app, el plan gratuito es suficiente para **desarrollo, testing y uso personal**.

---

## 🔐 Autenticación / Authentication

### Cómo funciona / How it works

La autenticación usa **email/contraseña** con NextAuth.js v5 (Auth.js):

1. **Registro** — Validar email único, hashear contraseña con bcrypt (12 salt rounds), guardar en BD
2. **Login** — Comparar contraseña con hash, generar sesión JWT
3. **Middleware** — Proteger rutas `/chat` requiriendo sesión válida
4. **Logout** — Destruir sesión

### Archivos clave / Key files

- `lib/auth.ts` — Configuración NextAuth
- `app/api/auth/[...nextauth]/route.ts` — Handler NextAuth
- `app/api/auth/register/route.ts` — Endpoint de registro
- `middleware.ts` — Protección de rutas

### Seguridad / Security

- Contraseñas hasheadas con **bcryptjs** (12 salt rounds)
- Variables sensibles en `.env.local` (no en Git)
- CSRF protection automática de NextAuth
- Sesiones seguras con JWT

---

## 🗄️ Base de Datos / Database

### Esquema / Schema

4 tablas en SQLite:

#### **users**
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
```

#### **conversations**
```sql
CREATE TABLE conversations (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  title TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
```

#### **messages**
```sql
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL REFERENCES conversations(id),
  role TEXT NOT NULL, -- 'user' | 'assistant'
  content TEXT NOT NULL,
  model TEXT, -- Modelo usado (gemini-2.5-flash, etc)
  created_at INTEGER NOT NULL
);
```

#### **chat_sessions**
```sql
CREATE TABLE chat_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  conversation_id TEXT REFERENCES conversations(id),
  selected_model TEXT NOT NULL, -- Modelo seleccionado por el usuario
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
```

### Comandos Drizzle / Drizzle Commands

```bash
cd apps/web

# Generar Drizzle client desde schema.ts
pnpm db:generate

# Crear nuevo migration (después de cambiar schema.ts)
pnpm db:migrate

# Ejecutar migrations pendientes
pnpm db:migrate

# Ver interfaz web de Drizzle Studio
pnpm db:studio
```

### Para Producción / For Production

En Vercel, reemplaza SQLite local con **Turso** (libSQL hosted):

1. Crear cuenta gratuita en [turso.tech](https://turso.tech)
2. Crear base de datos: `turso db create ai-chat-prod`
3. Obtener token: `turso auth tokens create`
4. En Vercel, agregar variable `DATABASE_URL=libsql://...?authToken=...`

---

## 🚢 Despliegue en Vercel / Vercel Deployment

### Pasos / Steps

#### 1. Push a GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

#### 2. Importar en Vercel
- Ve a [vercel.com/new](https://vercel.com/new)
- Conecta tu repositorio GitHub
- Selecciona `ai-chat`

#### 3. Configurar proyecto / Configure project
- **Framework:** Next.js (detectado automáticamente)
- **Root Directory:** `apps/web`
- **Build Command:** (dejar por defecto, Turborepo lo optimiza)

#### 4. Agregar variables de entorno / Add environment variables

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` | Generar localmente, no compartir |
| `NEXTAUTH_URL` | `https://tu-app.vercel.app` | Tu dominio en Vercel |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Tu API Key | De Google AI Studio |
| `DATABASE_URL` | `libsql://...?authToken=...` | De Turso (si no usas SQLite) |

#### 5. Deploy
- Haz clic en **Deploy**
- Espera ~3 minutos

#### 6. Base de datos en producción / Production database

Para usar Turso (libSQL):

```bash
# Instalar CLI
npm install -g turso

# Crear DB
turso db create ai-chat-prod

# Ver URL y token
turso db show ai-chat-prod

# Copiar DATABASE_URL a Vercel
turso db tokens create --db ai-chat-prod
```

#### 7. Ejecutar migraciones / Run migrations

En tu máquina:
```bash
DATABASE_URL=libsql://... pnpm db:migrate
```

O desde Vercel CLI:
```bash
vercel env pull
cd apps/web && pnpm db:migrate
```

### Límites del Plan Gratuito / Free Plan Limits

- **maxDuration:** 10 segundos (excepto funciones de pago)
- **No usar Edge Runtime** con libSQL (usa Node.js runtime)
- **Almacenamiento:** 100 MB para Turso gratuito

---

## 📁 Estructura del Proyecto / Project Structure

### Archivos importantes / Key files

```
apps/web/
├── app/
│   ├── api/chat/route.ts                # 🤖 Streaming de IA (endpoint principal)
│   ├── api/auth/register/route.ts       # 📝 Registro de usuarios
│   ├── (chat)/chat/page.tsx             # 💬 Nueva conversación
│   ├── (chat)/chat/[id]/page.tsx        # 💬 Conversación existente
│   ├── (auth)/login/page.tsx            # 🔐 Login
│   └── (auth)/register/page.tsx         # 🔐 Registro
├── components/
│   ├── chat/chat-interface.tsx          # 🎨 UI principal del chat
│   ├── chat/chat-input.tsx              # ⌨️ Input + envío
│   ├── chat/chat-sidebar.tsx            # 📋 Historial conversaciones
│   ├── chat/model-selector.tsx          # 🔄 Selector Gemini 2.5
│   └── auth/login-form.tsx              # 🔑 Formulario login
├── lib/
│   ├── ai/providers.ts                  # 🤖 Google Gemini SDK
│   ├── auth.ts                          # 🔐 NextAuth config
│   ├── db/schema.ts                     # 🗄️ Drizzle schema
│   └── db/index.ts                      # 🗄️ Drizzle client
├── middleware.ts                        # 🛡️ Auth middleware
└── package.json

packages/
├── ai-core/
│   └── src/gemini.ts                    # 🤖 Lógica Gemini reutilizable
├── types/
│   └── src/index.ts                     # 📦 Tipos compartidos
└── ui/
    └── src/utils.ts                     # 🎨 Utilidades UI
```

### Archivo `.env.local` (no en Git)

```env
# Google Gemini
GOOGLE_GENERATIVE_AI_API_KEY=sk-...

# NextAuth
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000

# Base de datos
DATABASE_URL=file:./dev.db
```

---

## 🤝 Contribuir / Contributing

### Workflow

1. **Fork** el repositorio
2. Crea una rama: `git checkout -b feat/tu-feature`
3. Commits convencionales: `git commit -m "feat: descripción"`
4. Push: `git push origin feat/tu-feature`
5. Abre un Pull Request

### Commits convencionales / Conventional commits

```
feat:     Nueva funcionalidad
fix:      Corrección de bug
docs:     Cambios en documentación
style:    Formato, semicolons, etc (no lógica)
refactor: Cambio de código sin feat/fix
test:     Agregar tests
```

Ejemplo:
```bash
git commit -m "feat: agregar selector de modelos Gemini"
```

---

## 📄 Licencia / License

MIT License

Copyright (c) 2026 AI Chat Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## 📞 Soporte / Support

- 📚 [Documentación Next.js 14](https://nextjs.org/docs)
- 🤖 [Google Generative AI SDK](https://ai.google.dev)
- 🗄️ [Drizzle ORM Docs](https://orm.drizzle.team)
- 🔐 [NextAuth.js v5](https://authjs.dev)
- 🎨 [Tailwind CSS](https://tailwindcss.com)
- 🧩 [shadcn/ui](https://ui.shadcn.com)

---

**Hecho con ❤️ — Made with ❤️**
