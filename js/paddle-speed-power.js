var PaddleSpeedPower = Class.create(Projectile,
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
            this.domElement.insert({bottom: '<span>speed + 1</span>'});
            this.domElement.addClassName('paddle-speed-power bonus');
        }
        else
        {
            this.domElement.insert({bottom: '<span>speed - 1</span>'});
            this.domElement.addClassName('paddle-speed-power malus');
        }
    },
    move: function($super)
    {
        $super();

        if (this.hitsLeftPaddle())
        {
            this.container.leftPaddle.speed = this.paddleSpeed;
            this.diesNow = true;
        }
        else if (this.hitsRightPaddle())
        {
            this.container.rightPaddle.speed = this.paddleSpeed;
            this.diesNow = true;
        }

        this.setPosition(this.x, this.y);
    }
});
