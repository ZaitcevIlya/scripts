/* script groups panel animation*/

function scriptGroupsAnimation() {
    var sidepanelSG = $('.sidepanel-script-groups');

    if(sidepanelSG.hasClass('slideInRight')){
        $(this).html('<i class="fa fa-arrow-left"></i> Open Script Groups');
        sidepanelSG.removeClass('animated slideInRight');
        sidepanelSG.addClass('animated slideInLeft');
    } else {
        $(this).html('<i class="fa fa-arrow-right"></i> Close Script Groups');
        sidepanelSG.removeClass('animated slideInLeft');
        sidepanelSG.addClass('animated slideInRight');
    }
};

/* error indicator for different fields */
function errorIndicator(inputField) {
    var errorMes = $('.error-message');

    inputField.siblings(errorMes).removeClass('hidden');
    inputField.addClass('error-indicator');
    setTimeout(function () {
        inputField.siblings(errorMes).addClass('hidden');
        inputField.removeClass('error-indicator');
    }, 3000);
}

function saveInputValue(e) {
    var newValue = $(this).val();

    if($(this).closest('td').hasClass('description-field-column')) {
        $.ajax('ajax.php', {
            type: 'POST',
            data: {newDescriptionValue: newValue},
            success: function (msg) {
                console.log("New desc: " + msg);
            }
        });
    } else if($(this).closest('td').hasClass('voice-talent-column')) {
        $.ajax('ajax.php', {
            type: 'POST',
            data: {newCampValue: newValue},
            success: function (msg) {
                console.log('New camp: ' + msg);
            }
        });
    }

}

function createNewScript(e) {
    e.preventDefault();
    var scriptName = $('.js_new_script_name');
    var scriptNameVal = scriptName.val();
    var scriptDescription = $('.js_new_script_description').val();
    var form = $(this).closest('form');

    if(scriptNameVal != null && scriptNameVal != "") {
        $.ajax(form.attr('action'), {
            type: form.attr('method'),
            data: form.serialize(),
            success: function(msg) {
                console.log(msg);
            }
        });
    } else {
        errorIndicator(scriptName);
    }
};

function deleteRow() {
    var scriptRow = $(this).closest('tr');
    var scriptName = scriptRow.find('td').first().text();
    var scriptId = scriptRow.data('script-id');
    console.log(scriptId);

    if(confirm('Are you sure you want to delete script?')) {
        $.ajax('ajax.php', {
            type: 'POST',
            data: {action: 'delete_script', scriptName: scriptName, scriptId: scriptId},
            success: function (msg) {
                scriptRow.remove();
            }
        });
    } else {
        return false;
    }
};

$(document).ready(function () {
    $('.js_create_new_script').on('click', createNewScript);
    $('.input-without-style').on('change', this, saveInputValue);
    $('.js_add_rebuttals_btn_row').on('click', addRebuttalsBtnRow);

        /* delete row of any tables */
    $('.table').on('click', '.js_delete_row', deleteRow);

});