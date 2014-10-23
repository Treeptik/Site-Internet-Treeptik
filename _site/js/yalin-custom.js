/* ---------------------------------------------------------------------- */
/*	Contact Form
 /* ---------------------------------------------------------------------- */

$(function () {

    $("#btnSend").click(function () {

        $.ajax({
            type: 'POST',
            url: '/php/contact.php',
            data: $('#frmContact').serialize(),
            success: function (response) {
                var successMsg, errorMsg, is_french, $msgContainer;
                is_french = window.navigator.userLanguage === 'fr' || window.navigator.language === 'fr';
                $msgContainer = $("#spanMessage");
                $msgContainer.html('Please Wait...');

                if (parseInt(response) > 0) {

                    if (is_french) {
                        successMsg = '<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Merci!</strong> Votre message a bien été envoyé.</div>'
                    } else {
                        successMsg = '<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Well done!</strong> Your message has been sent.</div>'
                    }
                    $msgContainer.html(successMsg);
                }
                else {
                    if (is_french) {
                        errorMsg = '<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Oups!</strong> Une erreur s\'est produite, veuillez recommencer.</div>'
                    } else {
                        errorMsg = '<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Error!</strong> Something wrong happened, please try again.</div>'
                    }
                    $msgContainer.html(errorMsg);
                }

            }});


    });

    /* ---------------------------------------------------------------------- */
    /*	Email Subscriber
     /* ---------------------------------------------------------------------- */

    $("#btnSubscribe").click(function () {

        $.ajax({type: 'POST', url: './php/subscribe.php', data: $('#frmSubscribe').serialize(), success: function (response) {


            if (parseInt(response) > 0) {
                alert('Successfully sent...');
            }
            else {
                alert(response);

            }


        }});


    });


    /* ---------------------------------------------------------------------- */
    /*	Blog Like Button
     /* ---------------------------------------------------------------------- */


    $('.boxlike').each(function (index) {

        var likebtnID = $(this).attr('id');
        var likebtnArray = likebtnID.split('-');
        var pageID = likebtnArray[1];


        $.ajax({type: 'GET', url: './php/get-likes.php', data: {'pageid': pageID}, success: function (response) {

            $('#boxlike-' + pageID).html(response);

        }
        });
    });

    $(".likebtn").click(function () {

        var likebtn = $(this);
        var likebtnID = $(likebtn).attr('id');
        var likebtnArray = likebtnID.split('-');
        var pageID = likebtnArray[1];
        $.ajax({type: 'GET', url: './php/like.php', data: {'pageid': pageID}, success: function (response) {

            if (parseInt(response) > 0) {
                $.ajax({type: 'GET', url: './php/get-likes.php', data: {'pageid': pageID}, success: function (response) {

                    $('#boxlike-' + pageID).html(response);

                }
                });
            }
            else {
                alert(response);

            }
        }
        });

    });

});


/* ---------------------------------------------------------------------- */
/*	Accordion
 /* ---------------------------------------------------------------------- */

(function () {

    var $container = $('.acc-container'),
        $trigger = $('.acc-trigger');

    $container.hide();
    $trigger.first().addClass('active').next().show();

    var fullWidth = $container.outerWidth(true);
    $trigger.css('width', fullWidth);
    $container.css('width', fullWidth);

    $trigger.on('click', function (e) {
        if ($(this).next().is(':hidden')) {
            $trigger.removeClass('active').next().slideUp(300);
            $(this).toggleClass('active').next().slideDown(300);
        }
        e.preventDefault();
    });

    // Resize
    $(window).on('resize', function () {
        fullWidth = $container.outerWidth(true)
        $trigger.css('width', $trigger.parent().width());
        $container.css('width', $container.parent().width());
    });

})();


/* ---------------------------------------------------------------------- */
/*	Scroll to top
 /* ---------------------------------------------------------------------- */

jQuery(document).ready(function () {

    jQuery(window).scroll(function () {
        if (jQuery(this).scrollTop() > 100) {
            jQuery('.scrollup').fadeIn();
        } else {
            jQuery('.scrollup').fadeOut();
        }
    });

    jQuery('.scrollup').click(function () {
        jQuery("html, body").animate({ scrollTop: 0 }, 700);
        return false;
    });

});

/* ---------------------------------------------------------------------- */
/*	Navbar
 /* ---------------------------------------------------------------------- */

jQuery(document).ready(function () {
    var url = location.pathname;
    var currentLink = url.replace("/", "");
    var links = $("#nav a");
    $.each(links, function (i) {
        if (currentLink === $(links[i]).attr("href")) {
            if ($(links[i]).parents("li.has-sub").length) {
                var parent = $(links[i]).parents("li.has-sub");
                $(parent).first().addClass("current");
            } else {
                $(links[i]).parent().addClass("current");
            }
        }
    })
});