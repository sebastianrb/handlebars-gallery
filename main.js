(function() {



    //buttons
    $('.view-buttons').on('click', '.view-button', function(event) {
        event.preventDefault();
        var target = $(event.target)

        var $albumGrid = $('.photo-grid-albums');
        var $noAlbumGrid = $('.photo-grid-no-albums');

        if(target.hasClass('button-unselected')) {
            if(target.hasClass('view-button--no-albums')) {
                $albumGrid.addClass('photo-grid--hidden');
            } else {
                $albumGrid.removeClass('photo-grid--hidden');
            }
        }

        if(target.hasClass('button-unselected')) {
            target.removeClass('button-unselected');
            target.addClass('button-selected');

            target.siblings(".view-button").removeClass('button-selected');
            target.siblings(".view-button").addClass('button-unselected');
        }

    });


    //modal
    $('.photo-grid').on('click', ".photo-container", function(event) {
        event.preventDefault();
        var target = $(event.currentTarget);

        //get img src and title text
        var imageSource = target.find(".photo-container__image").attr('src');
        var currentTitle = target.find(".photo-container__title").clone().children().remove().end().text();

        //populate modal info
        var $modal = $('.modal');
        $modal.find('.modal__image').attr('src', imageSource);
        $modal.find('.modal__title').text(currentTitle);

        //show modal and contents
        $modal.removeClass("modal--hidden");
        $modal.find(".modal__image-container").removeClass("modal__image-container--hidden");
        $modal.find(".modal__close-modal").removeClass("modal__close-modal--hidden");
    });

    $('.modal').on('click', '.modal__close-modal', function(event) {
        event.preventDefault();
        var $target = $(event.currentTarget);
        var $modal = $('.modal');

        //show modal and contents
        $modal.addClass("modal--hidden");
        $modal.find(".modal__image-container").addClass("modal__image-container--hidden");
        $modal.find(".modal__close-modal").addClass("modal__close-modal--hidden");

    });

})();


// $(document).ready(function($) {
//     //loading icons
//     // console.log($(".photo-container__image"));
//     $('.photo-container__image').each(function(index, element) {
//         element.onload = function() {
//             console.log(this);
//             $(this).siblings(".photo-container__loading-icon").addClass('loading-hidden');
//         }
//     });

    // ('load', function(event) {
    //     event.preventDefault();

    // });
// });
