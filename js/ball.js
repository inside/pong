var Ball = Class.create(Equipement,
{
    speed   : 9,
    V       : $V([1, 0]),
    vX      : null,
    vY      : null,

    initialize: function($super, p)
    {
        $super(p);
        this.resetPosition();
    },
    resetPosition: function()
    {
        this.x = (this.container.width / 2) - (this.width / 2);
        this.y = (this.container.height / 2) - (this.height / 2);
        this.V = $V([1, 0]);
        this.vX = this.V.e(1);
        this.vY = this.V.e(2);
        this.setPosition(this.x, this.y);
    },
    move: function()
    {
        this.x += this.vX * this.speed;
        this.y += this.vY * this.speed;

        this.handlePaddleRebound();
        this.handleLeftAndRightWalls();
        this.handleFloorAndCeilingRebound();
        
        this.V = $V([this.vX, this.vY]).toUnitVector();
        this.vX = this.V.e(1);
        this.vY = this.V.e(2);
        this.setPosition(this.x, this.y);
    },
    handleLeftAndRightWalls: function()
    {
        if (this.x <= 0)
        {
            this.x = 0;
            this.container.pauseAndStopAfterAdelay();
            this.container.rightPlayer.updateScore();
        }
        else if (this.x >= this.container.width - this.container.rp.width)
        {
            this.x = (this.container.width - this.container.rp.width) - this.width / 2;
            this.container.pauseAndStopAfterAdelay();
            this.container.leftPlayer.updateScore();
        }
    },
    handleFloorAndCeilingRebound: function()
    {
        if (this.y <= 0)
        {
            this.vY *= -1;
            this.y = 0;
        }
        else if (this.y >= this.container.height - this.height)
        {
            this.vY *= -1;
            this.y = this.container.height - this.height;
        }
    },
    handlePaddleRebound: function()
    {
        if (this.overlap(this.container.lp))
        {
            this.x = this.container.lp.x + this.container.lp.width;
            this.reboundsOnPaddle(this.container.lp);
        }
        else if (this.overlap(this.container.rp))
        {
            this.x = this.container.rp.x - this.width;
            this.reboundsOnPaddle(this.container.rp);
        }
    },
    reboundsOnPaddle: function(paddle)
    {
        this.vX *= -1;
        this.vY = ((this.y + this.height / 2) - (paddle.y + paddle.height / 2)) / (paddle.height / 2);
    }
});
