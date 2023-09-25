import { Book, PrismaClient } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';

const prisma = new PrismaClient();

const createBook = async (data: Book): Promise<Book> => {
  const book = await prisma.book.create({ data: data });
  return book;
};

const getAllBooks = async (): Promise<Book[]> => {
  const books = await prisma.book.findMany();
  return books;
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
