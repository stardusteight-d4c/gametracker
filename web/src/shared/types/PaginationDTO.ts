interface PaginationDTO<T> {
  items: T[]
  itemsOnPage: number
  totalItems: number
  totalPages: number
}
