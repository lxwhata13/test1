export let pagination = (resultType) => `
{
  items ${resultType}
  total
  hasMore
  cursor
}
`;
