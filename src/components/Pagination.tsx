import React from 'react';
import { PaginationProps, RenderButtonProps } from '../types';
import { calculatePaginationRange } from '../utils/calculatePagination';

const defaultButtonClassName = `
  px-4 py-2 text-sm font-medium border border-gray-300
  hover:bg-gray-50 focus:outline-none focus:ring-2
  focus:ring-blue-500 focus:border-blue-500
  transition-colors duration-200
`;

const defaultActiveClassName = `
  bg-blue-600 text-white border-blue-600
  hover:bg-blue-700
`;

const defaultDisabledClassName = `
  opacity-50 cursor-not-allowed
  hover:bg-transparent
`;

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  showFirstLast = true,
  showPreviousNext = true,
  previousLabel = '← Previous',
  nextLabel = 'Next →',
  firstLabel = '« First',
  lastLabel = 'Last »',
  className = '',
  buttonClassName = defaultButtonClassName,
  activeClassName = defaultActiveClassName,
  disabledClassName = defaultDisabledClassName,
  disabled = false,
  renderButton,
}) => {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage || disabled) {
      return;
    }
    onPageChange(page);
  };

  const paginationRange = calculatePaginationRange(
    currentPage,
    totalPages,
    maxVisiblePages
  );

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const renderDefaultButton = (props: RenderButtonProps) => {
    const { isActive, isDisabled, onClick, children } = props;

    const classes = [
      buttonClassName,
      isActive && activeClassName,
      isDisabled && disabledClassName,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        type="button"
        onClick={onClick}
        disabled={isDisabled}
        className={classes}
        aria-current={isActive ? 'page' : undefined}
      >
        {children}
      </button>
    );
  };

  const buttonRenderer = renderButton || renderDefaultButton;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={`flex items-center space-x-1 ${className}`} aria-label="Pagination">
      {showFirstLast && (
        <>
          {buttonRenderer({
            page: 'first',
            isActive: false,
            isDisabled: isFirstPage || disabled,
            onClick: () => handlePageChange(1),
            children: firstLabel,
          })}
        </>
      )}

      {showPreviousNext && (
        <>
          {buttonRenderer({
            page: 'previous',
            isActive: false,
            isDisabled: isFirstPage || disabled,
            onClick: () => handlePageChange(currentPage - 1),
            children: previousLabel,
          })}
        </>
      )}

      {paginationRange.map((item) => {
        if (item.type === 'ellipsis') {
          return (
            <span
              key={`ellipsis-${item.value}`}
              className="px-4 py-2 text-gray-500"
              aria-hidden="true"
            >
              ...
            </span>
          );
        }

        const isActive = item.value === currentPage;

        return (
          <React.Fragment key={`page-${item.value}`}>
            {buttonRenderer({
              page: item.value,
              isActive,
              isDisabled: disabled,
              onClick: () => handlePageChange(item.value),
              children: item.value,
            })}
          </React.Fragment>
        );
      })}

      {showPreviousNext && (
        <>
          {buttonRenderer({
            page: 'next',
            isActive: false,
            isDisabled: isLastPage || disabled,
            onClick: () => handlePageChange(currentPage + 1),
            children: nextLabel,
          })}
        </>
      )}

      {showFirstLast && (
        <>
          {buttonRenderer({
            page: 'last',
            isActive: false,
            isDisabled: isLastPage || disabled,
            onClick: () => handlePageChange(totalPages),
            children: lastLabel,
          })}
        </>
      )}
    </nav>
  );
};
