// ==UserScript==
// @name        Pixiv Touch Moe
// @namespace   noelpinch
// @description For Pixiv mobile
// @include     https://touch.pixiv.net/member_illust.php*
// @include     https://touch.pixiv.net/bookmark_new_illust.php*
// @include     https://touch.pixiv.net/bookmark.php?id=*
// @include     https://touch.pixiv.net/illust_recommendation.php*
// @include     https://touch.pixiv.net/search.php?tag=*
// @include     https://touch.pixiv.net/ranking.php*
// @include     https://touch.pixiv.net/recommended.php*
// @version     0.3.4
// @grant       none
// ==/UserScript==
//

(function() {
    console.log('pixiv touch moe v0.3.4');

    // Global style: img.height -> auto!
    var css = '.imglist.modethumbnail li div.imgbox:not(.muted) img, .imglist-static.modethumbnail li div.imgbox:not(.muted) img { height: auto !important;}' +
              '.imglist.modethumbnail li div.works-info .like { height: 64px; }';
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);

    // Remove popup-recommend
    var pr = document.getElementsByClassName('popup-recommend');
    if (pr.length > 0) pr[0].remove();

    var imglist = document.getElementsByClassName('imglist');

    var replace_imgs = function() {
        // Remove ads on member works page
        if (imglist.length == 1) {
            var ads = imglist[0].getElementsByClassName('grid_ad');
            if (ads.length && ads[0].style.display !== 'none')
                ads[0].style.display = 'none';
        }

        // FIXME not looping
        for (var j = imglist.length - 1; j >= 0; j--) {
            var imgs = imglist[j].getElementsByTagName("img");
            for (var i in imgs) {
                if (imgs[i].src.indexOf('data:') == 0) {
                    break;
                }
                if (imgs[i].src.indexOf('128x128') < 0) {
                    continue;
                }
                imgs[i].src = imgs[i].src.replace('128x128', '480x960').replace('square', 'master');
                imgs[i].style.objectFit = 'cover';
                imgs[i].style.objectPosition = 'top center';
                imgs[i].style.height = 'auto';
            }
        }
    }

    if (imglist.length > 0) {
        var observer = new MutationObserver(function(mutations) {
            replace_imgs();
        });
        observer.observe(imglist[imglist.length - 1], { childList: true, subtree: true, attributes: true });
    }

})();
