import { Book, Prisma, PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IFilters, SortOrder, searchableFields } from './book.constant';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponses } from '../../../interfaces/common';

const prisma = new PrismaClient();

const createBook = async (data: Book): Promise<Book> => {
  const book = await prisma.book.create({
    data,
    include: {
      category: true
    }
  });
  return book;
};

const getAllBooks = async (
  filters: IFilters,
  options: IPaginationOptions
): Promise<IGenericResponses<Book[]>> => {
  const { size, page, skip, sortBy, sortOrder, minPrice, maxPrice } =
    paginationHelpers.calculatePagination(options);
  const { search, category } = filters;

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

  const whereConditions: Prisma.BookWhereInput | {} =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.book.findMany({
    include: {
      category: true
    },
    where: {
      ...whereConditions,
      price: {
        gte: minPrice,
        lte: maxPrice
      },
      category: {
        title: category
      }
    },
    skip,
    take: size,
    orderBy:
      sortBy && sortOrder
        ? { [sortBy]: sortOrder }
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
      size,
      totalPage: Math.round(total / size) || 1
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
