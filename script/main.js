var $dropZone = $("#drop-zone");
// перетащить в событие
$dropZone[0].addEventListener('dragenter', function() {
    $dropZone.addClass("drop");
    $dropZone.html("Отпустите и завершите загрузку");
}, false);
// растягиваем событие
$dropZone[0].addEventListener('dragleave', function() {
    $dropZone.removeClass("drop");
    $dropZone.html("Перетащите сюда файлы");
}, false);
// Свободное событие мыши
$dropZone[0].addEventListener("drop", function(e) {
    // Отмена эффекта перетаскивания в браузере по умолчанию
    e.preventDefault();
    var fileList = e.dataTransfer.files;
    //$("#up_text").val(fileList[0].name);
    //alert(fileList[0].type);
    upload(fileList[0]);
}, false);


function upload(file) {
    if (!checkType(file)) return;
    var _this = this;
    var fd = new FormData();
    fd.append('file', file);
    var lay;
    $.ajax({
        type: "POST",
        dataType: "json", // Тип данных, возвращаемых сервером
        contentType: false, // запрещаем установку типа запроса
        processData: false, // Запрещаем jquery обрабатывать данные DAta, они будут обработаны по умолчанию
        async: false,
        cache: false,
        url: "/cdps/admin/students/import",
        data: fd,
        beforeSend: function() {
            lay = layer.load(2, {
                shade: [0.5, '#666c7f']
            });
        },
        complete: function(xhr, status) {
            layer.close(lay);

            recoverState();
        },
        success: function(result) {

        },
        error: function() {

        }
    });
}

// проверяем формат
function checkType(file) {
    var _fileDir = file.name;
    var _suffix = _fileDir.substr(_fileDir.lastIndexOf("."));
    if ("" == _fileDir) {
        layer.msg('Файл не выбран! ', function() {
            // Операция после закрытия
            recoverState();
        });
        return false;
    }
    if (".xls" != _suffix && ".xlsx" != _suffix) {
        layer.msg('Неправильный формат файла! Пожалуйста, выберите файл Excel! ', function() {
            // Операция после закрытия
            recoverState();
        });
        return false;
    }
    return true;
}

function recoverState() {
    $dropZone.removeClass("drop");
    $dropZone.html("Перетащите сюда файлы");
}

$(document).on('dragenter', function(e) {
    e.stopPropagation();
    e.preventDefault();
});
$(document).on('dragover', function(e) {
    e.stopPropagation();
    e.preventDefault();
});
$(document).on('drop', function(e) {
    e.stopPropagation();
    e.preventDefault();
});