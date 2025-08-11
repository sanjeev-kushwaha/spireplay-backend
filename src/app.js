import express from "express";
import cors from "cors";
import AuthRoute from "./Routes/Auth/AuthRoute.js";
import subscriptionRoute from "./Routes/Admin/SubscriptionRoute.js";
import UserPlanRoute from "./Routes/User/UserPlanRoute.js";
import VideoRoute from "./Routes/User/VideoRoute.js";
import CategoryRoute from "./Routes/CategoryRoute.js"
import LanguageRoute from "./Routes/LanguageRoute.js"
import VideoTypeRoute from "./Routes/VideoTypeRoute.js"
import VideosRoute from "./Routes/VideoRoute.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const authUrl = "/api/auth";
const adminUrl = "/api/admin";
const userUrl = "/api/user";
const categoryUrl = "/api/category";
const languageUrl = "/api/language";
const videoTypeUrl = "/api/videoType";
const videoUrl = "/api/video";
app.use(categoryUrl, CategoryRoute)
app.use(adminUrl, subscriptionRoute);
app.use(authUrl, AuthRoute);
app.use(languageUrl, LanguageRoute)
app.use(userUrl, UserPlanRoute);
app.use(userUrl, VideoRoute);
app.use(videoTypeUrl, VideoTypeRoute)
app.use(videoUrl, VideosRoute )

export default app;
