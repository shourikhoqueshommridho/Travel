import express from 'express'
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 8000;

// CORS: Next.js frontend (default :3000) calls this API on :8000 — different origin
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));

// JSON request parsing
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

// Connect before accepting requests (dotenv loads MONGODB_URI from ./env)
await connectToMongoDB();

// Database name comes from MONGODB_DB if set, otherwise the URI path / driver default — no config overwritten
function getDb() {
  return process.env.MONGODB_DB ? client.db(process.env.MONGODB_DB) : client.db();
}

const REQUIRED_FIELDS = ['name', 'country', 'category', 'duration', 'departureDate', 'imageUrl', 'description'];

app.post('/add-destination', async (req, res) => {
  try {
    console.log("API Called!");

    const body = req.body ?? {};
    const { name, country, category, duration, departureDate, imageUrl, description } = body;
    const { price } = body;

    // Server-side validation
    const fields = { name, country, category, duration, departureDate, imageUrl, description };
    const missing = REQUIRED_FIELDS.filter(
      (field) => typeof fields[field] !== 'string' || fields[field].trim() === ''
    );
    if (missing.length > 0) {
      return res.status(400).json({
        message: `Missing or invalid required fields: ${missing.join(', ')}`,
      });
    }

    // Optional highlights list (used by the destination details page when present)
    const rawHighlights = Array.isArray(body.highlights) ? body.highlights : null;
    const highlights = rawHighlights
      ? rawHighlights
          .filter((item) => typeof item === 'string' && item.trim() !== '')
          .map((item) => item.trim())
          .slice(0, 12)
      : undefined;

    // Price must be a valid positive number
    const parsedPrice = typeof price === 'number' ? price : Number(price);
    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      return res.status(400).json({
        message: 'Price must be a valid positive number (USD)',
      });
    }

    // Save to the destinations collection
    const destinationDoc = {
      name: name.trim(),
      country: country.trim(),
      category: category.trim(),
      price: parsedPrice,
      duration: duration.trim(),
      departureDate: departureDate.trim(),
      imageUrl: imageUrl.trim(),
      description: description.trim(),
      createdAt: new Date(),
    };

    // Only persist highlights when the client supplies them (optional field)
    if (highlights !== undefined && highlights.length > 0) {
      destinationDoc.highlights = highlights;
    }

    const result = await getDb()
      .collection('destinations')
      .insertOne(destinationDoc);

    return res.status(201).json({
      message: 'Destination added successfully',
      insertedId: result.insertedId,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to save the destination on the server' });
  }
});

app.get('/destinations', async (req, res) => {
  try {
    const result = await getDb()
      .collection('destinations')
      .find({})
      .toArray();

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching destinations:', error);

    res.status(500).json({
      message: 'Failed to fetch destinations',
    });
  }
});


app.get('/destinations/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate before querying — invalid ids are a client error, not a DB error
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid destination id format' });
    }

    const destination = await getDb()
      .collection('destinations')
      .findOne({ _id: new ObjectId(id) });

    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    return res.status(200).json(destination);
  } catch (error) {
    console.error('Error fetching destination:', error);
    return res.status(500).json({ message: 'Failed to fetch the destination' });
  }
});

app.delete('/destinations/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate before querying — invalid ids are a client error, not a DB error
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid destination id format' });
    }

    const result = await getDb()
      .collection('destinations')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    return res.status(200).json({
      message: 'Destination deleted successfully',
      deletedId: id,
    });
  } catch (error) {
    console.error('Error deleting destination:', error);
    return res.status(500).json({ message: 'Failed to delete the destination' });
  }
});
app.get('/destination/:id',async(req,res)=>{
  const {id}= req.params  
 const result = await destinationCollection.findone({_id: new ObjectId(id)})
  res.send({result})
  
})

app.put('/destinations/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate before querying — invalid ids are a client error, not a DB error
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid destination id format' });
    }

    const body = req.body ?? {};
    const { name, country, category, duration, departureDate, imageUrl, description } = body;
    const { price } = body;

    // Same field validation as POST — the edit form submits all editable fields
    const fields = { name, country, category, duration, departureDate, imageUrl, description };
    const missing = REQUIRED_FIELDS.filter(
      (field) => typeof fields[field] !== 'string' || fields[field].trim() === ''
    );
    if (missing.length > 0) {
      return res.status(400).json({
        message: `Missing or invalid required fields: ${missing.join(', ')}`,
      });
    }

    const parsedPrice = typeof price === 'number' ? price : Number(price);
    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      return res.status(400).json({ message: 'Price must be a valid positive number (USD)' });
    }

    // Optional highlights list — same sanitizing as POST
    const rawHighlights = Array.isArray(body.highlights) ? body.highlights : null;
    const highlights = rawHighlights
      ? rawHighlights
          .filter((item) => typeof item === 'string' && item.trim() !== '')
          .map((item) => item.trim())
          .slice(0, 12)
      : undefined;

    const updates = {
      name: name.trim(),
      country: country.trim(),
      category: category.trim(),
      price: parsedPrice,
      duration: duration.trim(),
      departureDate: departureDate.trim(),
      imageUrl: imageUrl.trim(),
      description: description.trim(),
      updatedAt: new Date(),
    };

    // Only persist highlights when supplied, so unspecified fields are never erased
    if (highlights !== undefined && highlights.length > 0) {
      updates.highlights = highlights;
    }

    const updated = await getDb()
      .collection('destinations')
      // $set touches only the fields above — partial-safe, no replacement of the whole document
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updates },
        { returnDocument: 'after' }
      );

    if (!updated) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    return res.status(200).json({
      message: 'Destination updated successfully',
      destination: updated,
    });
  } catch (error) {
    console.error('Error updating destination:', error);
    return res.status(500).json({ message: 'Failed to update the destination' });
  }
});

app.get('/', (req, res) => {
  res.send({ message: 'server is runing fine!' })
})

// JSON 404 + error handlers so the API never falls back to Express's HTML responses
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  // Malformed JSON body from express.json() arrives here with status 400
  if (err?.type === 'entity.parse.failed' || err?.status === 400) {
    return res.status(400).json({ message: 'Invalid JSON request body' });
  }
  return res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`server is runing at ${PORT}`);

})
