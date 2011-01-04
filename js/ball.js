var Ball = Class.create(Equipement,
{
    speed : 11,
    vX    : null,
    vY    : null,

    initialize: function($super, p)
    {
        $super(p);
        this.domElement.setAttribute('class', 'ball');
        this.resetPosition();
    },
    resetPosition: function()
    {
        this.x = (this.container.width / 2) - (this.width / 2);
        this.y = (this.container.height / 2) - (this.height / 2);
        this.setVelocity(this.getInitialUnitVector());
        this.setPosition(this.x, this.y);
    },
    move: function()
    {
        this.x += this.vX * this.speed;
        this.y += this.vY * this.speed;

        this.handlePaddleRebound();
        this.handleLeftAndRightWalls();
        this.handleFloorAndCeilingRebound();
        
        this.setPosition(this.x, this.y);
    },
    setVelocity: function(vector)
    {
        this.vX = vector.e(1);
        this.vY = vector.e(2);
    },
    handleLeftAndRightWalls: function()
    {
        if (this.x <= 0)
        {
            this.x = 0;
            this.direction = 'right';
            this.container.replay();
            this.container.rightPlayer.updateScore();
        }
        else if (this.x >= this.container.width - this.container.rightPaddle.width)
        {
            this.x = (this.container.width - this.container.rightPaddle.width) - this.width / 2;
            this.direction = 'left';
            this.container.replay();
            this.container.leftPlayer.updateScore();
        }
    },
    handleFloorAndCeilingRebound: function()
    {
        if (this.y <= 0)
        {
            this.vY *= -1;
            this.y = 0;
            this.setVelocity(this.getUnitVector(this.vX, this.vY));
        }
        else if (this.y >= this.container.height - this.height)
        {
            this.vY *= -1;
            this.y = this.container.height - this.height;
            this.setVelocity(this.getUnitVector(this.vX, this.vY));
        }
    },
    handlePaddleRebound: function()
    {
        if (Collision.overlap(this, this.container.leftPaddle))
        {
            this.x = this.container.leftPaddle.x + this.container.leftPaddle.width;
            this.reboundsOnPaddle(this.container.leftPaddle);
            this.setVelocity(this.getUnitVector(this.vX, this.vY));
        }
        else if (Collision.overlap(this, this.container.rightPaddle))
        {
            this.x = this.container.rightPaddle.x - this.width;
            this.reboundsOnPaddle(this.container.rightPaddle);
            this.setVelocity(this.getUnitVector(this.vX, this.vY));
        }
    },
    reboundsOnPaddle: function(paddle)
    {
        this.vX *= -1;
        this.vY = ((this.y + this.height / 2) - (paddle.y + paddle.height / 2)) / (paddle.height / 2);
    }
});
