import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  return {
    secret: process.env.JWT_ACCESS_SECRET,
    accessTokenTtl: '15m',
  };
});
