/**
 * Created by ilya on 01.10.16.
 */

/* script groups panel animation*/
$('.sidepanel-script-groups-btn').on('click', function () {
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
});

/* error indicator */
function errorIndicator(inputField) {
    var errorMes = $('.error-message');

    inputField.siblings(errorMes).removeClass('hidden');
    inputField.addClass('error-indicator');
    setTimeout(function () {
        inputField.siblings(errorMes).addClass('hidden');
        inputField.removeClass('error-indicator');
    }, 3000);
}

/* create new script */

function createNewScipt(campID) {
    var scriptName = $('.js_new_script_name');
    var scriptNameVal = scriptName.val();
    var scriptDescription = $('.js_new_script_description').val();
    var scriptsContainer = $('.scripts_container');


    var scriptTemplate = '<tr>' +
        '<td><b>'+ scriptNameVal +'</b></td>' +
        '<td class="description-field">'+
            '<span class="description-text">'+ scriptDescription +'</span>'+
            '<a href="#" class="js_edit_field" data-toggle="tooltip" data-placement="top" title="Edit field"><i class="fa fa-edit"></i></a>'+
        '</td>'+
        '<td class="voice-talent-field">'+
            '<span class="description-text">Add voice talent ID <i class="fa fa-arrow-up"></i></span>'+
            '<a href="#" class="js_edit_field" data-toggle="tooltip" data-placement="top" title="Edit field"><i class="fa fa-edit"></i></a>'+
        '</td>'+
        '<td> -- </td>'+
        '<td>0</td>'+
        '<td class="innactive">innactive</td>'+
        '<td class="text-center"><a href="#"><i class="fa fa-folder-open-o fa-lg"></i></a></td>'+
        '<td class="text-center"><a href="#" class="js_delete_row"><i class="fa fa-trash color10 fa-lg"></i></a></td>'+
        '</tr>>';

    if(scriptNameVal != null && scriptNameVal != "") {
        scriptsContainer.prepend(scriptTemplate);
    } else {
        errorIndicator(scriptName);
    }
};

$('.js_create_new_script').on('click', createNewScipt);

/* manage voice files menu */

$('.create_new_directory').on('click', function () {
    var newDirectoryNameInput = $('.new_directory_name_input');
    var newDirectoryNameInputValue = newDirectoryNameInput.val();
    var directoriesContainer = $('.voice_files_directories_container');

    var newNode = '<tr>' +
        '<td><a href="#">'+ newDirectoryNameInputValue +'</a></td>' +
        '<td class="text-center">0</td>' +
        '<td class="text-center"><a href="#"><i class="fa fa-trash color10 fa-lg js_delete_row"></i></a></td>' +
        '</tr>';

    if(newDirectoryNameInputValue != null && newDirectoryNameInputValue != '' ) {
        directoriesContainer.append(newNode);
    } else {
        errorIndicator(newDirectoryNameInput);
    }
});

/* delete row of any tables */

function deleteReason(e) {
    e.target.closest('tr').remove();
}

$('.table').on('click', '.js_delete_row', deleteReason);

/* create new script group */

function createNewScriptGroup(serialNumber) {
    var newRow = '<tr>' +
                    '<td># <b>' + serialNumber + '</b></td>' +
                    '<td></td>' +
                    '<td class="text-center"><a href="#">Synch</a></td>' +
                    '<td>' +
                        '<select name="" class=" btn-square select-add-script margin-r-5"><option value="">select</option></select>' +
                        '<button class="btn btn-success">Add</button>' +
                    '</td>' +
                    '<td>' +
                        '<select name="" class=" btn-square select-remove-script margin-r-5"><option value="">select</option></select>' +
                        '<button class="btn btn-danger">Remove</button>' +
                    '</td>' +
                    '<td class="text-center"><button class="btn btn-success">Activate</button></td>' +
                    '<td class="text-center"><a href="#" class="js_delete_row"><i class="fa fa-trash color10 fa-lg"></i></a></td>' +
                '</tr>';
    var parentNode = $('.js_script_group_container');
    parentNode.append(newRow);
}

$('.js_create_new_script_group').on('click', function () {
    var name,
        description;

    createNewScriptGroup(name | 1);
});

/* Edit field text */

function openFieldsEditor(e) {
    var thisTarget = $(e.target);
    var modifiedField = thisTarget.closest('td').find('.description-text');
    var oldText = thisTarget.closest('td').find('.description-text').text();

    $('.js_modal_edit_fields').modal('show');
    $('.js_old_text').text(oldText);

    $('.js_save_modified_field').on('click', function () {
        saveModifiedText(modifiedField);
    });

}

function saveModifiedText(modifiedField) {
    var newValue = $('.js_new_text').val();
    console.log(newValue, modifiedField);
    $(modifiedField).text(newValue);
    $('.js_modal_edit_fields').modal('hide');
    $('.js_edit_field').unbind().on('click', openFieldsEditor);
}

$('.main-content').on('click', '.js_edit_field', openFieldsEditor);