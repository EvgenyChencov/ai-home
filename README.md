# User Management System

A responsive React application that displays and manages user data from the JSONPlaceholder API. Features a modern table-like interface with detailed user modals and delete functionality.

## Features

- 📊 **User Table Display**: Clean table layout showing user information in organized columns
- 🔍 **User Detail Modal**: Comprehensive user information with address mapping
- 🗑️ **User Management**: Delete users with confirmation dialogs
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- ♿ **Accessibility**: Full keyboard navigation and ARIA attributes
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations

## Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **CSS Modules** for component-scoped styling
- **JSONPlaceholder API** for user data

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/           # React components
│   ├── UserTable.tsx    # Main table component
│   ├── UserRow.tsx      # Individual user row
│   ├── UserModal.tsx    # User detail modal
│   └── *.module.css     # Component styles
├── services/            # API services
│   └── userService.ts   # User data fetching
├── types/               # TypeScript definitions
│   └── user.ts          # User interface definitions
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## API Integration

The application fetches user data from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users), which provides:

- User personal information (name, email, phone, website)
- Address details with geographical coordinates
- Company information

## Responsive Design

The application is fully responsive with breakpoints at:
- **Desktop**: 1200px+ (full table layout)
- **Tablet**: 768px-1199px (optimized table)
- **Mobile**: <768px (compact table with scrolling)

## Accessibility Features

- Full keyboard navigation support
- ARIA labels and roles for screen readers
- High contrast focus indicators
- Semantic HTML structure
- Reduced motion support for accessibility preferences

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## License

This project is created for demonstration purposes. 