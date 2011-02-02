var PaddleSpeedPower = Class.create(Projectile,
{
    speed         : 2,
    initialize: function($super, p)
    {
        $super(p);
        this.domElement.addClassName('paddle-speed-power');
        this.domElement.insert({bottom: '<span>speed + 1</span>'});
    },
    move: function($super)
    {
        $super();

        if (this.hitsLeftPaddle())
        {
            this.container.leftPaddle.speed = 17;
            this.diesNow = true;
        }
        else if (this.hitsRightPaddle())
        {
            this.container.rightPaddle.speed = 17;
            this.diesNow = true;
        }

        this.setPosition(this.x, this.y);
    }
});
