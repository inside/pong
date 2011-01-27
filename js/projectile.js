var Projectile = Class.create(Equipement,
{
    speed         : 11,
    vX            : null,
    vY            : null,

    initialize: function($super, p)
    {
        $super(p);
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

        if (this.hitsLeftWall())
        {
            this.vX *= -1;
            this.x = 0;
        }
        else if (this.hitsRightWall())
        {
            this.vX *= -1;
            this.x = this.container.width - this.width;
        }

        if (this.hitsCeiling())
        {
            this.vY *= -1;
            this.y = 0;
            this.setVelocity(this.getUnitVector(this.vX, this.vY));
        }
        else if (this.hitsFloor())
        {
            this.vY *= -1;
            this.y = this.container.height - this.height;
            this.setVelocity(this.getUnitVector(this.vX, this.vY));
        }

    },
    hitsLeftWall: function()
    {
        return this.x <= 0;
    },
    hitsRightWall: function()
    {
        return this.x >= this.container.width - this.width;
    },
    hitsFloor: function()
    {
        return this.y >= this.container.height - this.height;
    },
    hitsCeiling: function()
    {
        return this.y <= 0;
    },
    setVelocity: function(vector)
    {
        this.vX = vector.e(1);
        this.vY = vector.e(2);
    }
});
