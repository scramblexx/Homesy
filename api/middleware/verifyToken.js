import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        console.log("No token provided");
        return res.status(401).json({ message: "Not Authenticated" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
        if (err) {
            console.log("Token verification failed:", err);
            return res.status(403).json({ message: "Token is not valid" });
        }
        req.userId = payload.id;
        console.log("Token verified, user ID:", payload.id);
        next();
    });
};
