(function($, Handlebars) {

    //set variables

    //data url
    // var photoDataURL = "./photos.json";
    var photoDataURL = "./updated-photos.json";
    var albumsDataURL = "./albums.json";

    //get template html
    var templateHTML = $('#photos-no-albums-template').html();
    var albumTemplateHTML = $('#photos-albums-template').html();

    //compile template
    var template = Handlebars.compile(templateHTML);
    var albumsTemplate = Handlebars.compile(albumTemplateHTML);


    //helpers and partials
    Handlebars.registerHelper("showID", function(id) {
        return "Photo " + id;
    });

    Handlebars.registerHelper("matchID", function(photoID, albumID, options) {
        if(photoID == albumID) {
          return options.fn(this);
        }
    });


    //handle data
   //handle data
   function handleData(photos) {
       var photos = photos;
       //generate array of 20 random numbers in between 1 and the number of items in the array (inclusive); use while loop
       var twentyRandomNumbers = [];
       var photosArray = [];

       while (twentyRandomNumbers.length < 20) {
           var randomNumber = Math.floor((Math.random() * photos.length) + 1);
           if(twentyRandomNumbers.indexOf(randomNumber) === -1) {
               twentyRandomNumbers.push(randomNumber);
           }
       }

       //get photos data array using the twenty random numbers
       for(var i = 0; i < twentyRandomNumbers.length; i++) {
           photosArray.push(photos[twentyRandomNumbers[i] - 1]);
       }

       console.log(twentyRandomNumbers);

       //pass photos array into template as data, and append compiled HTML into markup
       var compiledHTML = template({photosArray});
       $('.photo-grid.photo-grid-no-albums').html(compiledHTML);

       function handleAlbums(albums) {
           //loop through photos and figure out which albums we need to generate
           var relevantAlbumIDs = [];
           var albumsArray = [];
            for(var i = 0; i < photosArray.length; i++) {
              if(relevantAlbumIDs.indexOf(photosArray[i].albumId) === -1) {
                relevantAlbumIDs.push(photosArray[i].albumId);
              }
            }

            //generate relevant album array
            for(var k = 0; k < albums.length; k++) {
              if(relevantAlbumIDs.indexOf(albums[k].id) !== -1) {
                albumsArray.push(albums[k]);
              }
            }


            //pass photos array and albums array into template as data, and append compiled HTML into markup
            var compiledAlbumsHTML = albumsTemplate({photosArray: photosArray, albumsArray: albumsArray});

            console.log(photosArray);
            console.log(albumsArray);

            $('.photo-grid.photo-grid-albums').html(compiledAlbumsHTML);

       }


       $.get(albumsDataURL, function(data) {
          console.log(data);
          console.log(data.length);
          handleAlbums(data);
       });


   }


   $.get(photoDataURL, function(data) {
       //data will be array of photo objects
       console.log(data);
       console.log(data.length);
       handleData(data);
   });


})(jQuery, Handlebars);







