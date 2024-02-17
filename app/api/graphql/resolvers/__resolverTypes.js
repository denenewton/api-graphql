export const MoviePayload = {
  __resolveType: (obj) => {
    if (obj.message) {
      return "Error";
    }
    if (obj.title) {
      return "Movie";
    }
    return null;
  },
};
