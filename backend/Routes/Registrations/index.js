import express from "express";
import queries from "./queries.js";
const registrationsRouter = express.Router();

registrationsRouter.use("/", queries);


export default registrationsRouter;