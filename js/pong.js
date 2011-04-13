var Pong = Class.create(
{
    // DOM elements
    area                           : null,
    leftPaddle                     : null,
    rightPaddle                    : null,

    period                         : 0,
    timeoutId                      : null,
    leftPlayer                     : null,
    rightPlayer                    : null,
    projectiles                    : [],
    projectileIncrementalId        : 0,
    availableWeightedProjectiles   : [['paddle-speed-power', 15],
                                        ['opponents-paddle-speed-power', 15],
                                        ['ball', 70]],
    paused                         : false,
    started                        : false,
    fireProjectileTime             : 0,     // time
    fireProjectileDelayMin         : 1000,  // milliseconds
    fireProjectileDelayMax         : 2000, // milliseconds
    startTime                      : 0,     // milliseconds
    time                           : 0,     // milliseconds

    initialize: function(p)
    {
        this.period = Math.round(1000 / FRAME_RATE);
        this.area = new Element('div', {id: 'pong-area'});
        this.area.setStyle({width: PONG_WIDTH + 'px', height: PONG_HEIGHT + 'px'});
        $('pong-placeholder').replace(this.area);
        this.leftPaddle = new Paddle(
        {
            'container' : this,
            'id'        : 'pong-left',
            'side'      : 'left'
        });
        this.rightPaddle = new Paddle(
        {
            'container' : this,
            'id'        : 'pong-right',
            'side'      : 'right'
        });

        this.projectiles.push(this.createNewProjectile('ball'));
        this.leftPlayer  = new Player({name: 'left'});
        this.rightPlayer = new Player({name: 'right'});

        // handle keystrokes
        var keyboard = new Keyboard();
        document.observe('keydown', keyboard.keyDownHandler.bind(keyboard, this));
        document.observe('keyup', keyboard.keyUpHandler.bind(keyboard, this));
    },
    update: function()
    {
        this.time = Helper.getTime() - this.startTime;
        this.startTime = Helper.getTime();

        // Paddles
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

        // Projectiles
        if (this.needsNewProjectile())
        {
            this.initFireProjectileTime();

            if (this.projectiles.length < MAX_PROJECTILES)
            {
                this.projectiles.push(this.createNewProjectile());
            }
        }

        for (var i = 0; i < this.projectiles.length; i++)
        {
            if (this.projectiles[i].isLiving(this.startTime))
            {
                this.projectiles[i].move();
            }
            else
            {
                this.projectiles[i].remove();
                delete this.projectiles[i];
                this.projectiles = this.projectiles.compact();
            }
        }

        // Score
        if (this.leftPlayer.hasReachedScore(MAX_SCORE))
        {
            console.log('Left player won with ' +
                this.leftPlayer.score +
                ' points. Right player lost with ' +
                this.rightPlayer.score);
            this.stop();
            return;
        }
        else if (this.rightPlayer.hasReachedScore(MAX_SCORE))
        {
            console.log('Right player won with ' +
                this.rightPlayer.score +
                ' points. Left player lost with ' +
                this.leftPlayer.score);
            this.stop();
            return;
        }

        this.timeoutId = setTimeout(this.update.bind(this), this.getNextFrameDelay());
    },
    getNextFrameDelay: function()
    {
        var processingTime = Helper.getTime() - this.startTime;

        if (this.period < processingTime)
        {
            return 0;
        }

        return this.period - processingTime;
    },
    start: function()
    {
        if (this.started)
        {
            return;
        }
        this.stop();
        this.leftPlayer.resetScore();
        this.rightPlayer.resetScore();
        this.pursue();
    },
    stop: function()
    {
        this.started = false;
        this.paused  = true;
        clearTimeout(this.timeoutId);
        this.timeoutId = null;

        this.projectiles.each(function(projectile)
        {
            projectile.remove();
        });

        this.projectiles = [];
        this.projectiles.push(this.createNewProjectile('ball'));
        this.leftPaddle.resetPosition();
        this.rightPaddle.resetPosition();
    },
    pause: function()
    {
        this.started = true;
        this.paused  = true;
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
    },
    pursue: function()
    {
        this.started = true;
        this.paused = false;
        this.startTime = Helper.getTime();
        this.initFireProjectileTime();
        this.timeoutId = setTimeout(this.update.bind(this), 0);
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
    initFireProjectileTime: function()
    {
        this.fireProjectileTime =
            Helper.getRandomFromRange(this.fireProjectileDelayMin, this.fireProjectileDelayMax) +
            this.startTime;
    },
    createNewProjectile: function(name)
    {
        if (typeof name === 'undefined')
        {
            var name = Helper.getWeightedRandomValue(this.availableWeightedProjectiles);
        }

        var id = 'pong-' + name + '-' + this.projectileIncrementalId++;
        var projectile = null;

        switch (name)
        {
            case 'ball':
                projectile = new Ball(
                {
                    'container' : this,
                    'id'        : id
                });
                break;
            case 'paddle-speed-power':
                projectile = new PaddleSpeedPower(
                {
                    'container' : this,
                    'id'        : id
                });
                break;
            case 'opponents-paddle-speed-power':
                projectile = new OpponentsPaddleSpeedPower(
                {
                    'container' : this,
                    'id'        : id
                });
                break;
            default:
                console.log('try to add an unknown projectile');
                break;
        }

        return projectile;
    },
    needsNewProjectile: function()
    {
        return this.fireProjectileTime <= this.startTime;
    }
});
