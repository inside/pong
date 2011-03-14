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
        Object.extend(this, p);
        var el =  new Element('div', {id: this.id});
        el.setStyle({width: this.width + 'px', height: this.height + 'px'});
        this.container.area.appendChild(el);
        this.domElement = $(this.id);
        this.resetPosition();
    },
    setPosition: function(x, y)
    {
       this.domElement.style.left = x + 'px';
       this.domElement.style.top  = y + 'px';
    },
    getAdjustedSpeed: function()
    {
        return this.timeout > 0 ?
                (this.speed * this.timeout) / this.frameRate :
                this.speed;
    }
});
