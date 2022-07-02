"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
require("dotenv/config");
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const db_1 = require("./config/db");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const itemRoutes_1 = __importDefault(require("./routes/itemRoutes"));
(0, db_1.connectDB)();
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/api/users', userRoutes_1.default);
app.use('/api/items', itemRoutes_1.default);
// Serve frontend static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express_1.default.static('../client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, '../', 'client', 'build', 'index.html'));
    });
}
else {
    app.get('/', (req, res) => res.send('Please set to  production'));
}
app.use(errorMiddleware_1.errorHandler);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=app.js.map