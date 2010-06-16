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
        if (this.isLpGoingDown)
        {
            this.lp.moveDown();
        }
        if (this.isRpGoingUp)
        {
            this.rp.moveUp();
        }
        if (this.isRpGoingDown)
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
    this.size      = p.size;
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

       if (x <= this.size / 2)
//       if (this.x <= 0)
       {
           this.vX = this.vX * -1;
           this.x = this.size / 2;
//           console.log('you loose');
       }
       else if (x >= this.container.width - this.size / 2)
       {
           this.vX = this.vX * -1;
           this.x = this.container.width - this.size / 2;
//           console.log('you loose');
       }
       else
       {
           this.x = x;
       }

       if (this.x <= (this.size / 2) + this.container.lp.width)
       {
           if (this.y >= $(this.container.lp.id).offsetTop && this.y <= $(this.container.lp.id).offsetTop + this.container.lp.height)
           {
               this.vX = this.vX * -1;
           }
       }
       if (this.x >= (this.container.width - this.size / 2) - this.container.rp.width)
       {
           if (this.y >= $(this.container.rp.id).offsetTop && this.y <= $(this.container.rp.id).offsetTop + this.container.rp.height)
           {
               this.vX = this.vX * -1;
           }
       }

       if (y <= this.size / 2)
       {
           this.vY = this.vY * -1;
           this.y = this.size / 2;
       }
       else if (y >= this.container.height - this.size / 2)
       {
           this.vY = this.vY * -1;
           this.y = this.container.height - this.size / 2;
       }
       else
       {
           this.y = y;
       }

       this.setPosition(this.x, this.y);
    };

    this.setPosition = function(x, y)
    {
       this.el.style.left = (x - this.size / 2) + 'px';
       this.el.style.top = (y - this.size / 2)  + 'px';
    };
}

document.observe('dom:loaded', function()
{
    var pong = new Pong();
    pong.init();
});
