var PaddleSpeedPower = Class.create(Projectile,
{
    initialize: function($super, p)
    {
        $super(p);
        this.domElement.addClassName('paddle-speed-power');
    },
    move: function($super)
    {
        $super();

//        this.handlePaddleRebound();
        this.setPosition(this.x, this.y);
    }
});
