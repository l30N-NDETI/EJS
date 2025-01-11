const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to restrict access to working hours
function workingHoursMiddleware(req, res, next) {
  const currentDate = new Date();
  const currentDay = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const currentHour = currentDate.getHours();

  const isWorkingDay = currentDay >= 1 && currentDay <= 5; // Monday to Friday
  const isWorkingHour = currentHour >= 9 && currentHour <= 17; // 9 AM to 5 PM

  if (isWorkingDay && isWorkingHour) {
    next(); // Allow access
  } else {
    res.status(403).send("The web application is only available during working hours (Mon-Fri, 9 AM-5 PM).");
  }
}

// Set view engine to EJS
app.set("view engine", "ejs");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Apply middleware to all routes
app.use(workingHoursMiddleware);

// Routes
app.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

app.get("/services", (req, res) => {
  res.render("services", { title: "Our Services" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact Us" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
