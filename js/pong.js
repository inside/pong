//http://www.developpez.net/forums/d776649/autres-langages/algorithmes/detecter-lintersection-entre-rectangles/
function hoverlap(rect1, rect2)
{
//    boolean hoverlap = (x1<x2+w2) && (x2<x1+w1);
    return (rect1.x < rect2.x + rect2.width) && (rect2.x < rect1.x + rect1.width);
}

function voverlap(rect1, rect2)
{
//    boolean voverlap = (y1<y2+h2) && (y2<y1+h1);
    return (rect1.y < rect2.y + rect2.height) && (rect2.y < rect1.y + rect1.height)
}

function overlap(rect1, rect2)
{
    return hoverlap(rect1, rect2) && voverlap(rect1, rect2);
}

Pong = function()
{
    this.gameArea      = null;
    this.intervalId    = null;
    this.isPaused      = false;
    this.width         = 200;
    this.height        = 200;
    this.lp            = null;
    this.rp            = null;
    this.isLpGoingUp   = false;
    this.isLpGoingDown = false;
    this.isRpGoingUp   = false;
    this.isRpGoingDown = false;

    this.init = function()
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
        this.lp.init();
        this.rp = new Paddle(
        {
            'container': this,
            'id': 'pong-right',
            'width': 10,
            'height': 50,
            'x': 190,
            'y': 70,
        });
        this.rp.init();
        this.ball = new Ball(
        {
            'container': this,
            'id': 'pong-ball',
            'width': 10,
            'height': 10,
            'x': 90,
            'y': 90,
        });
        this.ball.init();

        // handle keystrokes
        document.observe('keydown', this.keydownHandler.bind(this));
        document.observe('keyup', this.keyupHandler.bind(this));

        this.start();
    };

    this.update = function()
    {
        if (this.isLpGoingUp)
        {
            this.lp.moveUp();
        }
        else if (this.isLpGoingDown)
        {
            this.lp.moveDown();
        }
        if (this.isRpGoingUp)
        {
            this.rp.moveUp();
        }
        else if (this.isRpGoingDown)
        {
            this.rp.moveDown();
        }

        this.ball.move();
    };

    this.keydownHandler = function(e)
    {
        if (e.keyCode == 65) // A
        {
            this.isLpGoingUp = true;
            this.isLpGoingDown = false;
        }
        else if (e.keyCode == 81) // Q
        {
            this.isLpGoingUp = false;
            this.isLpGoingDown = true;
        }
        else if (e.keyCode == 38) // Up arrow
        {
            this.isRpGoingUp = true;
            this.isRpGoingDown = false;
        }
        else if (e.keyCode == 40) // Down arrow
        {
            this.isRpGoingUp = false;
            this.isRpGoingDown = true;
        }
    };

    this.keyupHandler = function(e)
    {
        if (e.keyCode == 65) // A
        {
            this.isLpGoingUp = false;
        }
        else if (e.keyCode == 81) // Q
        {
            this.isLpGoingDown = false;
        }
        else if (e.keyCode == 38) // Up arrow
        {
            this.isRpGoingUp = false;
        }
        else if (e.keyCode == 40) // Down arrow
        {
            this.isRpGoingDown = false;
        }
        else if (e.keyCode == 80) // P pause
        {
            this.toggleStartPause();
        }
    };

    this.start = function()
    {
        this.intervalId = setInterval(this.update.bind(this), 30);
    };

    this.stop = function()
    {
        clearInterval(this.intervalId);
        this.intervalId = null;
    };

    this.toggleStartPause = function()
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
    };
};

Paddle = function(p)
{
    this.id        = p.id;
    this.width     = p.width;
    this.height    = p.height;
    this.x         = p.x;
    this.y         = p.y;
    this.container = p.container;
    this.speed     = 10;
    this.el        = null;

    this.init = function()
    {
        var el = document.createElement('div');
        el.setAttribute('id', this.id);
        el.setAttribute('style', 'width: ' + this.width + 'px; height: ' + this.height + 'px;');
        this.container.gameArea.appendChild(el);
        this.el = $(this.id);
        this.setPosition(this.x, this.y);
    };

    this.moveUp = function()
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
    };

    this.moveDown = function()
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
    };

    this.setPosition = function(x, y)
    {
       this.el.style.left = x  + 'px';
       this.el.style.top  = y  + 'px';
    };
};

Ball = function(p)
{
    this.id        = p.id;
    this.container = p.container;
    this.width     = p.width;
    this.height    = p.height;
    this.x         = p.x;
    this.y         = p.y;
    this.speed     = 3;
    this.vX        = 1;
    this.vY        = 0.5;
    this.el        = null;

    this.init = function()
    {
        var el = document.createElement('div');
        el.setAttribute('id', this.id);
        el.setAttribute('style', 'width: ' + this.width + 'px; height: ' + this.height + 'px;');
        this.container.gameArea.appendChild(el);
        this.el = $(this.id);
        this.setPosition(this.x, this.y);
    };

    this.move = function()
    {
        var x = this.x + (this.vX * this.speed);
        var y = this.y + (this.vY * this.speed);

        // Left and right walls
        if (x <= 0)
        {
            this.x = 0;
            console.log('left player you loose');
        }
        else if (x >= this.container.width - this.width)
        {
            this.x = this.container.width - this.width;
            console.log('right player you loose');
        }
        else
        {
            this.x = x;
        }

        // Paddles rebound
        if (overlap(this.container.lp, this))
        {
            this.x = this.container.lp.x + this.container.lp.width;
            this.vX *= -1;
        }
        else if (overlap(this.container.rp, this))
        {
            this.x = (this.container.rp.x - this.width) + (this.vX * this.speed);
            this.vX *= -1;
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

        this.setPosition(this.x, this.y);
    };

    this.setPosition = function(x, y)
    {
       this.el.style.left = x + 'px';
       this.el.style.top  = y + 'px';
    };
}

document.observe('dom:loaded', function()
{
    var pong = new Pong();
    pong.init();
});
