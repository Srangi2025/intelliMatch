const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Path to profiles file
const profilesPath = path.join(__dirname, "profiles.json");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Helper functions to read and write profiles
function readProfiles() {
  if (!fs.existsSync(profilesPath)) {
    fs.writeFileSync(profilesPath, "[]");
  }
  const data = fs.readFileSync(profilesPath, "utf8");
  return JSON.parse(data);
}

function writeProfiles(profiles) {
  fs.writeFileSync(profilesPath, JSON.stringify(profiles, null, 2));
}

// Create or update a profile
app.post("/api/profile", (req, res) => {
  const { userId, fullName, major, year, interests, skills, bio } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  let profiles = readProfiles();
  const existingIndex = profiles.findIndex((p) => p.userId === userId);

  const newProfile = {
    userId,
    fullName: fullName || "",
    major: major || "",
    year: year || "",
    interests: interests || "",
    skills: skills || "",
    bio: bio || "",
    updatedAt: new Date().toISOString(),
  };

  if (existingIndex !== -1) {
    profiles[existingIndex] = newProfile;
  } else {
    profiles.push(newProfile);
  }

  writeProfiles(profiles);

  res.json({ success: true, profile: newProfile });
});

// Get a profile for a specific user
app.get("/api/profile/:userId", (req, res) => {
  const { userId } = req.params;
  const profiles = readProfiles();
  const profile = profiles.find((p) => p.userId === userId);

  if (!profile) {
    return res.status(404).json({ error: "Profile not found" });
  }

  res.json(profile);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
