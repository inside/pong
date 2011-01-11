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
    resetScore: function()
    {
        this.score = 0;
        this.drawScore();
    },
    drawScore: function()
    {
        $(this.name).innerHTML = this.score;
    },
    hasReachedScore: function(score)
    {
        return this.score >= score;
    }
});
