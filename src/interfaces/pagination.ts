export type sortOrder = 'asc' | 'desc';
export type IPaginationOptions= {
  page?: number;
  limit?: number;
  sortBy?: string;
  skip?: number;
  sortOrder?: 'asc' | 'desc';
  minPrice?: number;
  maxPrice?: number;
}