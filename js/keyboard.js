var Keyboard = Class.create(
{
    keyDownHandler: function(pong, event)
    {
        if (event.keyCode == 73) // i
        {
            pong.leftPaddle.isGoingUp   = true;
            pong.leftPaddle.isGoingDown = false;
        }
        else if (event.keyCode == 75) // k
        {
            pong.leftPaddle.isGoingUp   = false;
            pong.leftPaddle.isGoingDown = true;
        }
        else if (event.keyCode == Event.KEY_UP)
        {
            pong.rightPaddle.isGoingUp   = true;
            pong.rightPaddle.isGoingDown = false;
        }
        else if (event.keyCode == Event.KEY_DOWN)
        {
            pong.rightPaddle.isGoingUp   = false;
            pong.rightPaddle.isGoingDown = true;
        }
    },
    keyUpHandler: function(pong, event)
    {
        if (event.keyCode == 73) // i
        {
            pong.leftPaddle.isGoingUp = false;
        }
        else if (event.keyCode == 75) // k
        {
            pong.leftPaddle.isGoingDown = false;
        }
        else if (event.keyCode == Event.KEY_UP)
        {
            pong.rightPaddle.isGoingUp = false;
        }
        else if (event.keyCode == Event.KEY_DOWN)
        {
            pong.rightPaddle.isGoingDown = false;
        }
        else if (event.keyCode == 80) // P pause
        {
            pong.togglePause();
        }
        else if (event.keyCode == 83) // S stop
        {
            pong.stop();
        }
        else if (event.keyCode == 32) // Space bar start
        {
            pong.start();
        }
    }
});
