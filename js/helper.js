var Helper =
{
    getRandomFromRange: function(min, max)
    {
        return min + Math.round(Math.random() * (max - min));
    },
    getWeightedRandomValue: function(weightedValues)
    {
        var weightSum = 0;
        var limit = 0;
        var random;

        for (i = 0; i < weightedValues.length; i++)
        {
            weightSum += weightedValues[i][1];
        }
        
        random = this.getRandomFromRange(0, weightSum);

        for (i = 0; i < weightedValues.length; i++)
        {
            limit += weightedValues[i][1];

            if (limit >= random)
            {
                break;
            }
        }

        return weightedValues[i][0];
    }
};
