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
        this.container.gameArea.appendChild(el);
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
    }
});
