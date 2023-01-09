async function AjaxFormSubmit(form, callback) {
    //data-Yonlenecek attr si gidiceği url verilmeli
    //data-Refresh attr True yada false verilmeli eğer sayfa kendi içinde refres edilicekse
    //data-IsRespons attr True yada false olmalı sayfa yönlenicek ise true ynlenmeyecek ise false olmalı


    form.find("button[type=\"submit\"]").attr("disabled", true);
    var id = form.attr("id")
    var Url = form.attr("data-Yonlenecek")
    var Refresh = form.attr("data-Refresh")
    var IsRespons = form.attr("data-IsRespons")
    var Datas = $("#" + id + " :input")
    var formData = new FormData();
    for (var i = 0; i < Datas.length; i++) {
        
        switch (Datas[i].type) {
            case "file":
                for (var j = 0; j < Datas[i].files.length; j++) {
                    formData.append(Datas[i].name, Datas[i].files[j]);
                }
                break;
            case "checkbox":
                formData.append(Datas[i].name, Datas[i].checked);
                break;
            case "select-multiple":
                var datas = $("[name='" + Datas[i].name + "']").select2("data");
                var arrystr = "";
                for (var j = 0; j < datas.length; j++) {
                    arrystr += datas[j].id + ",";
                };
                if (arrystr.length > 0)
                    arrystr = arrystr.substring(0, arrystr.length - 1)
                formData.append(Datas[i].name, arrystr);
                break;

            default:
                formData.append(Datas[i].name, Datas[i].value);
                break;
        }


    }
    $.ajax({
        type: form[0].method,
        url: form[0].action,
        data: formData,
        processData: false,
        contentType: false
    }).done(async function (response) {
        await mesajGoster("Success", true, false);
        if (IsRespons == "True") {
            if (Refresh == "True") {
                window.location.reload();
            }
            else {
                await yonlendir(Url + "/" + response);
            }
            return false;
        }
        else {
            if (callback) {
                callback();
            }
            else {
                return response;
            }
            form.find("button[type=\"submit\"]").attr("disabled", false);

        }
        console.log(response);
        return false;

    }).fail(function (data) {
        console.log(data);
        alert("Console Log");
    });
}

async function GetFormData(FormId) { 
    var id = FormId 
    var Datas = $("#" + id + " :input")
    var formData = new FormData();
    for (var i = 0; i < Datas.length; i++) {

        switch (Datas[i].type) {
            case "file":
                for (var j = 0; j < Datas[i].files.length; j++) {
                    formData.append(Datas[i].name, Datas[i].files[j]);
                }
                break;
            case "checkbox":
                formData.append(Datas[i].name, Datas[i].checked);
                break;
            case "select-multiple":
                var datas = $("[name='" + Datas[i].name + "']").select2("data");
                var arrystr = "";
                for (var j = 0; j < datas.length; j++) {
                    arrystr += datas[j].id + ",";
                };
                if (arrystr.length > 0)
                    arrystr = arrystr.substring(0, arrystr.length - 1)
                formData.append(Datas[i].name, arrystr);
                break;

            default:
                formData.append(Datas[i].name, Datas[i].value);
                break;
        }


    }
    return formData;
}
