jQuery(document).ready(function($) {

    if ($("html body").find("*[itemtype]").length > 0) {

        createModalWindow();
        createSchemaTypeSkel();
        createSchemaPropertySkel();

        $("div.modal-body").html("");

        $("html body").find("*[itemtype]").each(function() {

            $("#schemaType").tmpl({
                "type" : getTypeFromReference($(this).attr("itemtype")),
                "reference" : $(this).attr("itemtype")
            }).appendTo("div.modal-body");

            if ($(this).find("*[itemprop]").length > 0) {

                $(this).find("*[itemprop]").each(function() {

                    $("#schemaProperty").tmpl({
                        "name" : $(this).attr("itemprop"),
                        "value" : $.trim(getValueFromTag(this))
                    }).appendTo("div.modal-body");

                });

            } else {

                $("#schemaProperty").tmpl({
                    "name" : "",
                    "value" : $(this).text()
                }).appendTo("div.modal-body").fadeIn("fast");

            }

        });

        fixCssErrorPaths();
        $("#schemaModal").modal("show");

    } else {

        alert("Nenhuma marcacao semantica encontrada!");

    }

});

function createModalWindow() {
    $("<div id=\"schemaModal\" class=\"modal hide fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n\
        <div class=\"modal-header\">\n\
        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>\n\
        <span class=\"myModalLabel\">Schema Reader</span>\n\
        </div>\n\
        <div class=\"modal-body\"></div>\n\
        </div>").appendTo("body");
}

function createSchemaTypeSkel() {
    $("<script type=\"text/x-jquery-tmpl\" id=\"schemaType\">\n\
        <div class=\"type\"><i class=\"icon-info-sign\"></i> ${type}</div>\n\
        <div class=\"reference\"><a href=\"${reference}\" target=\"_blank\">${reference}</a></div>\n\
        </script>").appendTo("body");
}

function createSchemaPropertySkel() {
    $("<script type=\"text/x-jquery-tmpl\" id=\"schemaProperty\">\n\
        <div class=\"name\"><i class=\"icon-tags\"></i> ${name}</div>\n\
        <div class=\"value\">${value}</div>\n\
        <div class=\"clear\"></div>\n\
        </script>").appendTo("body");
}

function getTypeFromReference(reference) {
    var type = reference.replace("http://schema.org/", "");
    return type;
}

function getValueFromTag(tag) {
    var name = tag.nodeName;
    switch (name) {
        case "A":
        return $(tag).attr("href")
        break;
        case "IMG":
        return $(tag).attr("src")
        break;
        default:
        return $(tag).text()
    }
}

function fixCssErrorPaths() {
    $(".myModalLabel").css({"background-image": "url(" + chrome.extension.getURL("library/images/icon-19.png") +")"});
    $("[class\^=\"icon-\"], [class\*=\" icon-\"]").css({"background-image": "url(" + chrome.extension.getURL("library/bootstrap/img/glyphicons-halflings.png") +")"});
}