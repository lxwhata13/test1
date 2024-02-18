import gql from 'graphql-tag';

const enterGame = gql`
  mutation enterGame($gameId: Int!, $homeUrl: String!) {
    enterGame(gameId: $gameId, homeUrl: $homeUrl)
  }
`;
export const mutations = {
  enterGame,
};
