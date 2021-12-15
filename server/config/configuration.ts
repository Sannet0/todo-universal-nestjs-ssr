export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: Number(process.env.PORT) || 4001,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN
  }
});
