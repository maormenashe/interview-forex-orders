import { User } from '../../users/schemas/user.schema';

export interface RequestWithUser extends Request {
  user: User; // or whatever object your JwtStrategy returns
}
