var Paddle = Class.create(Equipement,
{
    speed       : 10,
    isGoingUp   : false,
    isGoingDown : false,
    position    : null,

    initialize: function($super, p)
    {
        this.position = p.position;
        $super(p);
        this.resetPosition();
    },
    resetPosition: function()
    {
        this.y = this.container.height / 2 - this.height / 2;

        if (this.position === 'right')
        {
            this.x = this.container.width - this.width;
        }
        else if (this.position === 'left')
        {
            this.x = 0;
        }

        this.setPosition(this.x, this.y);
    },
    moveUp: function()
    {
        var y = this.y - this.speed;

        if (y <= 0)
        {
            this.y = 0
        }
        else
        {
            this.y = y;
        }

        this.setPosition(this.x, this.y);
    },
    moveDown: function()
    {
        var y = this.y + this.speed;

        if (y >= this.container.height - this.height)
        {
            this.y = this.container.height - this.height;
        }
        else
        {
            this.y = y;
        }

        this.setPosition(this.x, this.y);
    },
    isMoving: function()
    {
        return this.isGoingUp || this.isGoingDown;
    }
});
