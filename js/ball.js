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
        var x = this.x + (this.vX * this.speed);
        var y = this.y + (this.vY * this.speed);

        this.handleLeftAndRightWallsRebound(x);
        this.handlePaddleRebound();
        this.handleFloorAndCeilingRebound(y);
        
        this.V = $V([this.vX, this.vY]).toUnitVector();
        this.vX = this.V.e(1);
        this.vY = this.V.e(2);
        this.setPosition(this.x, this.y);
    },
    handleLeftAndRightWallsRebound: function(x)
    {
        if (x <= 0)
        {
            this.x = 0;
            this.container.pause();
            console.log('Left player you loose.');
        }
        else if (x >= this.container.width - this.width)
        {
            this.x = this.container.width - this.width;
            this.container.pause();
            console.log('Right player you loose.');
        }
        else
        {
            this.x = x;
        }
    },
    handleFloorAndCeilingRebound: function(y)
    {
        if (y <= 0)
        {
            this.vY *= -1;
            this.y = 0;
        }
        else if (y >= this.container.height - this.height)
        {
            this.vY *= -1;
            this.y = this.container.height - this.height;
        }
        else
        {
            this.y = y;
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
        this.vY *= 1.3;

        if (this.vY > 1)
        {
            this.vX += this.vY - 1;
            this.vY = 1;
        }
    }
});
