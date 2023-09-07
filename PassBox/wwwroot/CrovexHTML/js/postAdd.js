$(document).ready(function () {

    //Categories Select
    $('.select2Category').select2({
        theme: "classic",
        placeholder: '*Select a Category',
        closeOnSelect: false,
        allowClear: true,
    });

    //Tags Select
    $('.select2Tag').select2({
        theme: 'classic',
        placeholder: '*Select a Tag',
        closeOnSelect: false,
        allowClear: true,
    });

    $('.dropify').dropify({});

    $("#addTag").click(function () {
        var newTag = $("#newTag").val();

        $.ajax({
            url: "/Admin/Tag/AddRelatedTag",
            type: "POST",
            data: { title: newTag },
            success: function (response) {
                if (response.success) {
                    var tag = response.tag;

                    // Yeni tag'i select listesine eklemek için gerekli işlemleri yapın
                    var option = new Option(tag.title, tag.id);
                    $("#tagList").append(option);
                    $("#tagList").val(tag.id); // Eklenen tag'i seçili hale getirin

                    $('.select2Tag').select2("destroy"); // Mevcut select2 örneğini yok edin
                    // Select listesini yeniden initialize edin
                    $('.select2Tag').select2({
                        theme: "classic",
                        placeholder: '*Select a Tag',
                        allowClear: true // Eklenen tag'i seçili hale getirildiği için clear seçeneğini ekle
                    });

                    // TextBox üzerindeki yazıyı sıfırlayın
                    $("#newTag").val("");

                    // Başarılı bir şekilde eklendiğine dair toastr mesajını gösterin
                    toastr.success('Tag added successfully', 'Success');
                } else {
                    // Hata durumunda alınan mesajı gösterin
                    toastr.warning('Model state error has occurred. Please provide form validation rules.', 'Warning');
                }
            },
            error: function (xhr, status, error) {
                // Hata durumunda alınan hatayı gösterin
                toastr.error('An error occurred while adding the tag', 'Error');
            }
        });
    });

});