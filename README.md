# cognigy-package-explorer

cognigy-explorer/
├── client/ ✅ React 18 + TypeScript + Vite
│ ├── src/
│ │ ├── main.tsx (Mantine provider)
│ │ ├── App.tsx (dark page)
│ │ └── index.css (Tailwind directives)
│ └── .env (Supabase keys)
├── server/ ✅ Express + TypeScript
│ ├── src/
│ │ └── index.ts (health check live)
│ └── .env (Supabase service key)
├── shared/ ✅ Shared TypeScript types
│ └── types.ts (all data models)
└── package.json ✅ concurrently dev script
