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
        else if (event.keyCode == Event.KEY_UP) // up arrow
        {
            pong.rightPaddle.isGoingUp   = true;
            pong.rightPaddle.isGoingDown = false;
        }
        else if (event.keyCode == Event.KEY_DOWN) // down arrow
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
        else if (event.keyCode == Event.KEY_UP) // up arrow
        {
            pong.rightPaddle.isGoingUp = false;
        }
        else if (event.keyCode == Event.KEY_DOWN) // down arrow
        {
            pong.rightPaddle.isGoingDown = false;
        }
        else if (event.keyCode == 80) // p pause
        {
            pong.togglePause();
        }
        else if (event.keyCode == 83) // s stop
        {
            pong.stop();
        }
        else if (event.keyCode == 32) // Space bar start
        {
            pong.start();
        }
    }
});
