require("dotenv").config();

const app = require("./src/app");

const PORT = process.env.PORT || 3000;  // PORT env variable

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});