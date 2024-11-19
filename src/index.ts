import express from "express";
import dotenv from "dotenv";
import companyRoutes from "./routes/company.routes";
import personRoutes from "./routes/person.routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(companyRoutes);
app.use(personRoutes);

const port = process.env.PORT || 4568;

app.get("/ping", (req, res) => {
    return res.send("pong");
});

app.listen(port, () => {
    console.log(`Escutando na porta ${port}`);
});
