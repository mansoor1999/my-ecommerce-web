// pages/api/prisma/products.ts
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
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify JWT token and extract user ID
    const decoded = jwt.verify(token, SECRET_KEY) as { id: number };
    const userId = decoded.id;

    switch (method) {
      case 'POST':
        const { name, category, description, price, discount } = req.body;

        // Validate input data
        if (!name || !category || !description || isNaN(price) || isNaN(discount)) {
          return res.status(400).json({ message: 'Invalid data' });
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
              userId: userId, // Use the seller's ID here
            },
          });
          res.status(201).json(product);
        } catch (error) {
          console.error('Error adding product:', error);
          res.status(500).json({ message: 'Error adding product' });
        }
        break;

      default:
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
}
