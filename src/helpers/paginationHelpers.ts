type SortOrder = 'asc' | 'desc';

type IOptions = {
  page?: number;
  size?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

type IOptionsResult = {
  page: number;
  size: number;
  skip: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy: string;
  sortOrder: SortOrder;
};

const calculatePagination = (options: IOptions): IOptionsResult => {
  const page = Number(options.page || 1);
  const size = Number(options.size || 10);
  const maxPrice = Number(options.maxPrice || 5000000);
  const minPrice = Number(options.minPrice || 0);
  const min = Number(options.size || 10);
  const skip = (page - 1) * size;

  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  return {
    page,
    size,
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
