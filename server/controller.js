const profile = require('./db.json');
let setID = 2;

module.exports = {
    getCompliment: (req, res) => {
        const compliments = ["I messed up and didn't realize I needed to create a separate button until the end"];
      
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getFortune: (req, res) => {
        const fortunes = ["A beautiful, smart, and loving person will be coming into your life.", "A dubious friend may be an enemy in camouflage.", "A faithful friend is a strong defense.", "A feather in the hand is better than a bird in the air.", "A fresh start will put you on your way."];
      
        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];
      
        res.status(200).send(randomFortune);
    },
    getProfile: (req, res) => res.status(200).send(profile),
    editProfile: (req, res) => {
        let { id } = req.params;
        let { type } = req.body;
        let index = profile.findIndex(elem => +elem.id === +id)

        if (profile[index].currentPB <= 3630 && type === 'minus') {
            profile[index].currentPB = 0;
            res.status(200).send(profile);
        } else if (type === 'plus') {
            profile[index].currentPB += 1;
            res.status(200).send(profile);
        } else if (type === 'minus') {
            profile[index].currentPB -= 1;
            res.status(200).send(profile);
        } else {
            res.sendStatus(400);
        }
},
    createProfile: (req, res) => {
        let { name, currentPB, imageURL } = req.body;
        let newProfile = {
            id: setID,
            name,
            currentPB,
            imageURL
        };
        profile.push(newProfile);
        res.status(200).send(profile);
        setID++;
    },
    deleteProfile: (req, res) => {
        let index = profile.findIndex(elem => elem.id === +req.params.id);
        profile.splice(index, 1);
        res.status(200).send(profile);
    }
};