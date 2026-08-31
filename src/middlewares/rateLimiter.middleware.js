const buckets = new Map();

const rateLimiter = ({ windowMs = 60 * 1000, max = 20 } = {}) => {
  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();
    const bucket = buckets.get(key) || { count: 0, resetAt: now + windowMs };

    if (now > bucket.resetAt) {
      bucket.count = 0;
      bucket.resetAt = now + windowMs;
    }

    bucket.count += 1;
    buckets.set(key, bucket);

    if (bucket.count > max) {
      return res.status(429).json({ success: false, message: "Too many requests, please try again later" });
    }
    next();
  };
};

module.exports = rateLimiter;