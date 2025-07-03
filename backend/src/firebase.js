const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const serviceAccount = require("./firebaseServiceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.get("/shops", async (req, res) => {
  try {
    const snapshot = await db.collection("shops").get();
    const shops = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(shops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

