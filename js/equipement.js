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

    initialize: function(p)
    {
        this.id        = p.id;
        this.width     = p.width;
        this.height    = p.height;
        this.x         = p.x;
        this.y         = p.y;
        this.container = p.container;

        var el = document.createElement('div');
        el.setAttribute('id', this.id);
        el.setAttribute('style', 'width: ' + this.width + 'px; height: ' + this.height + 'px;');
        this.container.area.appendChild(el);
        this.domElement = $(this.id);
        this.setPosition(this.x, this.y);
    },
    setPosition: function(x, y)
    {
       this.domElement.style.left = x + 'px';
       this.domElement.style.top  = y + 'px';
    },
    hoverlap: function(rectangle)
    {
        return (this.x < rectangle.x + rectangle.width) && (rectangle.x < this.x + this.width);
    },
    voverlap: function(rectangle)
    {
        return (this.y < rectangle.y + rectangle.height) && (rectangle.y < this.y + this.height)
    },
    overlap: function(rectangle)
    {
        return this.hoverlap(rectangle) && this.voverlap(rectangle);
    },
    getVector: function()
    {
        var y = Math.round(Math.random() * 10) /  10; // random between 0 and 1

        if (Math.round(Math.random()))
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

            return $V([x, y]);
        }
        else if (this.direction === 'left')
        {
            return $V([-1, y]);
        }
        else if (this.direction === 'right')
        {
            return $V([1, y]);
        }
    }
});
