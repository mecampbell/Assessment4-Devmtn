const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const { 
    getCompliment,
    getFortune,
    getProfile,
    editProfile,
    createProfile,
    deleteProfile
} = require('./controller');

app.get(`/api/compliment`, getCompliment);
app.get('/api/fortune', getFortune);
app.get(`/api/profile`, getProfile)
app.put(`/api/profile/:id`, editProfile);
app.post(`/api/profile`, createProfile);
app.delete(`/api/profile/:id`, deleteProfile);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));