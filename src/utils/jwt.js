import jwt from 'jsonwebtoken';

/**
 * מנפיק Access Token קצר-מועד (15 דקות)
 * משמש לכל בקשה שוטפת של המשתמש באתר
 */
export const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
    });
};

/**
 * מנפיק Refresh Token ארוך-מועד (7 ימים)
 * משמש אך ורק לקבלת Access Token חדש כשהישן פג תוקף
 */
export const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
    });
};

export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};