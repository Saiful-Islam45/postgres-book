import { Book, Prisma, PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IFilters, SortOrder, searchableFields } from './book.constant';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponses } from '../../../interfaces/common';

const prisma = new PrismaClient();

const createBook = async (data: Book): Promise<Book> => {
  const book = await prisma.book.create({ data: data });
  return book;
};

const getAllBooks = async (
  filters: IFilters,
  options: IPaginationOptions
): Promise<IGenericResponses<Book[]>> => {
  const { limit, page, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: searchableFields.map((field) => ({
        [field]: {
          contains: search,
          mode: 'insensitive'
        }
      }))
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      AND: Object.entries(filterData).map(([field, value]) => ({
        [field]: value
      }))
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions: Prisma.BookWhereInput | {} =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc'
          }
  });
  const total = await prisma.book.count({
    where: whereConditions
  });

  return {
    meta: {
      total,
      page,
      limit
    },
    data: result
  };
};

const getBooksByCategoryId = async (categoryId: string): Promise<Book[]> => {
  const books = await prisma.book.findMany({
    where: {
      categoryId
    }
  });
  return books;
};

const getBookById = async (id: string): Promise<Book | null> => {
  const book = await prisma.book.findUnique({
    where: {
      id
    }
  });
  return book;
};

const updateBook = async (id: string, data: Partial<Book>): Promise<Book> => {
  const isBookExist = await getBookById(id);
  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book does not exist');
  }
  const book = await prisma.book.update({
    where: {
      id
    },
    data
  });
  return book;
};

const deleteBook = async (id: string): Promise<Book> => {
  const book = await prisma.book.delete({
    where: {
      id
    }
  });
  return book;
};

export const BookService = {
  createBook,
  getAllBooks,
  getBooksByCategoryId,
  getBookById,
  updateBook,
  deleteBook
};
