# Math Blaster Frontend

React + TypeScript + Vite frontend application for Math Blaster.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Project Structure

```
src/
├── components/    # React components
├── utils/         # Utility functions
├── types/         # TypeScript type definitions
├── api/           # API client functions
├── hooks/         # Custom React hooks
├── App.tsx        # Main app component
├── main.tsx       # Entry point
└── index.css      # Global styles
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

The development server will start at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Code Quality

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## Development Notes

- All components should be placed in `src/components/`
- API client functions go in `src/api/`
- Custom hooks go in `src/hooks/`
- Type definitions go in `src/types/`
- Utility functions go in `src/utils/`
