import cors from "cors";
export default function getCors(app) {
    app.use(cors());
}