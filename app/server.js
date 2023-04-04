const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const { allRoutes } = require("./routers/router");
module.exports = class Application {
    #app = express();
    #DB_URL;
    #PORT;
    constructor(DB_URL, PORT) {
        this.#DB_URL = DB_URL;
        this.#PORT = PORT;
        this.configApplication();
        this.connectToMongoDB();
        this.createRoutes();
        this.errorHandlers();
        this.createServer();
    }
    createRoutes() {
        this.#app.use(allRoutes);
    }
    createServer() {
        const http = require("http");
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log(`Run > http://localhost:${this.#PORT}`)
        })
    }
    connectToMongoDB() {
        mongoose.connect(this.#DB_URL).then(error => {
            return console.log(`connect to ${this.#DB_URL}`)
        }).catch(error => {
            return console.log(`connection field to ${this.#DB_URL}`)
        })
    }
    errorHandlers() {
        this.#app.use((req, res) => {
            return res.status(404).json({
                status: res.statusCode,
                message: "آدرس مورد نظر یافت نشد"
            })
        })
        this.#app.use((error, req, res) => {
            const statusCode = res.status || 500;
            const message = error.message || "serverError";
            return res.json({
                statusCode,
                message
            })
        })
    }
    configApplication() {
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(express.static(path.join(__dirname, "..", "public")))
    }
}