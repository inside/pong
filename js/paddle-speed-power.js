var PaddleSpeedPower = Class.create(Projectile,
{
    paddleSpeeds: [3, 17],
    paddleSpeed: null,
    initialize: function($super, p)
    {
        $super(p);
        this.speed = this.container.powerProjectileInitialSpeed;
        this.paddleSpeed = this.paddleSpeeds[Math.round(Math.random())];

        if (this.paddleSpeed > this.container.paddleInitialSpeed)
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
