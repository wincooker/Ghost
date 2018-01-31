
(function ($) {
    "use strict";

    $(document).ready(function(){

        $(".post").each(function() {
        	var thisel = $(this);
			if(thisel.find(".post-excerpt > p:first-child").has("img").length){

				if(thisel.find(".post-title").has("a").length){
					thisel.prepend("<div class='post-photo'><a href='"+thisel.find(".post-title a").attr("href")+"'></a></div>");
					thisel.find(".post-excerpt > p:first-child").has("img").find("img").prependTo(thisel.find(".post-photo a"));
				}else{
					thisel.prepend("<div class='post-photo'></div>");
					thisel.find(".post-excerpt > p:first-child").has("img").find("img").prependTo(thisel.find(".post-photo"));
				}
			}
			if(thisel.find(".post-excerpt").has("iframe[src^='http://www.youtube.com']").length){
				thisel.prepend("<div class='post-video'></div>");
				thisel.find(".post-excerpt").has("iframe").find("iframe:first-child").prependTo(thisel.find(".post-video"));
			}
			if(thisel.find(".post-excerpt").has("iframe[src^='https://w.soundcloud.com']").length){
				thisel.prepend("<div class='post-audio'></div>");
				thisel.find(".post-excerpt").has("iframe").find("iframe:first-child").prependTo(thisel.find(".post-audio"));
			}
			if(thisel.find(".post-excerpt").has("iframe[src^='//player.vimeo.com']").length){
				thisel.prepend("<div class='post-video'></div>");
				thisel.find(".post-excerpt").has("iframe").find("iframe:first-child").prependTo(thisel.find(".post-video"));
			}
        	
        });

    });

}(jQuery));