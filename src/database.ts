import { MongoClient, Collection } from 'mongodb'

async function initDb(): Promise<void> {
  if (this.db != undefined) {
    return
  }
  await MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(client => {
    this.db = client.db(process.env.SPORTSFINDER_DB_NAME)
  }).catch(err => {
    console.log("Error connecting to mongo: ", err)
    throw err
  })
}

function getCollection(collection: string): Collection {
  return this.db.collection(collection)
}

export {
  initDb,
  getCollection
}