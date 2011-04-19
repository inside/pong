var PaddlePower = Class.create(Projectile,
{
    width  : POWER_PROJECTILE_INITIAL_WIDTH,
    height : POWER_PROJECTILE_INITIAL_HEIGHT,
    speed  : POWER_PROJECTILE_INITIAL_SPEED,

    initialize: function($super, p)
    {
        $super(p);
    }
});
