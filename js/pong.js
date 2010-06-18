//http://www.developpez.net/forums/d776649/autres-langages/algorithmes/detecter-lintersection-entre-rectangles/
function hoverlap(rect1, rect2)
{
//    boolean hoverlap = (x1<x2+w2) && (x2<x1+w1);
    return (rect1.el.offsetLeft < rect2.el.offsetLeft + rect2.width) && (rect2.el.offsetLeft < rect1.el.offsetLeft + rect1.width);
}

function voverlap(rect1, rect2)
{
//    boolean voverlap = (y1<y2+h2) && (y2<y1+h1);
    return (rect1.el.offsetTop < rect2.el.offsetTop + rect2.height) && (rect2.el.offsetTop <rect1.el.offsetTop + rect1.height)
}

function overlap(rect1, rect2)
{
    return hoverlap(rect1, rect2) && voverlap(rect1, rect2);
}

Pong = function()
{
    this.gameArea      = null;
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
            'height': 50
        });
        this.lp.init();
        this.rp = new Paddle(
        {
            'container': this,
            'id': 'pong-right',
            'width': 10,
            'height': 50
        });
        this.rp.init();
        this.ball = new Ball(
        {
            'container': this,
            'id': 'pong-ball',
            'size': 10,
            'x': 90,
            'y': 90,
        });
        this.ball.init();

        // handle keystrokes
        document.observe('keydown', this.keydownHandler.bind(this));
        document.observe('keyup', this.keyupHandler.bind(this));

        setInterval(this.update.bind(this), 30);
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
        if (e.keyCode == 38) // Up arrow
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
        if (e.keyCode == 81) // Q
        {
            this.isLpGoingDown = false;
        }
        if (e.keyCode == 38) // Up arrow
        {
            this.isRpGoingUp = false;
        }
        if (e.keyCode == 40) // Down arrow
        {
            this.isRpGoingDown = false;
        }
    };
};

Paddle = function(p)
{
    this.id        = p.id;
    this.width     = p.width;
    this.height    = p.height;
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
    };

    this.moveUp = function()
    {
        if (this.el.offsetTop <= 0)
        {
            return;
        }

        this.el.style.top = (this.el.offsetTop - this.speed) + 'px';
    };

    this.moveDown = function()
    {
        if (this.el.offsetTop >= this.container.height - this.height)
        {
            return;
        }

        this.el.style.top = (this.el.offsetTop + this.speed) + 'px';
    };
};

Ball = function(p)
{
    this.id        = p.id;
    this.container = p.container;
    this.size      = this.width = this.height = p.size;
    this.halfSize  = p.size / 2;
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
        el.setAttribute('style', 'width: ' + this.size + 'px; height: ' + this.size + 'px;');
        this.container.gameArea.appendChild(el);
        this.el = $(this.id);
        this.setPosition(this.x, this.y);
    };

    this.move = function()
    {
//        def overlaps?(rect)
//            (rect.right >= @left and rect.left <= @right and rect.bottom >= @top and rect.top <= @bottom)
//              end
        var x = this.x + (this.vX * this.speed);
        var y = this.y + (this.vY * this.speed);

        // Left and right walls
        if (x <= this.halfSize)
        {
            this.x = this.halfSize;
            console.log('left player you loose');
        }
        else if (x >= this.container.width - this.halfSize)
        {
            this.x = this.container.width - this.halfSize;
            console.log('right player you loose');
        }
        else
        {
            this.x = x;
        }

        // Paddles rebound
        if (overlap(this.container.lp, this))
        {
            this.vX *= -1;
        }
//        if (this.x <= (this.halfSize) + this.container.lp.width)
//        {
//            if (this.y >= $(this.container.lp.id).offsetTop && this.y <= $(this.container.lp.id).offsetTop + this.container.lp.height)
//            {
//                this.vX *= -1;
//            }
//        }
        if (overlap(this.container.rp, this))
        {
            this.vX *= -1;
        }
//        if (this.x >= (this.container.width - this.halfSize) - this.container.rp.width)
//        {
//            if (this.y >= $(this.container.rp.id).offsetTop && this.y <= $(this.container.rp.id).offsetTop + this.container.rp.height)
//            {
//                this.vX *= -1;
//            }
//        }

        // Floor and ceiling
        if (y <= this.halfSize)
        {
            this.vY *= -1;
            this.y = this.halfSize;
        }
        else if (y >= this.container.height - this.halfSize)
        {
            this.vY *= -1;
            this.y = this.container.height - this.halfSize;
        }
        else
        {
            this.y = y;
        }

        this.setPosition(this.x, this.y);
    };

    this.setPosition = function(x, y)
    {
       this.el.style.left = (x - this.halfSize) + 'px';
       this.el.style.top = (y - this.halfSize)  + 'px';
    };
}

document.observe('dom:loaded', function()
{
    var pong = new Pong();
    pong.init();
});
