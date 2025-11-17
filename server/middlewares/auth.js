import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.json({ success: false, message: "Not authorized user. Login again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;  // <-- This must match what you put inside jwt.sign()

    next();

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

export default userAuth;
