var Equipement = Class.create(
{
    id         : null,
    x          : null,
    y          : null,
    width      : null,
    height     : null,
    container  : null,
    speed      : null,
    domElement : null,
    direction  : 'random', // random, left, right
    creationTime   : 0, // milliseconds timestamp
    lifeTime   : 0, // milliseconds
    diesIn   : 0, // milliseconds timestamp

    initialize: function(p)
    {
        Object.extend(this, p);
        var el = document.createElement('div');
        el.setAttribute('id', this.id);
        el.setAttribute('style', 'width: ' + this.width + 'px; height: ' + this.height + 'px;');
        this.container.area.appendChild(el);
        this.domElement = $(this.id);
        this.setPosition(this.x, this.y);
        var date = new Date();
        this.creationTime = date.getTime();
        this.diesIn = this.creationTime + this.lifeTime;
    },
    setPosition: function(x, y)
    {
       this.domElement.style.left = x + 'px';
       this.domElement.style.top  = y + 'px';
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
    isLiving: function(currentTime)
    {
        if (this.lifeTime <= 0)
        {
            return true;
        }

        return this.diesIn >= currentTime;
    }
});
