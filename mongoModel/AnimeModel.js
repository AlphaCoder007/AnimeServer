var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var animeSchema = new Schema({

  id : {type : String, default : null},
  type : {type : String, default : null},
  attributes : {

    createdAt :  {type : String, default : null},
    updatedAt :  {type : String, default : null},
    slug      :  {type : String, default : null},

    synopsis  : {type : String, default : null},
    titles : {
      en    :  {type : String, default : null},
      en_jp :  {type : String, default : null},
      ja_jp :  {type : String, default : null}
    },
    canonicalTitle : {type : String ,default : null},
    averageRating  : {type : String, default : null},
    userCount      : {type : Number, default : 0},

    favoritesCount : {type : Number, default : 0},
    startedDate    : {type : String, default : null},
    endDate        : {type : String, default : null},

    popularityRank : {type : Number, default : 0},
    ratingRank     : {type : Number, default : 0},
    ageRating      : {type : String, default : null},

    ageRatingGuide : {type : String, default : null},
    status         : {type : String, default : null},
    posterImage : {
      tiny  : {type : String, default : null},
      small : {type : String, default : null},

      medium   : {type : String, default : null},
      large    : {type : String, default : null},
      original : {type : String, default : null}
    },
    coverImage : {
      tiny  : {type : String, default : null},
      small : {type : String, default : null},

      medium   : {type : String, default : null},
      large    : {type : String, default : null},
      original : {type : String, default : null}
    },
    episodeCount   : {type : Number, default : 0},
    episodeLength  : {type : Number, default : 0},
    youtubeVideoId : {type : String, default : null},

    showType : {type : String, default : null},
    nsfw     : {type : Boolean, default : false}
  },
  relationships : {
    genres : {
      links : {
        self    : {type : String, default : null},
        related : {type : String, default : null}
      }
    }
  },
 episodes_links :  {
   type : Schema.Types.ObjectId,
    ref : 'animeEpisode',
    default : null
  },
  geners : [{type : String}],
userClick : {type : Number, default : 0},
dubbed    : {type : Boolean, default : false}
})

animeSchema.plugin(mongoosePaginate);
var animeModel = mongoose.model('animeData', animeSchema);
module.exports = animeModel;
