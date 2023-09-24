import { Category, PrismaClient } from '@prisma/client';
import ApiError from '../../../errors/apiError';
import httpStatus from 'http-status';

const prisma = new PrismaClient();

const createCategory = async (data: Category): Promise<Category> => {
  const createdCategory = await prisma.category.create({
    data: data
  });
  return createdCategory;
};

const getAllCategories = async (): Promise<Category[]> => {
  const allCategories = await prisma.category.findMany();
  return allCategories;
};

const findCategoryById = async (id: string): Promise<Category | null> => {
  const category = await prisma.category.findUnique({
    where: {
      id
    }
  });
  return category;
};

const updateCategory = async (id: string, data: Partial<Category>): Promise<Category> => {
  const isCategoryExist = await findCategoryById(id);
  if (!isCategoryExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category does not exist');
  }
  const category = await prisma.category.update({
    where: {
      id
    },
    data
  });
  return category;
};

const deleteCategory = async (id: string): Promise<Category> => {
  const isCategoryExist = await findCategoryById(id);

  if (!isCategoryExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category does not exist');
  }
  const category = await prisma.category.delete({
    where: {
      id
    }
  });
  return category;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  findCategoryById,
  updateCategory,
  deleteCategory
};
