var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
var animeEpisode = require('../mongoModel/Anime');
var testModel = require('../mongoModel/test_model');
var animeData = require('../mongoModel/AnimeModel');
var kitsu = require('node-kitsu');
var controllers = require('../controll');
const kitsu_gener = require('kitsu');
var gis = require('g-i-s');

//const kitsu = require('kitsu');

var url = 'mongodb://localhost:27017/AniTest';

const api = new kitsu_gener({
  baseURL: 'https://kitsu.io/api',
  version: 2
});

//dubbed : req.body.dubbed,'attributes.showType' : new RegExp(req.body.showType, "i")},

/*
* This route is used for storing the episodes and you can check the model in @link Anime.js
*/
router.post('/addAnimeEpisodes', function (req, res) {
  var imagesURL;
 //console.log(req.body);
 animeData.findOne({ $or:[ {'attributes.titles.en' : new RegExp(req.body.anime_name, "i")} ,  {'attributes.titles.en' : req.body.anime_name}, {'attributes.canonicalTitle' : req.body.anime_name}, {'attributes.canonicalTitle' : new RegExp(req.body.anime_name, "i")},{'attributes.slug' : new RegExp(req.body.anime_name, "i")} ]
, dubbed : req.body.dubbed,'attributes.showType' : new RegExp(req.body.showType, "i")}, function (err, data) {


    if (data != null) {
         animeEpisode.findOne({anime_link : data}, function (err, result) {
           //This is search for image
             gis(req.body.anime_name+" episode "+req.body.episode_number, logResults);
               function logResults(error, image) {
             if (error) {
               console.log(error);
             }
             else {
               var imagesURL = image[1].url
               //console.log(image[1].url);
               //console.log(JSON.stringify(image[0], null, '  '));
               if (result != null) {
                 console.log('we are in find');
                 var value = linearSearch(result.episodesDescription, req.body.episode_number);
                 console.log(value);
                 if (value) {
                   res.send('Already added')
                 } else {
                   req.body.episode_image=imagesURL;
                   //console.log(req.body);
                   result.episodesDescription.push(req.body)
                   result.save(function (err, doc) {
                     res.send('New added')
                 })
               }


               } else {
                 req.body.episode_image=imagesURL;
                 var episode = new animeEpisode(req.body);
                 episode.episodesDescription.push(req.body);
                 episode.anime_link = data;
                 episode.save(function (err, doc) {

                   res.send("New added");
                   data.episodes_links=doc;
                   doc.save(function (err, rest) {
                     if (!err) {
                       console.log('all Data and episodes saved');
                     }
                   })

                 })
               }
             }
           }


         })


    } else {
      res.send('No Data Found')
    }
  })


})

/* Using Linear search for finding the episodes in array*/
function linearSearch (array, value) {
  var i=0;
  for(; i<array.length; i++) {

    if (value == array[i].episode_number) {
      return true;
    }
  }
  return false;
}

/**
* This is route is used to store a specific anime data
*/
router.post('/addAnimeData', function (req,  res) {

     //console.log(new RegExp(req.body.anime_name));
    animeData.findOne({ $or:[ {'attributes.titles.en' : new RegExp(req.body.anime_name, "i")} ,  {'attributes.titles.en' : req.body.anime_name}, {'attributes.canonicalTitle' : req.body.anime_name}, {'attributes.canonicalTitle' : new RegExp(req.body.anime_name, "i")} ]
  , dubbed : req.body.dubbed,'attributes.showType' : new RegExp(req.body.showType, "i")}, function (err, data)  {
    //console.log(data);
   if (data == null) {
     kitsu.searchAnime(req.body.anime_name, 0).then(results => {
         var anime = new animeData(results[0]);
         anime.dubbed = req.body.dubbed;
         var geners_value = 'anime/'+anime.id+'/genres'
         api.get(geners_value).then(rest => {
           //console.log(rest.data[1].name);
          for (var i = 0; i < rest.data.length; i++) {
               var kk= rest.data[i].name;
               anime.geners.push(kk);
              }
                //console.log(anime);
            anime.save(function (err, doc) {
              //console.log(my_data);
              console.log('Data is saved');
              if (doc.attributes.titles.en != null) {
                res.send(doc.attributes.titles.en);
              }else if(doc.attributes.titles.en_jp != null) {
                res.send(doc.attributes.titles.en_jp);
              }else if (doc.attributes.canonicalTitle != null) {
                res.send(doc.attributes.canonicalTitle);
              }else{
                res.send(doc.attributes.slug);
              }

              return;
            })
         })
         //console.log(doc);

         /*anime.save(function (err, doc) {
           console.log('Data is saved');
           res.send(doc.attributes.titles.en);
           return;
         })*/
     });

   } else {
       if (data.attributes.titles.en != null) {
              res.send(data.attributes.titles.en);
       } else {
         res.send(data.attributes.slug)
       }

     console.log(data.attributes.titles.en);
     console.log('result is already exist');
   }

 })

});

router.post('/getAnimeEpisode', function (req, res) {
/*  console.log('hello');
  var pageNo = req.query.page;

    /*animeEpisode.paginate({}, {page : pageNo, limit : 10}, function (err, data) {
      if (data != null) {
        res.send(data);
      }else {
        res.json({message : 'No Data Found'})
      }
    })*/

  animeData.findOne({ $or:[ {'attributes.titles.en' : new RegExp(req.body.anime_name, "i")} ,  {'attributes.titles.en' : req.body.anime_name}, {'attributes.canonicalTitle' : req.body.anime_name}, {'attributes.canonicalTitle' : new RegExp(req.body.anime_name, "i")},{'attributes.slug' : new RegExp(req.body.anime_name, "i")} ]
  , dubbed : req.body.dubbed}, function (err, data) {
     console.log('we are in');
  if (data != null) {
     animeEpisode.findOne({anime_link : data}, function (err, result) {
        if (result != null) {
            console.log(result);
           res.send(result);

        } else{
          console.log(err);
        }

     })
  }

  })


})

router.get('/getAnimeData', function (req, res) {
  var pageNo = req.query.p;
  //console.log(pageNo);
  animeData.paginate({}, {page :
     pageNo , limit : 10}, function (err, data) {
    if (data != null) {
      res.send(data);
    } else {
      res.json({message : 'No data Found'});
    }
  })

  router.get('/getAnimeEpisodeData', function (req, res) {
  //  var pageNo = req.query.page;
     console.log('we are in ');
    /*animeEpisode.paginate({}, {page : pageNo, limit : 10}, function (err, data) {
      if (data != null) {
        res.send(data);
      }else {
        res.json({message : 'No Data Found'})
      }
    })*/
  })

/*  animeData.find({}, function (err, doc) {
    if (doc != null) {
      res.json(doc)
    } else {
      res.json({message : 'Your data is not found'})
    }
  })*/

})



router.post('/add_anime', function (req, res) {

   mongoClient.connect(url, function (err, db) {
    console.log(req.body.slug);
     //assert.equal(null, err);
     console.log('connection is establised');

     /*db.collection('Animax').findOne({slug : req.body.slug}).then(function (doc) {
       //console.log(err);
       //console.log(doc);
        res.send(doc)

     })*/

     var regexValue='\.*'+req.body.slug+'\.';
     var value = '/'+req.body.slug+'/';
     var another = req.body.slug;
     //new RegExp(regexValue+'i')
     console.log(value);

     /* This is search all the documents which has similar name it works as like operator*/
     db.collection('Animax').find({slug:  { $regex: another, $options: 'i' }}).toArray(function (err, doc) {
           console.log(doc);
           console.log(err);
        if (!err) {
           res.send(doc);
        } else {
          res.send('There is no anime of this name')
          console.log(err);
        }

     })

     db.close();

   })


})

router.post('/testModel', function (req, res) {

   var test_model = new testModel(req.body);
   test_model.save().then(function (doc) {
        res.send(doc);

   })

})

router.post('/testModelEx', function (req, res) {

  testModel.findOne({name : new RegExp(req.body.name, "i")}, function (err, doc) {
    console.log(err);
    //console.log(doc);
    res.send(doc)
  })

})

router.post('/test', function (req, res) {
  var my = new testModel(req.body);
  my.save(function (err, doc) {
    res.send(doc)
  })
})

router.get('/testModel', function (req, res) {

  mongoClient.connect(url, function (err, db) {
    if (err) {
      console.log(err);
    }
    console.log('connection is establised in post');

    var newValues = {$set : {geting : "svam", mygage : 'watch out' }};
    db.collection('testschemas').updateMany({}, newValues, function (err, result) {
      res.send(result)
    })

   /*db.collection('testschemas').aggregate({$addFields : {java : "hello"}}, function (err, doc) {
     db.collection('testschemas').updateMany({}, doc, function (err, result) {
       res.send(result)
     })
   })
   db.close()*/

 })

  /*testModel.update({},{function : []}, {multi : true}, function (err, doc) {
    if (!err) {
      res.send(doc);
      console.log(doc);
    } else {
      console.log(err);
    }
  })*/

   /*testModel.find({}, function (err, doc) {
      res.send(doc.name);

     doc.update({value : 'update'}, {multi : true});
     doc.save(function (err, doc) {
       if (!err) {
         res.send(doc);
       } else {
         console.log(err);
       }
     })
    // doc.set({value : 'You got it'});
     doc.save(function (err, updateDocs) {
       if (!err) {
         res.send(updateDocs)
       }else {
         console.log(err);
       }
     })

   })*/

})

router.get('/animedata', function (req, res) {
  var pageNo = req.query.page;
  console.log(pageNo);
  animeData.find({}, function (err, data) {
    if (data != null) {
      res.send(data);
    } else {
      res.json({message : 'No data Found'});
    }
  })
})

module.exports = router;
