export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;

  maxVisiblePages?: number;
  showFirstLast?: boolean;
  showPreviousNext?: boolean;

  previousLabel?: React.ReactNode;
  nextLabel?: React.ReactNode;
  firstLabel?: React.ReactNode;
  lastLabel?: React.ReactNode;

  className?: string;
  buttonClassName?: string;
  activeClassName?: string;
  disabledClassName?: string;

  disabled?: boolean;

  renderButton?: (props: RenderButtonProps) => React.ReactNode;
}

export interface RenderButtonProps {
  page: number | 'previous' | 'next' | 'first' | 'last' | 'ellipsis';
  isActive: boolean;
  isDisabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export interface PaginationRange {
  type: 'page' | 'ellipsis';
  value: number;
}
