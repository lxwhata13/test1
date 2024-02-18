import * as User from './user';
import * as Recharge from './recharge';
import * as Withdraw from './withdraw';
import * as Record from './record';
import * as Game from './game';
import * as Quest from './quest';

export const Query = {
  ...User.queries,
  ...Recharge.queries,
  ...Withdraw.queries,
  ...Record.queries,
  ...Quest.queries,
};

export const Mutation = {
  ...User.mutations,
  ...Recharge.mutations,
  ...Withdraw.mutations,
  ...Game.mutations,
  ...Quest.mutations,
};
