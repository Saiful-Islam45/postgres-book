export const searchableFields = ['title', 'author', 'genre'];
export const filterableFields = ['search', 'category'];
export type SortOrder = 'asc' | 'desc';
export type IFilters = {
  search?: string;
  category?: string;
};
