/**
 * Created by ilya_zaitsev on 02.07.15.
 */
$(document).ready(function () {
    $('#lead-search').on('click', function (event) {

        $('.ajax-modal').show();
        $('.ajax-modal').load('lead-search.html #lead-search-container');
        event.preventDefault();
        return false;
    });

    $('#manual_dial').on('click', function (event) {

        $('.ajax-modal').show();
        $('.ajax-modal').load('manual-dial.html #manual-dial-container');
        event.preventDefault();
        return false;
    });

    $('.ajax-modal').on('click', '#lead-search-close', function (event) {
        event.preventDefault();
        $('.ajax-modal').hide();
        return false;
    });

});

