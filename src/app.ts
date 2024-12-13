import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

// API to add kudos
app.post("/api/kudos", async (req: Request, res: Response) => {
    const { giver, receiver, message } = req.body;
    try {
        const kudos = await prisma.kudos.create({
            data: { giver, receiver, message },
        });
        res.status(201).json(kudos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create kudos" });
    }
});

// API to fetch kudos
app.get("/api/kudos", async (req: Request, res: Response) => {
    try {
        const kudosList = await prisma.kudos.findMany();
        res.status(200).json(kudosList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch kudos" });
    }
});

//Setting Webhooks for GitLab
app.post("/api/gitlab-webhook", async (req: Request, res: Response) => {
    const { event_type, user, target } = req.body;
    if (event_type === "note" && target === "merge_request") {
        try {
            const kudos = await prisma.kudos.create({
                data: {
                    giver: user.name,
                    receiver: target.author,
                    message: "Great work on the MR!",
                },
            });
            res.status(201).json(kudos);
        } catch (error) {
            res.status(500).json({ error: "Failed to process webhook" });
        }
    } else {
        res.status(400).json({ message: "Unsupported event type" });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
