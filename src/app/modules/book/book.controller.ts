import sendResponse from '../../../shared/response';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { Book } from '@prisma/client';
import { BookService } from './book.service';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/global';
import { filterableFields } from './book.constant';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const book = await BookService.createBook(req.body);
  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Created Successfully!!',
    data: book
  });
});


const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, filterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const books = await BookService.getAllBooks(filters, paginationOptions);
  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books fetched Successfully!!',
    data: books
  });
});

const getBooksByCategoryId = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const books = await BookService.getBooksByCategoryId(categoryId);
  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books with associated category data fetched successfully!!',
    data: books
  });
});

const getBookById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await BookService.getBookById(id);
  sendResponse<Book | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book fetched by id Successfully!!',
    data: book
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await BookService.updateBook(id, req.body);
  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated Successfully!!',
    data: book
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await BookService.deleteBook(id);
  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted Successfully!!',
    data: book
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getBooksByCategoryId,
  getBookById,
  updateBook,
  deleteBook
};
