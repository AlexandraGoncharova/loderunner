GAME.Controls = {
    
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    keysPressed: [],
    
    /**
     * init listeners
     */
    start: function()
    {
        var self = this;
        
        this.keyDownHandler = function(e)
        {
            self.keyDown(e);
        };
        document.addEventListener('keydown', this.keyDownHandler);
            
        this.keyUpHandler = function(e)
        {
            self.keyUp(e);
        };
        document.addEventListener('keyup', this.keyUpHandler);
    },

    stop: function() {
        document.removeEventListener('keydown', this.keyDownHandler);
        document.removeEventListener('keyup', this.keyUpHandler);
        this.keysPressed = [];
    },
    
    keyDown: function(e) {
        this.keysPressed[e.keyCode] = true;
    },
    
    keyUp: function(e) {
        this.keysPressed[e.keyCode] = false;
    },
    pressed: function(keyCode) {
        return this.keysPressed[keyCode];
    }
};
