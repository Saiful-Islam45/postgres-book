type SortOrder = 'asc' | 'desc';

type IOptions = {
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy: string;
  sortOrder: SortOrder;
};

const calculatePagination = (options: IOptions): IOptionsResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const maxPrice = Number(options.maxPrice || 5000000);
  const minPrice = Number(options.minPrice || 0);
  const min = Number(options.limit || 10);
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  return {
    page,
    limit,
    skip,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder
  };
};

export const paginationHelpers = {
  calculatePagination
};
