import getPage, { filtering } from '../../../../utils/utilities'

export const  Movie =  {
    cast: async (parent, args, { Castmember}) =>{
    const res = await Castmember.find({movieID: parent.id})
    return res
    },    
}


export const Query = {

    cast: async (parent, args, { Castmember }) => await Castmember.find(),

    movies: async (_, { filter }, { Movie }) => await filtering(filter, Movie),
  
    movie: async (_ , { id }, { Movie}) => await Movie.findOne({id}),

    getMovieByTitle: async (_, {title}, {Movie}) => await Movie.findOne({title: { $regex: title, $options: "i" }}),

    getMovieByGenre: async (_, {genre}, {Movie}) => await Movie.find({genre:  { $regex: genre, $options: "i" }}),

    getMovieByYear: async (_, {year},  {Movie}) => await Movie.find({year: year}),
    
    getPage: async (_, { filter, page, perPage }, { Movie }) => {
        const movies = await filtering(filter, Movie)
        const infoPage =  await getPage(movies, page, perPage);
        return infoPage;
      },
}