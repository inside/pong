var Pong = Class.create(
{
    gameArea      : null,
    intervalId    : null,
    isPaused      : false,
    width         : 200,
    height        : 200,
    lp            : null,
    rp            : null,
    ball          : null,

    initialize: function(p)
    {
        this.gameArea = document.createElement('div');
        this.gameArea.setAttribute('id', 'pong-game-area');
        this.gameArea.setAttribute('style', 'width: ' + this.width + 'px; height: ' + this.height + 'px;');
        document.getElementsByTagName('body')[0].appendChild(this.gameArea);
        this.lp = new Paddle(
        {
            'container': this,
            'id': 'pong-left',
            'width': 10,
            'height': 50,
            'x': 0,
            'y': 70,
        });
        this.rp = new Paddle(
        {
            'container': this,
            'id': 'pong-right',
            'width': 10,
            'height': 50,
            'x': 190,
            'y': 70,
        });
        this.ball = new Ball(
        {
            'container': this,
            'id': 'pong-ball',
            'width': 10,
            'height': 10,
            'x': 90,
            'y': 90,
        });

        // handle keystrokes
        document.observe('keydown', this.keydownHandler.bind(this));
        document.observe('keyup', this.keyupHandler.bind(this));

        this.start();
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
            this.toggleStartStop();
        }
    },
    start: function()
    {
        this.intervalId = setInterval(this.update.bind(this), 30);
    },
    stop: function()
    {
        clearInterval(this.intervalId);
        this.intervalId = null;
    },
    toggleStartStop: function()
    {
        if (this.isPaused)
        {
            this.isPaused = false;
            this.start();
        }
        else
        {
            this.isPaused = true;
            this.stop();
        }
    }
});

var Equipement = Class.create(
{
    id         : null,
    x          : null,
    y          : null,
    width      : null,
    height     : null,
    container  : null,
    speed      : null,
    domElement : null,

    initialize: function(p)
    {
        this.id        = p.id;
        this.width     = p.width;
        this.height    = p.height;
        this.x         = p.x;
        this.y         = p.y;
        this.container = p.container;

        var el = document.createElement('div');
        el.setAttribute('id', this.id);
        el.setAttribute('style', 'width: ' + this.width + 'px; height: ' + this.height + 'px;');
        this.container.gameArea.appendChild(el);
        this.domElement = $(this.id);
        this.setPosition(this.x, this.y);
    },
    setPosition: function(x, y)
    {
       this.domElement.style.left = x + 'px';
       this.domElement.style.top  = y + 'px';
    },
    hoverlap: function(rectangle)
    {
        return (this.x < rectangle.x + rectangle.width) && (rectangle.x < this.x + this.width);
    },
    voverlap: function(rectangle)
    {
        return (this.y < rectangle.y + rectangle.height) && (rectangle.y < this.y + this.height)
    },
    overlap: function(rectangle)
    {
        return this.hoverlap(rectangle) && this.voverlap(rectangle);
    }
});

var Paddle = Class.create(Equipement,
{
    speed       : 10,
    isGoingUp   : false,
    isGoingDown : false,

    initialize: function($super, p)
    {
        $super(p);
    },
    moveUp: function()
    {
        var y = this.y - this.speed;

        if (y <= 0)
        {
            this.y = 0
        }
        else
        {
            this.y = y;
        }

        this.setPosition(this.x, this.y);
    },
    moveDown: function()
    {
        var y = this.y + this.speed;

        if (y >= this.container.height - this.height)
        {
            this.y = this.container.height - this.height;
        }
        else
        {
            this.y = y;
        }

        this.setPosition(this.x, this.y);
    },
    isMoving: function()
    {
        return this.isGoingUp || this.isGoingDown;
    }
});

var Ball = Class.create(Equipement,
{
    speed   : 9,
    V       : $V([1, 0]),
    vX      : null,
    vY      : null,

    initialize: function($super, p)
    {
        this.vX = this.V.e(1);
        this.vY = this.V.e(2);
        $super(p);
    },
    move: function()
    {
        var x = this.x + (this.vX * this.speed);
        var y = this.y + (this.vY * this.speed);

        // Left and right walls
        if (x <= 0)
        {
            this.x = 0;
            console.log('Left player you loose.');
        }
        else if (x >= this.container.width - this.width)
        {
            this.x = this.container.width - this.width;
            console.log('Right player you loose.');
        }
        else
        {
            this.x = x;
        }

        // Paddles rebound
        if (this.overlap(this.container.lp))
        {
            this.x = this.container.lp.x + this.container.lp.width;
            this.reboundsOnPaddle(this.container.lp);
        }
        else if (this.overlap(this.container.rp))
        {
            this.x = this.container.rp.x - this.width;
            this.reboundsOnPaddle(this.container.rp);
        }

        // Floor and ceiling
        if (y <= 0)
        {
            this.vY *= -1;
            this.y = 0;
        }
        else if (y >= this.container.height - this.height)
        {
            this.vY *= -1;
            this.y = this.container.height - this.height;
        }
        else
        {
            this.y = y;
        }

        this.V = $V([this.vX, this.vY]).toUnitVector();
        this.vX = this.V.e(1);
        this.vY = this.V.e(2);
        this.setPosition(this.x, this.y);
    },
    reboundsOnPaddle: function(paddle)
    {
        this.vX *= -1;
        this.vY = ((this.y + this.height / 2) - (paddle.y + paddle.height / 2)) / (paddle.height / 2);
        this.vY *= 1.3;

        if (this.vY > 1)
        {
            this.vX += this.vY - 1;
            this.vY = 1;
        }
    }
});

document.observe('dom:loaded', function()
{
    var pong = new Pong();
});
