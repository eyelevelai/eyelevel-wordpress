(function($) {
    $(document).ready(function(){
        var annual = [];
        var monthly = [];
        $('.price-sub-pricing').map(function(idx, ei) {
            if (!$(ei).hasClass('e-pricing')) {
                var dl = $(ei).find('.price-dollars');
                var cn = $(ei).find('.price-cents');
                var mnStr = dl[0].innerHTML + '.' + cn[0].innerHTML;
                annual.push(parseFloat(mnStr));
                var mnNew = Math.floor(parseFloat(mnStr) * 1.2) + 0.99;
                monthly.push(mnNew);
            }
        });
        $('.price-toggle-switch').on('click', clickHandler);
        function clickHandler(event) {
            if (event.target.nodeName && event.target.nodeName === 'INPUT') {
                $('#price-annual').toggleClass('price-toggle-active');
                $('#price-monthly').toggleClass('price-toggle-active');
                var priceType = $('#price-monthly').hasClass('price-toggle-active') ? 'monthly' : 'annual';
                var idx = 0;
                $('.price-sub-pricing').map(function(idx, ei) {
                    if (!$(ei).hasClass('e-pricing')) {
                        var dl = $(ei).find('.price-dollars');
                        var cn = $(ei).find('.price-cents');
                        var price = annual[idx];
                        if (priceType === 'monthly') {
                            price = monthly[idx];
                        }
                        var priceStr = price.toString();
                        priceStr = priceStr.split('.');
                        $(dl[0]).html(priceStr[0]);
                        $(cn[0]).html(priceStr[1]);
                        idx++;
                    }
                });
            }
        }
    });
})(jQuery);