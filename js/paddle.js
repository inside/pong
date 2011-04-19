var Paddle = Class.create(Equipement,
{
    width       : PADDLE_INITIAL_WIDTH,
    height      : PADDLE_INITIAL_HEIGHT,
    speed       : PADDLE_INITIAL_SPEED,
    isGoingUp   : false,
    isGoingDown : false,
    side        : null, // left or right

    initialize: function($super, p)
    {
        $super(p);
    },
    resetPosition: function()
    {
        this.y = PONG_HEIGHT / 2 - this.height / 2;

        if (this.side === 'right')
        {
            this.x = PONG_WIDTH - this.width;
        }
        else if (this.side === 'left')
        {
            this.x = 0;
        }

        this.setPosition(this.x, this.y);
    },
    resetSpeed: function()
    {
        this.speed = PADDLE_INITIAL_SPEED;
    },
    resetHeight: function()
    {
        this.height = PADDLE_INITIAL_HEIGHT;
        this.setHeight(this.height);
    },
    setHeight: function(height)
    {
        this.domElement.setStyle({height: height + 'px'});
    },
    moveUp: function()
    {
        var y = this.y - this.speed * this.container.time;

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
        var y = this.y + this.speed * this.container.time;

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
