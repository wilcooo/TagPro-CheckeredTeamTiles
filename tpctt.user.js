// ==UserScript==
// @name         TagPro Checkered Teamtiles
// @version      1.1
// @description  Replace the yellow teamtiles by checkered Red and Blue tiles.
// @author       Ko
// @include      http://tagpro-*.koalabeast.com:*
// @include      http://*.newcompte.fr:*
// @include      http://tangent.jukejuice.com:*
// @downloadURL  https://github.com/wilcooo/TagPro-CheckeredTeamTiles/raw/master/tpctt.user.js
// @supportURL   https://www.reddit.com/message/compose/?to=Wilcooo
// @license      MIT
// ==/UserScript==

const blue_first = false;
// change this to true if you want the top-right tile to be blue

tagpro.ready(function(){

    var ctt_cached = false;

    var org_getTexture = tagpro.tiles.getTexture;

    tagpro.tiles.getTexture = function (tile_code, tile, spread) {
        if (tile_code != 23 || (PIXI.utils.TextureCache[tile_code] && ctt_cached) ) {
            return org_getTexture(tile_code, tile, spread);
        }else{
            var canvas = document.createElement("canvas");
            canvas.width = 40;
            canvas.height = 40;
            var context = canvas.getContext("2d"),
                source = tagpro.tiles.image,
                red_teamtile = tagpro.tiles[11],
                blue_teamtile = tagpro.tiles[12],
                red  = {x: red_teamtile.x  * 40, y: red_teamtile.y  * 40},
                blue = {x: blue_teamtile.x * 40, y: blue_teamtile.y * 40};
            context.drawImage(source, red.x,  red.y,  40, 40, 0  + blue_first*20, 0,  20 + blue_first*20, 20);
            context.drawImage(source, blue.x, blue.y, 40, 40, 20 - blue_first*20, 0,  40 - blue_first*20, 20);
            context.drawImage(source, blue.x, blue.y, 40, 40, 0  + blue_first*20, 20, 20 + blue_first*20, 40);
            context.drawImage(source, red.x,  red.y,  40, 40, 20 - blue_first*20, 20, 40 - blue_first*20, 40);
            PIXI.utils.TextureCache[tile_code] = PIXI.Texture.fromCanvas(canvas);
            ctt_cached = true;
            return PIXI.utils.TextureCache[tile_code];
        }
    };
});
