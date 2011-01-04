var Collision =
{
    hoverlap: function(rectangle1, rectangle2)
    {
        return (rectangle1.x < rectangle2.x + rectangle2.width) && (rectangle2.x < rectangle1.x + rectangle1.width);
    },
    voverlap: function(rectangle1, rectangle2)
    {
        return (rectangle1.y < rectangle2.y + rectangle2.height) && (rectangle2.y < rectangle1.y + rectangle1.height)
    },
    overlap: function(rectangle1, rectangle2)
    {
        return Collision.hoverlap(rectangle1, rectangle2) && Collision.voverlap(rectangle1, rectangle2);
    }
};
