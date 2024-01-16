const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://CS8dvcbgGxAYUgyI:Sandra20112011@atlascluster.xoceqav.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const cursor = await client.db("test").collection("greetings").find();
    const array = await cursor.toArray()
    return array;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
export default async function Database() {
  const greetings =  await run();
  return (<>
      {greetings.map(greetingObj=> <h1>{greetingObj.greeting}</h1>)}
  </>)
}