import { User } from '../models';

const includeUser = () => (
  {
    model: User,
    attributes: ['id', 'username', 'fullname', 'imgUrl']
  }
);

export default includeUser;
