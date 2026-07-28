# Motadata React Library

A production-ready React component library for building SaaS platforms and custom applications. Built with React 18+, TypeScript, Tailwind CSS, and Radix UI primitives.

## Features

- **Accessible**: Built on Radix UI primitives with full keyboard navigation and screen reader support
- **Customizable**: Tailwind CSS-based styling with CSS variables for theming
- **Type-Safe**: Written in TypeScript with strict mode enabled
- **Tree-Shakeable**: Only import what you need
- **Well-Documented**: Comprehensive Storybook documentation with examples

## Installation

```bash
npm install motadata-react-library
```

### Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install react react-dom
```

## Quick Start

### 1. Import Styles

Import the library styles in your app's entry point:

```tsx
// In your main entry file (e.g., main.tsx or App.tsx)
import 'motadata-react-library/styles.css';
```

### 2. Add CSS Variables

Add the following CSS variables to your root CSS or Tailwind config:

```css
:root {
  --mdt-background: 0 0% 100%;
  --mdt-foreground: 222.2 84% 4.9%;
  --mdt-primary: 221.2 83.2% 53.3%;
  --mdt-primary-foreground: 210 40% 98%;
  /* ... see full list in src/styles/globals.css */
}
```

### 3. Use Components

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle } from 'motadata-react-library';

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="primary">Get Started</Button>
      </CardContent>
    </Card>
  );
}
```

## Components

### Button

A versatile button component with multiple variants and sizes.

```tsx
import { Button } from 'motadata-react-library';

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// With icons
<Button leftIcon={<PlusIcon />}>Add Item</Button>

// Loading state
<Button loading>Submitting...</Button>
```

### Input

A text input component with labels, validation, and adornments.

```tsx
import { Input } from 'motadata-react-library';

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  error="Invalid email address"
  helperText="We'll never share your email"
/>;
```

### Card

A container component for grouping related content.

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from 'motadata-react-library';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>;
```

### Dialog

An accessible modal dialog built with Radix UI.

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
} from 'motadata-react-library';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description</DialogDescription>
    </DialogHeader>
    <p>Dialog content</p>
    <DialogFooter>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>;
```

### DropdownMenu

A dropdown menu for actions and navigation.

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Button,
} from 'motadata-react-library';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>;
```

## Utilities

### cn() - Class Name Utility

Merge Tailwind CSS classes with proper conflict resolution:

```tsx
import { cn } from 'motadata-react-library';

<div className={cn('px-4 py-2', isActive && 'bg-blue-500', className)} />;
```

## Development

### Prerequisites

- Node.js 18+
- npm 10+

### Setup

```bash
# Clone the repository
git clone https://github.com/motadata/motadata-react-library.git
cd motadata-react-library

# Install dependencies
npm install

# Start Storybook for development
npm run storybook
```

### Available Scripts

| Script                      | Description                            |
| --------------------------- | -------------------------------------- |
| `npm run dev`               | Start Vite dev server                  |
| `npm run build`             | Build the library                      |
| `npm run test`              | Run tests                              |
| `npm run test:coverage`     | Run tests with coverage                |
| `npm run lint`              | Lint the codebase                      |
| `npm run format`            | Format code with Prettier              |
| `npm run storybook`         | Start Storybook dev server             |
| `npm run build-storybook`   | Build Storybook static site            |
| `npm run test:storybook`    | Run Storybook interaction & a11y tests |
| `npm run test:storybook:ci` | Build Storybook & run all tests        |

### Project Structure

```text
src/
├── components/       # UI components
│   ├── Button/       # Button
│   ├── Input/        # Input
│   ├── Card/         # Card
│   ├── Dialog/       # Dialog
│   └── Dropdown/     # DropdownMenu
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
├── types/           # Shared TypeScript types
├── styles/          # Global styles
└── index.ts         # Main exports
```

### Component Structure

Each component follows this structure:

```text
ComponentName/
├── ComponentName.tsx        # Component implementation
├── ComponentName.types.ts   # TypeScript types
├── ComponentName.test.tsx   # Unit tests
├── ComponentName.stories.tsx # Storybook stories
└── index.ts                 # Exports
```

### Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Building

```bash
# Build the library
npm run build

# Check bundle size
npm run size
```

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test changes
- `chore:` - Build/tooling changes

### Creating a Changeset

When making changes that should be published:

```bash
npm run changeset
```

## License

MIT - see [LICENSE](./LICENSE) for details.

## Links

- [Storybook Documentation](https://motadata.github.io/motadata-react-library)
- [GitHub Repository](https://github.com/motadata/motadata-react-library)
- [npm Package](https://www.npmjs.com/package/motadata-react-library)
