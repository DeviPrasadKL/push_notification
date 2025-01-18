const express = require("express");
const app = express();
const webpush = require('web-push');
const cors = require("cors")

const port = 3000;

const apiKeys = {
    publicKey: "BCgsXAmj9oVn4oIlr531ZA0ZZwHXLQwlydph5yX6DtM0tHd5R1ONdxPR8gOC04TEWs6k71y7Y5kxoqE9huWI2Ig",
    privateKey: "pLI7CUXBtImkzqM7SdvJixdOkIsZ_MBFovNLAe_Y6Q0"
}

webpush.setVapidDetails(
    'mailto:t29611420@gmail.com',
     apiKeys.publicKey,
    apiKeys.privateKey
)

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
})

const subDatabse = [];


app.post("/save-subscription", (req, res) => {
    subDatabse.push(req.body);
    res.json({ status: "Success", message: "Subscription saved!" })
})

app.get("/send-notification", (req, res) => {
    webpush.sendNotification(subDatabse[0], "Hello world");
    res.json({ "statue": "Success", "message": "Message sent to push service" });
})

app.listen(port, () => {
    console.log("Server running on port 3000!");
})