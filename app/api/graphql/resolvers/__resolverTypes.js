export const MoviePayload = {
  __resolveType: (obj) => {
    if (obj.errors) {
      return "Error";
    }
    if (obj.title) {
      return "Movie";
    }
    return null;
  },
};

export const MovieAndCastPayload = {
  __resolveType: (obj) => {
    if (obj.errors) {
      return "Error";
    }
    if (obj.casts || obj.backdrop_path) {
      return "MovieAndCast";
    }
    return null;
  },
};

export const InfoPayload = {
  __resolveType: (obj) => {
    if (obj.errors) {
      return "Error";
    }
    if (obj.items || obj.next || obj.last || obj.prev) {
      return "Info";
    }
    return null;
  },
};

export const PersonPayload = {
  __resolveType: (obj) => {
    if (obj.errors) {
      return "Error";
    }
    if (obj.biography) {
      return "Person";
    }
    if (obj.imdb_id) {
      return "Person";
    }
    return null;
  },
};
