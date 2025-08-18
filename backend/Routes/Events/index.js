import express from "express";
import queries from "./queries.js";
const eventsRouter = express.Router();

eventsRouter.use("/", queries);


export default eventsRouter;