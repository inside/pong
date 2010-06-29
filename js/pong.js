var Pong = Class.create(
{
    gameArea      : null,
    intervalId    : null,
    width         : 500,
    height        : 250,
    lp            : null,
    rp            : null,
    leftPlayer    : null,
    rightPlayer   : null,
    ball          : null,
    paused        : false,
    started       : false,
    stopped       : true,

    initialize: function(p)
    {
        this.gameArea = document.createElement('div');
        this.gameArea.setAttribute('id', 'pong-game-area');
        this.gameArea.setAttribute('style', 'width: ' + this.width + 'px; height: ' + this.height + 'px;');
        document.getElementsByTagName('body')[0].appendChild(this.gameArea);
        this.lp = new Paddle(
        {
            'container' : this,
            'id'        : 'pong-left',
            'width'     : 6,
            'height'    : 60,
            'position'  : 'left'
        });
        this.rp = new Paddle(
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
        document.observe('keydown', this.keydownHandler.bind(this));
        document.observe('keyup', this.keyupHandler.bind(this));
    },
    update: function()
    {
        if (this.lp.isGoingUp)
        {
            this.lp.moveUp();
        }
        else if (this.lp.isGoingDown)
        {
            this.lp.moveDown();
        }
        if (this.rp.isGoingUp)
        {
            this.rp.moveUp();
        }
        else if (this.rp.isGoingDown)
        {
            this.rp.moveDown();
        }

        this.ball.move();
    },
    keydownHandler: function(e)
    {
        if (e.keyCode == 65) // A
        {
            this.lp.isGoingUp   = true;
            this.lp.isGoingDown = false;
        }
        else if (e.keyCode == 81) // Q
        {
            this.lp.isGoingUp   = false;
            this.lp.isGoingDown = true;
        }
        else if (e.keyCode == 38) // Up arrow
        {
            this.rp.isGoingUp   = true;
            this.rp.isGoingDown = false;
        }
        else if (e.keyCode == 40) // Down arrow
        {
            this.rp.isGoingUp   = false;
            this.rp.isGoingDown = true;
        }
    },
    keyupHandler: function(e)
    {
        if (e.keyCode == 65) // A
        {
            this.lp.isGoingUp = false;
        }
        else if (e.keyCode == 81) // Q
        {
            this.lp.isGoingDown = false;
        }
        else if (e.keyCode == 38) // Up arrow
        {
            this.rp.isGoingUp = false;
        }
        else if (e.keyCode == 40) // Down arrow
        {
            this.rp.isGoingDown = false;
        }
        else if (e.keyCode == 80) // P pause
        {
            this.togglePause();
        }
        else if (e.keyCode == 83) // S stop
        {
            this.stop();
        }
        else if (e.keyCode == 32) // Space bar start
        {
            this.start();
        }
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
        this.started    = false;
        this.stopped    = true;
        this.paused     = true;
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.ball.resetPosition();
        this.lp.resetPosition();
        this.rp.resetPosition();
    },
    pause: function()
    {
        this.started    = true;
        this.stopped    = false;
        this.paused     = true;
        clearInterval(this.intervalId);
        this.intervalId = null;
    },
    pursue: function()
    {
        this.started    = true;
        this.stopped    = false;
        this.paused     = false;
        this.intervalId = setInterval(this.update.bind(this), 30);
    },
    togglePause: function()
    {
        if (this.stopped)
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
    pauseAndStopAfterAdelay: function()
    {
        this.pause();
        setTimeout(this.stop.bind(this), 1000);
    }
});
