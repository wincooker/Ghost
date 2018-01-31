/* 
 * Theme Name: Mantanization
 * Author: id-webmaster
 * Code: index.js
 * Description: Main JavaScript file
 * 
 */

/* === COMMON FUNCTION === */
(function ($) {
"use strict";

var mantanizationApp = {
    mantan_reset:function(){
        $('.older-posts').text('Older Post');
        $('.newer-posts').text('Newer Post');
    },
    mantan_widget:function(){
        $('.mantanization-widget-menu .mantanization-widget-menu-title .right a').click(function(e){
            e.preventDefault();
            $(this).parents('.mantanization-widget-menu').children('.mantanization-widget-menu-content').slideToggle('medium');
        });
    },
    mantan_flickr:function(){
        $('#flickr').jflickrfeed({
            limit: 12,
            qstrings: {
                id: flickr_id
            },
            itemTemplate: '<li>'+
                            '<a href="{{image}}" title="{{title}}">' +
				'<img src="{{image_s}}" alt="{{title}}" />' +
                            '</a>' +
                         '</li>'
	},function(data){
            $('#flickr').magnificPopup({
                type:'image', 
                delegate: 'a',
                gallery: {
                    enabled: true
                }
            });
	});
    },
    mantan_create_thumbnail:function(){
        function createImg(src, el){
            $('<div class="mantanization-widget-recent-posts-image left"><div class="mantanization-cover-figure"><div class="mantanization-cover-img" style="background-image:url('+src+');"></div></div></div>').prependTo(el);
        }

        function createNoImg(el, imgdefault){
            $('<div class="mantanization-widget-recent-posts-image left"><div class="mantanization-cover-figure" style="background: #68757C;"><div class="mantanization-cover-img"><i class="fa '+imgdefault+'"></i></div></div></div>').prependTo(el);
        }

        $('.mantanization-widget-recent-posts').each( function(){
            var firstImg = $(this).find('img:first-of-type');
            var firstImgSrc = firstImg.attr('src');

            if(typeof firstImgSrc !== 'undefined'){
                createImg(firstImgSrc, this);
            }
            else{
                createNoImg(this, 'fa-camera');
            }
        });
    },
    mantan_generate_thumbnail:function(){
        var numpost = $('.mantanization-post').length;
        var numpost2;
        
        if(numpost == 0){
            numpost = 0;
            numpost2 = 4;
        }
        else{
             numpost2 = numpost * 2
        }
        
        $parseRSS({
            count: numpost2,
            url: rssInit,
            callback: function(posts){
                var code = String('');
                for(var i = numpost; i < posts.length; i++) {
                    var full = posts[i].content;
                    var link = posts[i].link;
                    var title = posts[i].title;
                    var date = posts[i].publishedDate;

                    code += '<div class="mantanization-widget-recent-posts">';
                    code += '<div class="mantanizaation-widget-recent-posts-text left">';
                    code += '<a href="'+link+'">'+title+'</a>';
                    code += '<p>'+Date.create(date).relative()+'</p>';
                    code += '<div class="post-content">'+full+'</div>';
                    code += '</div>';
                    code += '<div class="clearfix"></div>';
                    code += '</div>';
                }
                
                $("#mantanization-widget-recent-posts-wrapper").html(code);

                mantanizationApp.mantan_create_thumbnail();
                $('.post-content').remove();
            }
        });
    },
    mantan_create_imagehover:function(src, alt, url){
        var imghover = String('');
        imghover +='<div class=\"img-hover\">';
        imghover +='<div class=\"img-hover-content\">';
        imghover +='<a href=\"'+src+'\" title=\"'+alt+'\" class=\"mantanization-popup\"><i class=\"fa fa-search\"></i></a>';
        imghover +='<a href=\"'+url+'\"><i class=\"fa fa-link\"></i></a>';
        imghover +='</div>';
        imghover +='</div>';
                
        return imghover;
    },
    mantan_generate_imagehover:function(){
        function generateImghover(){
            $('.mantanization-post').each( function(){
                var featured = $('.mantanization-post-featured');
                var posturl = $('.mantanization-post-title');
                
                var image = $(this, featured).find('img');
                var imagesrc = image.attr('src');
                var imagealt = image.attr('alt');
                
                var url = $(this, posturl).find('a');
                var hyperlink = url.attr('href');

                if(typeof imagesrc !== 'undefined'){
                    $(this).find('.mantanization-post-featured').append(mantanizationApp.mantan_create_imagehover(imagesrc,imagealt,hyperlink));
                }
            });
            
            $('.mantanization-popup').magnificPopup({type:'image'});
        }
        generateImghover();
    },
    mantan_style_switcher:function(){
        $('.switcher-button').click(function(){
            if($(this).parent().css('right') == '-212px'){
                $(this).parent().animate({"right": "0px"}, 300);
            }
            else{
                $(this).parent().animate({"right": "-212px"}, 300);
            }
        });
    },
    mantan_change_sidebar:function(){
        $('.right-sidebar').click(function(e){
            e.preventDefault();
            $('#mantanization-body .col-md-8').after($('#mantanization-body .col-md-4'));
            $('#mantanization-body .col-md-4').css('padding-right','0px');
            $('#mantanization-body .col-md-4').css('padding-left','35px');
            $('#mantanization-pagination').css('text-align','left');
            
            if (matchMedia('only screen and (max-width: 990px)').matches) {
                $('#mantanization-body .col-md-4').css('padding-right','20px');
                $('#mantanization-body .col-md-4').css('padding-left','20px');
            }
            
            if (matchMedia('only screen and (max-width: 320px)').matches) {
                $('#mantanization-body .col-md-4').css('padding-right','10px');
                $('#mantanization-body .col-md-4').css('padding-left','10px');
            }
        });
        
        $('.left-sidebar').click(function(e){
            e.preventDefault();
            $('#mantanization-body .col-md-4').after($('#mantanization-body .col-md-8'));
            $('#mantanization-body .col-md-4').css('padding-right','35px');
            $('#mantanization-body .col-md-4').css('padding-left','0px');
            $('#mantanization-pagination').css('text-align','right');
            
            if (matchMedia('only screen and (max-width: 990px)').matches) {
                $('#mantanization-body .col-md-4').css('padding-right','20px');
                $('#mantanization-body .col-md-4').css('padding-left','20px');
            }
            
            if (matchMedia('only screen and (max-width: 320px)').matches) {
                $('#mantanization-body .col-md-4').css('padding-right','10px');
                $('#mantanization-body .col-md-4').css('padding-left','10px');
            }
        });
    },
    mantan_facebook:function(){
        var mantan_fb = String('');
        mantan_fb += '<iframe src="//www.facebook.com/plugins/likebox.php?href='+facebook_page+'&amp;width=262&amp;colorscheme=light&amp;show_faces=true&amp;stream=false&amp;header=false&amp;height=300" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:262px; height:300px;" allowTransparency="true"></iframe>';
        $('#mantanization-facebook-page').append(mantan_fb);
    },
    mantan_google_plus:function(){
        var mantan_google_plus = String('');
		mantan_google_plus +='<script type="text/javascript" src="https://apis.google.com/js/plusone.js"></script>';
        mantan_google_plus +='<div class="g-person" data-width="262" data-href="'+google_plus+'"></div>';
        
        $('.g-page-wrapper').append(mantan_google_plus);
    },
    mantan_twitter:function(){
        var mantan_twitter = String('');
        mantan_twitter += '<a class="twitter-timeline" href="'+twitter_url+'" data-widget-id="'+twitter_widget_id+'" data-link-color="#0062CC" data-chrome="nofooter noscrollbar" data-tweet-limit="3">';
        mantan_twitter += 'Tweets';
        mantan_twitter += '</a>';
        mantan_twitter += "<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+\"://platform.twitter.com/widgets.js\";fjs.parentNode.insertBefore(js,fjs);}}(document,\"script\",\"twitter-wjs\");</script>";
        
        $('#mantanization-wdiget-twitter').append(mantan_twitter);
    },
    mantan_ribbon:function(){
        var ribbon = String('');
        ribbon = '<div class="ribbon"><i class="fa fa-star-o"></i></div>';
        
        $('.featured .mantanization-post-featured').append(ribbon);
    },
    mantan_init:function(){
        mantanizationApp.mantan_reset();
        mantanizationApp.mantan_widget();
        mantanizationApp.mantan_flickr();
        mantanizationApp.mantan_facebook();
        mantanizationApp.mantan_twitter();
        mantanizationApp.mantan_google_plus();
        mantanizationApp.mantan_generate_thumbnail();
        mantanizationApp.mantan_generate_imagehover();
        mantanizationApp.mantan_style_switcher();
        mantanizationApp.mantan_change_sidebar();
        mantanizationApp.mantan_ribbon();
    }
}

/* === INITIALING === */
$(document).ready(function(){
    mantanizationApp.mantan_init();
});

}(jQuery));