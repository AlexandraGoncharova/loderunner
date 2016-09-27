/**
 * Created by a.goncharova on 27.09.2016.
 */
function Entity()
{
    
}
Entity.prototype = Object.create(null);
Entity.constructor = Entity;
Entity.prototype.getJsonData = function()
{
    var data = {},
        keys = Object.keys(this),
        self = this;

    keys.forEach(function (key, index, arr) {
        if (typeof(self[key]) != "object" && typeof(self[key]) != "function")
        {
            data[key] = self[key];
        }
    });

    return JSON.stringify(data);
};