import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

// Endpoint لتيك توك
app.get("/tiktok/:username", async (req, res) => {
  const username = req.params.username;

  try {
    // هنا هتحط طريقة جلب البيانات من Scraper
    const data = {
      username: username,
      followers: Math.floor(Math.random() * 1000000), // مؤقت للتمثيل
      avatar: "https://i.pravatar.cc/150?u=" + username // صورة عشوائية للتمثيل
    };

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
