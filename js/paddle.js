var Paddle = Class.create(Equipement,
{
    isGoingUp   : false,
    isGoingDown : false,
    position    : null,

    initialize: function($super, p)
    {
        $super(p);
        this.position = p.position;
        this.speed = PADDLE_INITIAL_SPEED;
        this.resetPosition();
    },
    resetPosition: function()
    {
        this.y = PONG_HEIGHT / 2 - this.height / 2;

        if (this.position === 'right')
        {
            this.x = PONG_WIDTH - this.width;
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

        if (y >= PONG_HEIGHT - this.height)
        {
            this.y = PONG_HEIGHT - this.height;
        }
        else
        {
            this.y = y;
        }

        this.setPosition(this.x, this.y);
    }
});
