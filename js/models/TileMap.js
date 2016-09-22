/**
 * Created by alexa on 22.09.2016.
 */
function TileMap(point, base, active, sprite, changed)
{
    this.cellX = point.x;
    this.cellY = point.y;
    this.active = active;
    this.base = base;
    this.sprite = sprite;
    this.isChanged = changed;
}
TileMap.prototype = Object.create(null);
TileMap.constructor = TileMap;



