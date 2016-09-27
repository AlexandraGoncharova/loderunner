/**
 * Created by a.goncharova on 26.09.2016.
 */
function StorageService(name, type)//name - name for local storage, type - type storage: local or session
{
    var self = this,
        _name = name || '_gameStorage',
        _type = type || 'Local',
        _data;

    function _save(){
        var value = game.toJSON();
        var stringified = JSON.stringify( value ),
            storage = window[ _type + 'Storage' ];
        console.log(_name, stringified);
        storage.setItem(_name, stringified);

    }

    function _restore(){
        var  storage = window[ _type + 'Storage' ];
        _data = JSON.stringify(storage.getItem( _name )) || {};
    }

    function _init(){
        document.addEventListener('DOMContentLoaded', function(){
            _restore();
        });
        window.addEventListener('beforeunload', function(){
            _save();
        });
    }

    return {
        init: function(){
            _init();
        },
        get: function () {
            return _data;
        }
       }
}