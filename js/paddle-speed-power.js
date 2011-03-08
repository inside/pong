var PaddleSpeedPower = Class.create(Projectile,
{
    paddleSpeeds: [PADDLE_MIN_SPEED, PADDLE_MAX_SPEED],
    paddleSpeed: null,
    initialize: function($super, p)
    {
        this.width = POWER_PROJECTILE_INITIAL_WIDTH;
        this.height = POWER_PROJECTILE_INITIAL_HEIGHT;
        this.speed = POWER_PROJECTILE_INITIAL_SPEED;
        this.paddleSpeed = this.paddleSpeeds[Math.round(Math.random())];
        $super(p);

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
