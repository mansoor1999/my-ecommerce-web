// pages/api/prisma/cart.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { productId } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY) as any;
      const userId = decoded.id;

      // Validate productId
      if (!productId || isNaN(Number(productId))) {
        return res.status(400).json({ message: 'Invalid product ID' });
      }

      // Check if the product already exists in the cart for this user
      const existingCartItem = await prisma.cartItem.findFirst({
        where: { productId: Number(productId), userId },
      });

      if (existingCartItem) {
        return res.status(400).json({ message: 'Product already in cart' });
      }

      // Create a new cart item
      const newCartItem = await prisma.cartItem.create({
        data: {
          productId: Number(productId),
          userId,
          quantity: 1,
        },
      });

      res.status(201).json({ message: 'Product added to cart', cartItem: newCartItem });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      res.status(500).json({ message: 'Error adding product to cart', error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
