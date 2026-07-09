# 📖 Epilogue Lab — Digital Life Lessons

A full-stack platform where people preserve, share, and learn from real life experiences. Turn personal wisdom into timeless lessons that inspire others.

## 🌐 Live URL

🔗 [https://epiloguelab.vercel.app](https://epiloguelab.vercel.app)

---

## 🔐 Admin Credentials

| Field    | Value                  |
|----------|------------------------|
| Email    | admin@admin.com  |
| Password | Admin123              |

---

## ✨ Key Features

### For Everyone
- 🔍 Browse public life lessons with search, filter, sort, and pagination
- 🎭 Filter by category (Career, Mindset, Relationships, etc.) and emotional tone
- 🏠 Dynamic home page with featured lessons, top contributors, and most saved

### For Registered Users
- ✍️ Create and publish life lessons (title, description, category, tone, visibility)
- 🔒 Set lessons as Public or Private
- 💾 Save favorite lessons and manage them from dashboard
- ❤️ Like lessons with real-time count update
- 💬 Comment on lessons with optimistic UI
- 🚩 Report inappropriate content
- 📊 Personal dashboard with stats and recent activity
- 👤 Profile page with edit functionality

### For Premium Members ⭐
- 🌟 Create Premium-only lessons (hidden from free users)
- 🔓 Access all Premium lessons from other creators
- 🏷️ Premium badge on profile and cards

### For Admins 🛡️
- 📋 Manage all users — view, promote to admin
- 📚 Manage all lessons — feature/unfeature, delete
- 🚩 Review reported lessons — delete or ignore
- 📈 Platform stats dashboard (users, lessons, reports, premium users)

### Payments
- 💳 Stripe-powered monthly subscription for Premium access
- ✅ Automatic `isPremium` update on successful payment
- 🎉 Payment success page with confirmation

### Auth
- 📧 Email & password authentication (BetterAuth)
- 🔑 Google OAuth login
- 🛡️ Role-based protected routes (user / admin)
- 🔄 Redirect after login support

---

## 🛠️ Tech Stack

### Frontend
| Package | Purpose |
|---|---|
| Next.js 15 | App Router, Server Components |
| HeroUI v3 | UI component library |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| BetterAuth | Authentication client |
| Stripe.js | Payment integration |
| react-hot-toast | Toast notifications |
| @gravity-ui/icons | Icon library |

### Backend
| Package | Purpose |
|---|---|
| Express.js | REST API server |
| MongoDB | Database |
| BetterAuth | Auth adapter |
| Stripe | Payment processing |
| dotenv | Environment variables |
| cors | Cross-origin requests |

---



## 🌐 Environment Variables

### Frontend `.env.local`
```
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=https://epiloguelab.vercel.app
MONGODB_URI=
NEXT_PUBLIC_BASE_URL=https://your-backend.onrender.com
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
STRIPE_SECRET_KEY=
```

### Backend `.env`
```
MONGODB_URI=
PORT=5000
STRIPE_SECRET_KEY=
STRIPE_PRICE_ID=
CLIENT_URL=https://epiloguelab.vercel.app
```

---

## 🚀 Getting Started

### Frontend
```bash
cd epiloguelab
npm install
npm run dev
```

### Backend
```bash
cd epiloguelab-server
npm install
node index.js
```

---

## 🔒 Auth Architecture

- BetterAuth handles session via MongoDB `session` collection
- Custom `verifyToken` middleware reads Bearer token from headers
- `requireRole(role)` utility protects dashboard routes server-side
- `protectedFetch()` and `serverMutation()` auto-attach auth headers

---

## 💳 Payment Flow

```
User clicks "Upgrade" → POST /api/create-checkout-session
→ Stripe hosted checkout page
→ Payment success → /pricing/success?session_id=...
→ stripe.checkout.sessions.retrieve() → verify payment
→ POST /api/payment-success → isPremium: true in MongoDB
```

---

## 📄 License

This project was built as an educational assignment. All rights reserved © Epilogue Lab.
