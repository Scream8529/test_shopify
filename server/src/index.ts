import express from "express";
import cors from "cors";
import cluster from "cluster";
import os from "os";
import { cacheService } from "./services/cache-service";

const ProductsRouter = require("./routes/products.route");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/products", ProductsRouter);

let updateIsActive = false;

const startServer = async () => {
    if (!updateIsActive) {
        updateIsActive = true;
        await cacheService.updateCache();
        updateIsActive = false;
    }
    console.log(`app runnin on port ${PORT}`);
};

if (cluster.isMaster) {
    let cpus = os.cpus().length;
    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }
    cluster.on("exit", (worker, code) => {
        console.log(`Worker ${worker.id} finished. Exit code: ${code}`);

        app.listen(PORT, startServer);
    });
} else {
    app.listen(PORT, startServer);
}
