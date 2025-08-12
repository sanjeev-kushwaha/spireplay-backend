// import express from "express";
// import cors from "cors";
// import AuthRoute from "./Routes/Auth/AuthRoute.js";
// import subscriptionRoute from "./Routes/Admin/SubscriptionRoute.js";
// import UserPlanRoute from "./Routes/User/UserPlanRoute.js";
// import VideoRoute from "./Routes/User/VideoRoute.js";
// import Uploder from "./Routes/User/UploadRoute.js";

// import path from "path";
// import { fileURLToPath } from "url";

// const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// const authUrl = "/api/auth";
// const adminUrl = "/api/admin";
// const userUrl = "/api/user";
// app.use(adminUrl, subscriptionRoute);
// app.use(adminUrl, Uploder);
// app.use(authUrl, AuthRoute);

// app.use(userUrl, UserPlanRoute);
// app.use(userUrl, VideoRoute);

// export default app;

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import AuthRoute from "./Routes/Auth/AuthRoute.js";
import subscriptionRoute from "./Routes/Admin/SubscriptionRoute.js";
import UserPlanRoute from "./Routes/User/UserPlanRoute.js";
import VideoRoute from "./Routes/User/VideoRoute.js";
import Uploder from "./Routes/User/UploadRoute.js";

import CategoryRoute from "./Routes/CategoryRoute.js"
import LanguageRoute from "./Routes/LanguageRoute.js"
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/uploads",
  (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  },
  express.static(path.join(__dirname, "../uploads"))
);

const authUrl = "/api/auth";
const adminUrl = "/api/admin";
const userUrl = "/api/user";

app.use(adminUrl, Uploder);

const categoryUrl = "/api/category";
const languageUrl = "/api/language";
app.use(categoryUrl, CategoryRoute)
app.use(adminUrl, subscriptionRoute);
app.use(authUrl, AuthRoute);
app.use(languageUrl, LanguageRoute)
app.use(userUrl, UserPlanRoute);
app.use(userUrl, VideoRoute);

export default app;
