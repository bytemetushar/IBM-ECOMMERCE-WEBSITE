import jwt from 'jsonwebtoken';

export const isLoggedIn = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthenticated, please login again' });
        }

        const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = userDetails;

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token, please login again' });
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ success: false, message: 'Unauthorized, admin access only' });
        }
        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: 'Unauthorized' });
    }
};
