var Player = Class.create({
    name: null,
    score: 0,

    initialize: function(p)
    {
        this.name = p.name;
    },
    updateScore: function()
    {
        this.score++;
        this.drawScore();
    },
    drawScore: function()
    {
        console.log(this.name);
        $(this.name).innerHTML = this.score;
    }
});
