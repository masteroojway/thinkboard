import ratelimit from "../config/upstash.js";

async function rateLimiter(req, res, next){
    try {
        const {success} = await ratelimit.limit("rate-limit-key");
        if(!success) return res.status(429).json({message: "too many requests"});
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "server error"});
    }
}

export default rateLimiter;