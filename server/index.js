const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.use(cors());
app.use(bodyParser.json());

// Database setup
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) console.error(err);
  else console.log("Connected to SQLite");
});

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    tags TEXT,
    coverPhoto TEXT,
    timeUploaded TEXT,
    commentCount INTEGER,
    likes INTEGER,
    content TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    postId INTEGER,
    name TEXT,
    email TEXT,
    content TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    rating INTEGER,
    review TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Routes
app.get("/posts", (req, res) => {
  db.all("SELECT * FROM posts", [], (err, rows) => {
    res.json(rows);
  });
});

app.post("/posts", (req, res) => {
  const { title, tags, coverPhoto, timeUploaded, commentCount, likes, content } = req.body;
  db.run(
    "INSERT INTO posts (title, tags, coverPhoto, timeUploaded, commentCount, likes, content) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [title, tags, coverPhoto, timeUploaded, commentCount, likes, content],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Failed to save blog post." });
      }
      res.json({ id: this.lastID });
    }
  );
});

// Get all comments for a post
app.get("/comments", (req, res) => {
  const { postId } = req.query;
  if (!postId) {
    return res.status(400).json({ error: "postId is required" });
  }
  db.all("SELECT * FROM comments WHERE postId = ? ORDER BY created_at DESC", [postId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch comments." });
    }
    res.json(rows);
  });
});

// Add a comment to a post
// Add a comment to a post and update comment count
app.post("/comments", (req, res) => {
  const { postId, name, email, content } = req.body;

  if (!postId || !name || !email || !content) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Insert comment
  db.run(
    "INSERT INTO comments (postId, name, email, content) VALUES (?, ?, ?, ?)",
    [postId, name, email, content],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Failed to save comment." });
      }

      // Increment commentCount in posts table
      db.run(
        "UPDATE posts SET commentCount = commentCount + 1 WHERE id = ?",
        [postId],
        function (updateErr) {
          if (updateErr) {
            return res.status(500).json({ error: "Comment added but failed to update comment count." });
          }

          res.json({ id: this.lastID, message: "Comment added and count updated." });
        }
      );
    }
  );
});

// Get blog posts by tag
app.get("/posts/tag/:tag", (req, res) => {
  const { tag } = req.params;
  db.all("SELECT * FROM posts WHERE tags LIKE ?", [`%${tag}%`], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch blog posts by tag." });
    }
    res.json(rows);
  });
});
// Get a single blog post by id
app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM posts WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch blog post." });
    }
    if (!row) {
      return res.status(404).json({ error: "Blog post not found." });
    }
    res.json(row);
  });
});
// Like a blog post
app.post("/posts/:id/like", (req, res) => {
  const { id } = req.params;
  db.run(
    "UPDATE posts SET likes = likes + 1 WHERE id = ?",
    [id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Failed to like post." });
      }
      // Optionally, return the new like count
      db.get("SELECT likes FROM posts WHERE id = ?", [id], (err, row) => {
        if (err) {
          return res.status(500).json({ error: "Failed to fetch like count." });
        }
        res.json({ likes: row.likes });
      });
    }
  );
});
// Get all messages
app.get("/api/messages", (req, res) => {
  db.all("SELECT * FROM messages ORDER BY created_at DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch messages." });
    }
    res.json(rows);
  });
});

// Contact form endpoint
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }
  db.run(
    "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
    [name, email, message],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Failed to save message." });
      }
      res.json({ id: this.lastID });
    }
  );
});

// Delete a blog post by id
app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM posts WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Failed to delete blog post." });
    }
    // Optionally, delete associated comments
    db.run("DELETE FROM comments WHERE postId = ?", [id], function (commentErr) {
      if (commentErr) {
        // Blog post deleted, but comments not deleted
        return res.status(200).json({ message: "Blog post deleted, but failed to delete comments." });
      }
      res.status(200).json({ message: "Blog post and comments deleted." });
    });
  });
});

// Update a blog post by id
app.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, tags, coverPhoto, timeUploaded, commentCount, likes, content } = req.body;
  db.run(
    "UPDATE posts SET title = ?, tags = ?, coverPhoto = ?, timeUploaded = ?, commentCount = ?, likes = ?, content = ? WHERE id = ?",
    [title, tags, coverPhoto, timeUploaded, commentCount, likes, content, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Failed to update blog post." });
      }
      res.json({ message: "Blog post updated." });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
