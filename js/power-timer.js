var PowerTimer =
{
    leftPaddlePowers: $H(),
    rightPaddlePowers: $H(),
    handlePowerTimer: function(context)
    {
        if (PowerTimer.leftPaddlePowers.size() > 0)
        {
            PowerTimer.leftPaddlePowers.each(function(pair)
            {
                if (pair.value[0] + POWER_LIFETIME <= context.startTime)
                {
                    pair.value[1]();
                    PowerTimer.leftPaddlePowers.unset(pair.key);
                }
            }, context);
        }
        if (PowerTimer.rightPaddlePowers.size() > 0)
        {
            PowerTimer.rightPaddlePowers.each(function(pair)
            {
                if (pair.value[0] + POWER_LIFETIME <= context.startTime)
                {
                    pair.value[1]();
                    PowerTimer.rightPaddlePowers.unset(pair.key);
                }
            }, context);
        }
    }
};
