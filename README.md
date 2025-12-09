# 🛠️ Desafio Técnico — Full Stack Next.js (Pipelore)

Este projeto implementa um sistema simples de **ordens de serviço de reparo**, conforme solicitado no desafio técnico da Pipelore. Inclui listagem, criação, edição e exclusão de ordens, além do endpoint de ordens atrasadas.

---

## 🚀 Tecnologias Utilizadas

- **Next.js 16**
- **React 19**
- **TypeScript 5**
- **Prisma ORM + SQLite**
- **React Hook Form**
- **Zod**
- **React Query**
- **TailwindCSS 4**

---

## 📋 Funcionalidades

### 🔹 Frontend
- Listagem de ordens de serviço  
- Filtro por **Status**  
- Formulário para **Criar** e **Editar** ordens  
- Exclusão com **Modal de confirmação**  
- Validação usando **Zod**

### 🔹 Backend
- CRUD utilizando **Server Actions** e **API Routes**
- Endpoint obrigatório do desafio:
  - `GET /api/repair-orders/late` → retorna ordens com prazo vencido

---

## 🧱 Modelo de Dados (Prisma)

```prisma
enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

enum Status {
  OPEN
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

model OrderRepair {
  id          Int       @id @default(autoincrement())
  title       String
  description String
  location    String
  priority    Priority
  status      Status    @default(OPEN)
  dueDate     DateTime?
  completedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

```

---

## ▶️ Como Executar o Projeto

```bash
npm install
npx prisma migrate dev
npm run dev
```

Acesse: **http://localhost:3000**

---

## 📁 Estrutura Simplificada

```
app/
 ├─ api/
 │   └─ repair-orders/
          └─ late/
 │            └─ route.ts
 |       └─ route.ts
 ├─ repair-orders/
 │   ├─ new/
 │   ├─ [id]/edit/
 │   └─ page.tsx
 ├─ actions.ts
components/
lib/
 └─ orders/
prisma/
 └─ migrations
```

---

## 📞 Contato

Dúvidas técnicas sobre o desafio: **[ gesverzuthe@gmail.com ]**
