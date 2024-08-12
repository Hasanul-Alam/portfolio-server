const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uvq0yvv.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("portfolio");
    const messageCollection = database.collection("messages");
    const skillCollection = database.collection("skills");
    const serviceCollection = database.collection("services");
    const portfolioCollection = database.collection("portfolios");
    const contactCollection = database.collection("contact");

    // All Operations
    app.post("/message", async (req, res) => {
      const data = req.body;
      const result = await messageCollection.insertOne(data);
      res.send(result);
    });

    // Get All Messages
    app.get("/messages", async (req, res) => {
      const cursor = await messageCollection.find({}).toArray();
      res.send(cursor);
    });

    // Delete Message
    app.delete("/messages/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await messageCollection.deleteOne(query);
      res.send(result);
    });

    // Get Message Detail (Get single message)
    app.get("/message-detail/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await messageCollection.findOne(query);
      res.send(result);
    });

    // Update Message Status
    app.patch("/message/:id", async (req, res) => {
      const id = req.params.id;
      const doc = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: doc,
      };
      const result = await messageCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      console.log(result);
      res.send(result);
    });

    // Get All Skills
    app.get("/add-skill", async (req, res) => {
      const cursor = await skillCollection.find({}).toArray();
      res.send(cursor);
    });

    // Get a Single Skill Data
    app.get("/update-skill/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await skillCollection.findOne(query);
      res.send(result);
    });

    // Update Skill
    app.patch("/update-skill/:id", async (req, res) => {
      const id = req.params.id;
      const doc = req.body;
      // console.log(doc)
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: doc,
      };
      const result = await skillCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      console.log(result);
      res.send(result);
    });

    // Post a skill
    app.post("/add-skill", async (req, res) => {
      const data = req.body;
      const result = await skillCollection.insertOne(data);
      res.send(result);
    });

    // Delete a skill
    app.delete("/add-skill/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await skillCollection.deleteOne(query);
      // console.log(result)
      res.send(result);
    });

    // Post a Service
    app.post("/add-service", async (req, res) => {
      const data = req.body;
      const result = await serviceCollection.insertOne(data);
      res.send(result);
    });

    // Get All Services
    app.get("/service", async (req, res) => {
      const cursor = await serviceCollection.find({}).toArray();
      res.send(cursor);
    });

    // Get Single Service
    app.get("/update-service/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await serviceCollection.findOne(query);
      res.send(result);
    });

    // Update a service
    app.patch("/update-service/:id", async(req,res) => {
      const id = req.params.id;
      const doc = req.body;
      // console.log(doc)
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: doc,
      };
      const result = await serviceCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    })

    // Delete Service
    app.delete("/service/:id", async(req,res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await serviceCollection.deleteOne(query);
      res.send(result);
    })

    // Add a Portfolio
    app.post("/add-portfolio", async (req, res) => {
      const data = req.body;
      const result = await portfolioCollection.insertOne(data);
      res.send(result);
    });

    // Get All Portfolios
    app.get("/portfolio", async (req, res) => {
      const cursor = await portfolioCollection.find({}).toArray();
      res.send(cursor);
    });

    // Get Single Portfolio
    app.get("/portfolio-detail/:id", async(req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await portfolioCollection.findOne(query);
      res.send(result);
    })

    // Upsert Contact
    app.post("/contact", async (req, res) => {
      const data = req.body;
      const id = "66b502927d709cab33a5b5b0";
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: data,
      };
      const result = await contactCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Portfolio server is running");
});

app.listen(port, () => {
  console.log(`My portfolio server is running on port ${port}.`);
});
