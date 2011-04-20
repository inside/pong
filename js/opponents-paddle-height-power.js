var OpponentsPaddleHeightPower = Class.create(PaddlePower,
{
    paddleHeight  : null,
    paddleHeights : [PADDLE_MIN_HEIGHT, PADDLE_MAX_HEIGHT],

    initialize: function($super, p)
    {
        $super(p);

        this.paddleHeight = this.paddleHeights[Math.round(Math.random())];

        if (this.paddleHeight > PADDLE_INITIAL_HEIGHT)
        {
            this.domElement.insert({bottom: '<span>height + 1 on opponent</span>'});
            this.domElement.addClassName('paddle-height-power opponent bonus');
        }
        else
        {
            this.domElement.insert({bottom: '<span>height - 1 on opponent</span>'});
            this.domElement.addClassName('paddle-height-power opponent malus');
        }
    },
    move: function($super)
    {
        $super();

        if (this.hitsLeftPaddle())
        {
            this.container.rightPaddle.height = this.paddleHeight;
            this.container.rightPaddle.setHeight(this.paddleHeight);
            this.diesNow = true;
            PowerTimer.rightPaddlePowers.set('paddle-height-power',
                [Helper.getTime(), this.container.rightPaddle.resetHeight.bind(this.container.rightPaddle)]);
        }
        else if (this.hitsRightPaddle())
        {
            this.container.leftPaddle.height = this.paddleHeight;
            this.container.leftPaddle.setHeight(this.paddleHeight);
            this.diesNow = true;
            PowerTimer.leftPaddlePowers.set('paddle-height-power',
                [Helper.getTime(), this.container.leftPaddle.resetHeight.bind(this.container.leftPaddle)]);
        }

        this.setPosition(this.x, this.y);
    }
});
