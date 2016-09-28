/**
 * Created by a.goncharova on 26.09.2016.
 */
function StorageService(name, type, savedObject)//name - name for local storage, type - type storage: local or session
{
    var self = this,
        _name = name || '_gameStorage',
        _type = type || 'localStorage',
        _objToSave = savedObject || null,
        _data;

    function _save(){
        if (!_objToSave)
        {
            console.error("No Object for get data");
            return;
        }
        var value = _objToSave.toJSON();
        var stringified = JSON.stringify( value ),
            storage = window[ _type ];
        storage.setItem(_name, stringified);

    }

    function _restore(){
        var  storage = window[ _type  ];
        _data = JSON.parse(storage.getItem( _name ));
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