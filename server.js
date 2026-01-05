import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// اختبار السيرفر
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// مثال Endpoint لجلب بيانات تيك توك (لو عندك API مجاني أو PhantomBuster)
app.get("/tiktok/:username", async (req, res) => {
  const username = req.params.username;

  try {
    // استبدل الـ URL و Headers حسب الـ API اللي هتستخدمه
    const response = await fetch(`https://example.com/api/tiktok/${username}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
