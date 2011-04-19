var OpponentsPaddleSpeedPower = Class.create(Projectile,
{
    width        : POWER_PROJECTILE_INITIAL_WIDTH,
    height       : POWER_PROJECTILE_INITIAL_HEIGHT,
    speed        : POWER_PROJECTILE_INITIAL_SPEED,
    paddleSpeed  : null,
    paddleSpeeds : [PADDLE_MIN_SPEED, PADDLE_MAX_SPEED],

    initialize: function($super, p)
    {
        $super(p);

        this.paddleSpeed = this.paddleSpeeds[Math.round(Math.random())];

        if (this.paddleSpeed > PADDLE_INITIAL_SPEED)
        {
            this.domElement.insert({bottom: '<span>speed + 1 on opponent</span>'});
            this.domElement.addClassName('opponents-paddle-speed-power bonus');
        }
        else
        {
            this.domElement.insert({bottom: '<span>speed - 1 on opponent</span>'});
            this.domElement.addClassName('opponents-paddle-speed-power malus');
        }
    },
    move: function($super)
    {
        $super();

        if (this.hitsLeftPaddle())
        {
            this.container.rightPaddle.speed = this.paddleSpeed;
            this.diesNow = true;
            PowerTimer.rightPaddlePowers.set('paddle-speed-power',
                [Helper.getTime(), this.container.rightPaddle.resetSpeed.bind(this.container.rightPaddle)]);
        }
        else if (this.hitsRightPaddle())
        {
            this.container.leftPaddle.speed = this.paddleSpeed;
            this.diesNow = true;
            PowerTimer.leftPaddlePowers.set('paddle-speed-power',
                [Helper.getTime(), this.container.leftPaddle.resetSpeed.bind(this.container.leftPaddle)]);
        }

        this.setPosition(this.x, this.y);
    }
});
