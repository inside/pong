var Ball = Class.create(Projectile,
{
    width  : BALL_INITIAL_WIDTH,
    height : BALL_INITIAL_HEIGHT,
    speed  : BALL_INITIAL_SPEED,

    initialize: function($super, p)
    {
        $super(p);
        this.domElement.addClassName('ball');
    },
    move: function($super)
    {
        $super();

        this.handlePaddleRebound();
        this.setPosition(this.x, this.y);
    },
    handlePaddleRebound: function()
    {
        if (this.hitsLeftPaddle())
        {
            this.x = this.container.leftPaddle.x + this.container.leftPaddle.width;
            this.reboundsOnPaddle(this.container.leftPaddle);
            this.setVelocity(this.getUnitVector(this.vX, this.vY));
            this.container.leftPlayer.updateScore();
        }
        else if (this.hitsRightPaddle())
        {
            this.x = this.container.rightPaddle.x - this.width;
            this.reboundsOnPaddle(this.container.rightPaddle);
            this.setVelocity(this.getUnitVector(this.vX, this.vY));
            this.container.rightPlayer.updateScore();
        }
    },
    reboundsOnPaddle: function(paddle)
    {
        this.vX *= -1;
        this.vY = ((this.y + this.height / 2) - (paddle.y + paddle.height / 2)) / (paddle.height / 2);
    }
});
