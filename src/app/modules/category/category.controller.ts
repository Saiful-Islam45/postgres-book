import { Category, PrismaClient } from '@prisma/client';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/response';
import { Request, Response } from 'express';
import { CategoryService } from './category.service';
import httpStatus from 'http-status';

const prisma = new PrismaClient();

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await CategoryService.createCategory(req.body);
  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Created Successfully!!',
    data: category
  });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const categories = await CategoryService.getAllCategories();
  sendResponse<Category[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories fetched Successfully!!',
    data: categories
  });
});

const findCategoryById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const category = await CategoryService.findCategoryById(id);
  sendResponse<Category | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category data fetched Successfully!!',
    data: category
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const category = await CategoryService.updateCategory(id, req.body);
  sendResponse<Category | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category updated Successfully!!',
    data: category
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const category = await CategoryService.deleteCategory(id);
  sendResponse<Category | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category deleted Successfully!!',
    data: category
  });
});

export const CategoryController = {
  createCategory,
  getAllCategories,
  findCategoryById,
  updateCategory,
  deleteCategory
};
