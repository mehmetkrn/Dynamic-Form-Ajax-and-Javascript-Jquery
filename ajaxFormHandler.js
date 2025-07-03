async function AjaxFormSubmit(form, callback) { 

    form.find("button[type=\"submit\"]").attr("disabled", true);
    var id = form.attr("id")

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
            case "radio":
                console.log(Datas[i].checked)
                if (Datas[i].checked) {
                    formData.append(Datas[i].name, Datas[i].value);
                }
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
        response = JSON.parse(response)
        if (response.IsSuccess) {
            await Success();
            if (callback) {
                callback(response);
            }
            else {
                if (response.ResultData == "") {
                    window.location.reload();
                }
                else {
                      forward(response.ResultData);
                }
            }

        }
        else {
            ErrorMessageBoxCreator(response)
        }
        form.find("button[type=\"submit\"]").attr("disabled", false);
        document.body.removeAttribute("style");
        return false;

    }).fail(function (data) {
        console.log(data);
        alert("Console Log");
        document.body.removeAttribute("style");
    });
}

function ErrorMessageBoxCreator(data) {
    document.getElementById(data.ErrorDivId + "Box").style.display = "block";
    document.getElementById(data.ErrorDivId).innerHTML = "";
    var Messages = "";

    for (var i = 0; i < data.ErrorMessages.length; i++) {
        Messages += " <div>*" + data.ErrorMessages[i] + "</div>";
    }

    document.getElementById(data.ErrorDivId).innerHTML = Messages
    document.getElementById(data.ErrorDivId + "Box").scrollIntoView();
}
function MessageHide() {
    document.getElementById("dvErrorBox").style.display = "none";

}

function Success() {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'İşlem Başarılı',
        showConfirmButton: false,
        timer: 1500
    })
    document.body.removeAttribute("style");
}

  function forward(url) {
    setTimeout(function () {

        window.location.href = url;

    }, 2000);

}
