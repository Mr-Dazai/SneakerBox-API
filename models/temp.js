import { MongoClient } from 'mongodb'
import { ObjectId } from 'mongodb'

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    $match: {
      product: new ObjectId('64fe4efd6267d724561d6c10'),
    },
  },
  {
    $group: {
      _id: null,
      averageRating: {
        $avg: '$rating',
      },
      numberOfReviews: {
        $sum: 1,
      },
    },
  },
]

const client = await MongoClient.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const coll = client.db('SneakerBox-API').collection('reviews')
const cursor = coll.aggregate(agg)
const result = await cursor.toArray()
await client.close()
