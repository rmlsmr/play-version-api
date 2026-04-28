import express from "express";
import gplay from "google-play-scraper";

const app = express();

app.get("/", (req, res) => {
  res.send("Play Version API is alive");
});

app.get("/version", async (req, res) => {
  try {
    const appId = req.query.id;

    if (!appId) {
      return res.status(400).json({ error: "Missing id" });
    }

    const data = await gplay.app({
      appId: appId,
      lang: "ru",
      country: "us"
    });

    res.json({
      appId: appId,
      title: data.title || "",
      version: data.version || "",
      updated: data.updated || ""
    });

  } catch (e) {
    res.status(500).json({
      error: String(e.message || e)
    });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
