import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { name, category } = req.query;

    try {
      const products = await prisma.product.findMany({
        where: {
          AND: [
            name ? { name: { contains: name as string, mode: 'insensitive' } } : {},
            category ? { category: { contains: category as string, mode: 'insensitive' } } : {},
          ],
        },
      });
      res.status(200).json(products);
    } catch (error) {
      console.error('Error searching products:', error);
      res.status(500).json({ message: 'Error searching products' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
