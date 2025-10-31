# React Pagination Component

A flexible and customizable pagination component for React with TypeScript and TailwindCSS.

## Features

- Fully typed with TypeScript
- Styled with TailwindCSS
- Fully customizable
- Accessible (ARIA)
- Lightweight with no external dependencies
- Support for custom rendering

## Installation

```bash
npm install @trujis/react-pagination
```

## Basic Usage

```tsx
import React, { useState } from 'react';
import { Pagination } from '@trujis/react-pagination';
import '@trujis/react-pagination/dist/styles.css';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPage` | `number` | **Required** | Current page |
| `totalPages` | `number` | **Required** | Total number of pages |
| `onPageChange` | `(page: number) => void` | **Required** | Callback when page changes |
| `maxVisiblePages` | `number` | `5` | Maximum number of visible pages |
| `showFirstLast` | `boolean` | `true` | Show first/last buttons |
| `showPreviousNext` | `boolean` | `true` | Show previous/next buttons |
| `previousLabel` | `React.ReactNode` | `'← Previous'` | Label for previous button |
| `nextLabel` | `React.ReactNode` | `'Next →'` | Label for next button |
| `firstLabel` | `React.ReactNode` | `'« First'` | Label for first button |
| `lastLabel` | `React.ReactNode` | `'Last »'` | Label for last button |
| `className` | `string` | `''` | CSS class for container |
| `buttonClassName` | `string` | (default styles) | CSS class for buttons |
| `activeClassName` | `string` | (default styles) | CSS class for active button |
| `disabledClassName` | `string` | (default styles) | CSS class for disabled button |
| `disabled` | `boolean` | `false` | Disable entire pagination |
| `renderButton` | `(props: RenderButtonProps) => ReactNode` | `undefined` | Function for custom rendering |

## Examples

### Simple Pagination

```tsx
<Pagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={setCurrentPage}
  showFirstLast={false}
/>
```

### Style Customization

```tsx
<Pagination
  currentPage={currentPage}
  totalPages={50}
  onPageChange={setCurrentPage}
  className="justify-center"
  buttonClassName="rounded-lg px-3 py-2 mx-1 bg-white hover:bg-gray-100"
  activeClassName="bg-blue-500 text-white hover:bg-blue-600"
  disabledClassName="opacity-30 cursor-not-allowed"
/>
```

### Custom Rendering

```tsx
<Pagination
  currentPage={currentPage}
  totalPages={100}
  onPageChange={setCurrentPage}
  renderButton={({ page, isActive, isDisabled, onClick, children }) => (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        custom-button
        ${isActive ? 'active' : ''}
        ${isDisabled ? 'disabled' : ''}
      `}
    >
      {children}
    </button>
  )}
/>
```

### With Custom Labels

```tsx
<Pagination
  currentPage={currentPage}
  totalPages={25}
  onPageChange={setCurrentPage}
  previousLabel="Previous"
  nextLabel="Next"
  firstLabel="First"
  lastLabel="Last"
/>
```

### With Icons

```tsx
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

<Pagination
  currentPage={currentPage}
  totalPages={15}
  onPageChange={setCurrentPage}
  previousLabel={<ChevronLeft size={16} />}
  nextLabel={<ChevronRight size={16} />}
  firstLabel={<ChevronsLeft size={16} />}
  lastLabel={<ChevronsRight size={16} />}
/>
```

## Advanced Usage

### Visible Pages Control

```tsx
<Pagination
  currentPage={currentPage}
  totalPages={100}
  onPageChange={setCurrentPage}
  maxVisiblePages={7}
/>
```

### Data Integration

```tsx
import React, { useState, useEffect } from 'react';
import { Pagination } from '@trujis/react-pagination';

interface Item {
  id: number;
  name: string;
}

function DataList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<Item[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page: number) => {
    const response = await fetch(`/api/items?page=${page}&limit=${itemsPerPage}`);
    const result = await response.json();
    setData(result.items);
    setTotalPages(Math.ceil(result.total / itemsPerPage));
  };

  return (
    <div>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
```

## Accessibility

The component includes accessibility features:

- Uses `<nav>` with `aria-label="Pagination"`
- `aria-current="page"` on the active page
- `aria-hidden="true"` on separators (...)
- Disabled buttons with the `disabled` attribute

## TypeScript

The package includes complete type definitions:

```typescript
import type { PaginationProps, RenderButtonProps, PaginationRange } from '@trujis/react-pagination';
```

## Contributing

Contributions are welcome. Please open an issue or pull request in the repository.

## License

MIT
