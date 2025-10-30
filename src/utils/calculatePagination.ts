import { PaginationRange } from '../types';

/**
 * Calculates the range of visible pages for pagination
 * @param currentPage - Current page
 * @param totalPages - Total number of pages
 * @param maxVisiblePages - Maximum number of visible pages
 * @returns Array of objects with page and ellipsis information
 */
export const calculatePaginationRange = (
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number = 5
): PaginationRange[] => {
  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => ({
      type: 'page' as const,
      value: i + 1,
    }));
  }

  const range: PaginationRange[] = [];
  const leftSiblingIndex = Math.max(currentPage - 1, 1);
  const rightSiblingIndex = Math.min(currentPage + 1, totalPages);

  const shouldShowLeftEllipsis = leftSiblingIndex > 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftRange = Math.min(maxVisiblePages - 2, totalPages - 2);
    for (let i = 1; i <= leftRange; i++) {
      range.push({ type: 'page', value: i });
    }
    range.push({ type: 'ellipsis', value: -1 });
    range.push({ type: 'page', value: totalPages });
  } else if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    range.push({ type: 'page', value: 1 });
    range.push({ type: 'ellipsis', value: -2 });
    const rightRange = Math.min(maxVisiblePages - 2, totalPages - 1);
    for (let i = totalPages - rightRange + 1; i <= totalPages; i++) {
      range.push({ type: 'page', value: i });
    }
  } else if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    range.push({ type: 'page', value: 1 });
    range.push({ type: 'ellipsis', value: -2 });

    const middleRange = Math.min(maxVisiblePages - 4, 3);
    const startPage = currentPage - Math.floor(middleRange / 2);
    for (let i = 0; i < middleRange; i++) {
      range.push({ type: 'page', value: startPage + i });
    }

    range.push({ type: 'ellipsis', value: -3 });
    range.push({ type: 'page', value: totalPages });
  } else {
    for (let i = 1; i <= totalPages; i++) {
      range.push({ type: 'page', value: i });
    }
  }

  return range;
};
