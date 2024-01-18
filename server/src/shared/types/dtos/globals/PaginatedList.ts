interface PaginatedList<T> {
  totalPages: number;
  totalItems: number;
  itemsOnPage: number;
  currentPage: number;
  items: T;
}
