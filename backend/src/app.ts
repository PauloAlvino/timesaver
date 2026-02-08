import "dotenv/config";
import express from "express";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
