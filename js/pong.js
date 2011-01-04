var Pong = Class.create(
{
    area             : null,
    updateIntervalId : null,
    updateInterval   : 30,   // milliseconds
    replayDelay      : 1000, // milliseconds
    width            : 500,  // pixels
    height           : 250,  // pixels
    leftPaddle       : null,
    rightPaddle      : null,
    leftPlayer       : null,
    rightPlayer      : null,
    ball             : null,
    paused           : false,
    started          : false,

    initialize: function(p)
    {
        this.area = document.createElement('div');
        this.area.setAttribute('id', 'pong-area');
        this.area.setAttribute('style', 'width: ' + this.width + 'px; height: ' + this.height + 'px;');
        document.getElementsByTagName('body')[0].appendChild(this.area);
        this.leftPaddle = new Paddle(
        {
            'container' : this,
            'id'        : 'pong-left',
            'width'     : 6,
            'height'    : 60,
            'position'  : 'left'
        });
        this.rightPaddle = new Paddle(
        {
            'container' : this,
            'id'        : 'pong-right',
            'width'     : 6,
            'height'    : 60,
            'position'  : 'right'
        });
        this.ball = new Ball(
        {
            'container' : this,
            'id'        : 'pong-ball',
            'width'     : 10,
            'height'    : 10
        });
        this.leftPlayer  = new Player({name: 'left'});
        this.rightPlayer = new Player({name: 'right'});

        // handle keystrokes
        var keyboard = new Keyboard();
        document.observe('keydown', keyboard.keyDownHandler.bind(keyboard, this));
        document.observe('keyup', keyboard.keyUpHandler.bind(keyboard, this));
    },
    update: function()
    {
        if (this.leftPaddle.isGoingUp)
        {
            this.leftPaddle.moveUp();
        }
        else if (this.leftPaddle.isGoingDown)
        {
            this.leftPaddle.moveDown();
        }
        if (this.rightPaddle.isGoingUp)
        {
            this.rightPaddle.moveUp();
        }
        else if (this.rightPaddle.isGoingDown)
        {
            this.rightPaddle.moveDown();
        }

        this.ball.move();
    },
    start: function()
    {
        if (this.started)
        {
            return;
        }
        this.stop();
        this.pursue();
    },
    stop: function()
    {
        this.started = false;
        this.paused  = true;
        clearInterval(this.updateIntervalId);
        this.updateIntervalId = null;
        this.ball.resetPosition();
        this.leftPaddle.resetPosition();
        this.rightPaddle.resetPosition();
    },
    pause: function()
    {
        this.started = true;
        this.paused  = true;
        clearInterval(this.updateIntervalId);
        this.updateIntervalId = null;
    },
    pursue: function()
    {
        this.started          = true;
        this.paused           = false;
        this.updateIntervalId =
            setInterval(this.update.bind(this), this.updateInterval);
    },
    togglePause: function()
    {
        if (!this.started)
        {
            return;
        }
        if (this.paused)
        {
            this.pursue();
        }
        else
        {
            this.pause();
        }
    },
    replay: function()
    {
        this.pause();
        setTimeout(this.stop.bind(this), this.replayDelay);
    }
});
