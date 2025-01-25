import { connectToDatabase } from "@/services/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { db } = await connectToDatabase();

  if (req.method === 'POST') {
    try {
      try {
        const data = JSON.parse(req.body)
        // TODO validate data
        const collections = db.collection('mantle_collections');
        const result = await collections.insertOne({
          creator: data.creator,
          image: data.image,
          name: data.name,
          symbol: data.symbol,
          contractAddress: data.contractAddress,
          prompt: data.prompt,
          price: data.price,
        });
        return res.status(201).json({ message: 'Project added successfully', projectId: result.insertedId })
      } catch (error) {
        console.error('Error adding project:', error);
        return res.status(500).json({ error: 'Failed to add project' })
      }
    } catch (err:any) {
      return res.status(500).json({ message: err.message })
    }
  } else if (req.method === 'GET') {
    try {

      try {
        const collections = db.collection('mantle_collections');

        // Get all projects by creator
        const result = await collections.find({}).toArray();
        if (result.length === 0) {
          return res.status(404).json({ message: 'Not found' })
        } else {
          return res.status(201).json({ message: 'Get projects successfully', collections: result })
        }
      } catch (error) {
        console.error('Error getting project:', error);
        return res.status(500).json({ error: 'Failed to get project' })
      }
    } catch (err:any) {
      return res.status(500).json({ message: err.message })
    }
  } else {
    // Handle any other HTTP method
  }
}
