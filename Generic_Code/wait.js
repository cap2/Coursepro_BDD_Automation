module.exports =
    {wait: function (ms)
        {
            let start = new Date().getTime();
            let end = start;
            while (end < start + ms) {
                end = new Date().getTime();
            }
        }
    };