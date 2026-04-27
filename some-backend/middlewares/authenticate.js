import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new Error('Not authenticated', { cause: 401 });
  }

  try {
    const { _id, role } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { _id, role };
    next();
  } catch (error) {
    console.log(error);
    throw new Error('Not authenticated', { cause: 401 });
  }
};

export default authenticate;
