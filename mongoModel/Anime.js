const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;


var animeSchema = new Schema({

    episodesDescription : [{
      episode_number : {type : Number, default : 0},
      episode_name :{type : String, default : null},
      episode_duration : {type : String, default : null},
      episode_server1 : {type : String, default : null},
      episode_server2 : {type : String, default : null},
      episode_server3 : {type : String, default : null},
      episode_server4 : {type : String, default : null},
      episode_server5 : {type : String, default : null},
      episode_server6 : {type : String, default : null},
      episode_image   : {type : String, default  : null},
      dubbed : {type : Boolean, default : false},
      episode_added_date : {type : String, default : null},
      anime_name : {type : String, default : null}
    }],
    anime_link : {type : Schema.Types.ObjectId, ref : 'animeData', default : null},
    user_click : Number

})
animeSchema.plugin(mongoosePaginate);
var animeEpisodeModel = mongoose.model('animeEpisode', animeSchema)
module.exports = animeEpisodeModel;
