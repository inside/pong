var Projectile = Class.create(Equipement,
{
    speed         : 6,
    vX            : null,
    vY            : null,
    direction     : 'random', // random, left, right
    creationTime  : 0,        // milliseconds timestamp
    lifeTime      : 0,        // milliseconds
    diesIn        : 0,        // milliseconds timestamp
    diesNow       : false,

    initialize: function($super, p)
    {
        $super(p);
        this.domElement.addClassName('projectile');
        this.resetPosition();
        var date = new Date();
        this.creationTime = date.getTime();
        this.diesIn = this.creationTime + this.lifeTime;
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
    hitsLeftPaddle: function()
    {
        return Collision.overlap(this, this.container.leftPaddle);
    },
    hitsRightPaddle: function()
    {
        return Collision.overlap(this, this.container.rightPaddle);
    },
    setVelocity: function(vector)
    {
        this.vX = vector.e(1);
        this.vY = vector.e(2);
    },
    getInitialUnitVector: function()
    {
        var y = Math.round(Math.random() * 10) /  10; // random between 0 and 1

        if (Math.round(Math.random())) // 50% of the time, go downwards
        {
            y *= -1;
        }
        if (this.direction === 'random')
        {
            var x = 1;

            if (Math.round(Math.random()))
            {
                x *= -1;
            }

            return Vector.create([x, y]).toUnitVector();
        }
        else if (this.direction === 'left')
        {
            return Vector.create([-1, y]).toUnitVector();
        }
        else if (this.direction === 'right')
        {
            return Vector.create([1, y]).toUnitVector();
        }
    },
    getUnitVector: function(vX, vY)
    {
        return Vector.create([vX, vY]).toUnitVector();
    },
    remove: function()
    {
        this.domElement.remove();
    },
    isLiving: function(currentTime)
    {
        if (this.diesNow)
        {
            return false;
        }
        else if (this.lifeTime <= 0)
        {
            return true;
        }

        return this.diesIn >= currentTime;
    }
});
