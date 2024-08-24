import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  // Retrieve token from request headers
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // Verify JWT token and extract user ID
    const decoded = jwt.verify(token, SECRET_KEY) as { id: number };
    const sellerId = decoded.id;
    switch (method) {
      case 'GET':
        try {
          // Fetch products belonging to the seller
          const products = await prisma.product.findMany();
          res.status(200).json(products);
        } catch (error) {
          console.error('Error fetching products:', error);
          res.status(500).json({ message: 'Error fetching products from the database' });
        }
        break;

      case 'POST':
        const { name, category, description, price, discount } = req.body;

        // Validate input data
        if (!name || !category || !description || isNaN(price) || isNaN(discount)) {
          return res.status(400).json({ message: 'Invalid data: Ensure all fields are provided and valid' });
        }

        try {
          // Create product for the seller
          const product = await prisma.product.create({
            data: {
              name,
              category,
              description,
              price: parseFloat(price),
              discount: parseFloat(discount),
              userId: sellerId, // Use the seller's ID here
            },
          });
          res.status(201).json(product);
        } catch (error) {
          console.error('Error adding product:', error);
          res.status(500).json({ message: 'Error adding product to the database' });
        }
        break;

      case 'DELETE':
        const { id } = req.query;

        if (!id || Array.isArray(id)) {
          return res.status(400).json({ message: 'Invalid product ID' });
        }

        try {
          // Ensure the product belongs to the seller before deletion
          const product = await prisma.product.findUnique({
            where: { id: parseInt(id as string, 10) },
          });

          if (!product) {
            return res.status(404).json({ message: 'Product not found' });
          }

          if (product.userId !== sellerId) {
            return res.status(403).json({ message: 'Forbidden: You do not have permission to delete this product' });
          }

          // Delete the product
          await prisma.product.delete({
            where: { id: parseInt(id as string, 10) },
          });
          res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
          console.error('Error deleting product:', error);
          res.status(500).json({ message: 'Error deleting product from the database' });
        }
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}
