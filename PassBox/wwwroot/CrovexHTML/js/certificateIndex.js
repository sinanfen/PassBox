$(document).ready(function () {


    /*DataTable */
    const dataTable = $('#datatable').DataTable({
        order: [[2, 'desc']],
        columnDefs: [{
            targets: 2,
            render: function (data, type, row) {
                // Tarihi doğru formata dönüştür
                var dateParts = data.split(".");
                var dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

                if (type === 'sort') {
                    return dateObject.getTime(); // Tarihi zaman damgasına dönüştürerek sıralama yap
                } else if (type === 'type') {
                    return 'date'; // Sütun tipini "date" olarak belirt
                } else {
                    return data; // Normal görüntüleme
                }
            }
        }]
    });


    /* Ajax GET / Getting the _CertificateAddPartial as Modal Form starts from here. */
    $(function () {
        const url = '/Admin/Certificate/Add/';
        const placeHolderDiv = $('#modalPlaceHolder');
        $('#btnAdd').click(function () {
            $.get(url).done(function (data) {
                placeHolderDiv.html(data);
                placeHolderDiv.find(".modal").modal('show');
            });
        });
        /* Ajax GET / Getting the _CertificateAddPartial as Modal Form ends here. */

        /* Ajax POST / Posting the FormData as CertificateAddDto starts from here. */
        placeHolderDiv.on('click',
            '#btnSave',
            function (event) {
                event.preventDefault();
                const form = $('#form-certificate-add');
                const actionUrl = form.attr('action');
                const dataToSend = new FormData(form.get(0));
                $.ajax({
                    url: actionUrl,
                    type: 'POST',
                    data: dataToSend,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        console.log(data);
                        const certificateAddAjaxModel = jQuery.parseJSON(data);
                        console.log(certificateAddAjaxModel);
                        const newFormBody = $('.modal-body', certificateAddAjaxModel.CertificateAddPartial);
                        placeHolderDiv.find('.modal-body').replaceWith(newFormBody);
                        const isValid = newFormBody.find('[name="IsValid"]').val() === 'True';
                        if (isValid) {
                            placeHolderDiv.find('.modal').modal('hide');
                            const newTableRow = dataTable.row.add([
                                `<img src="/files/${certificateAddAjaxModel.CertificateDto.Certificate.Thumbnail}" alt="${certificateAddAjaxModel.CertificateDto.Certificate.Title}" style="width:150px; height:110px;" class="rounded zoom" />`,
                                certificateAddAjaxModel.CertificateDto.Certificate.Title,
                                certificateAddAjaxModel.CertificateDto.Certificate.Date,
                                `<span class="badge badge-boxed  badge-soft-${(certificateAddAjaxModel.CertificateDto.Certificate.IsActive ? "success" : "danger")}">${(certificateAddAjaxModel.CertificateDto.Certificate.IsActive ? "Yes" : "No")}</span>`,
                                `<span class="badge badge-boxed  badge-soft-${(certificateAddAjaxModel.CertificateDto.Certificate.IsDeleted ? "success" : "danger")}">${(certificateAddAjaxModel.CertificateDto.Certificate.IsDeleted ? "Yes" : "No")}</span>`,
                                `<a href="#" data-id="${certificateAddAjaxModel.CertificateDto.Certificate.Id}" class="mr-2 btn-detail"><i class="fas fa-book text-success font-16"></i></a>
                                <a href="#" data-id="${certificateAddAjaxModel.CertificateDto.Certificate.Id}" class="mr-2 btn-update"><i class="fas fa-edit text-warning font-16"></i></a>
                                <a href="#" data-id="${certificateAddAjaxModel.CertificateDto.Certificate.Id}" class="mr-2 btn-delete"><i class="fas fa-trash-alt text-danger font-16"></i></a>`

                            ]).node();
                            const jqueryTableRow = $(newTableRow);
                            jqueryTableRow.attr('name', `${certificateAddAjaxModel.CertificateDto.Certificate.Id}`);
                            dataTable.row(newTableRow).draw();
                            toastr.success(`${certificateAddAjaxModel.CertificateDto.Message}`, 'Success!');
                        } else {
                            // Dropify'yi yeniden yapılandır
                            placeHolderDiv.find('.dropify').dropify();
                            let summaryText = "";
                            $('#validation-summary > ul > li').each(function () {
                                let text = $(this).text();
                                summaryText = `*${text}\n`;
                            });
                            toastr.warning(summaryText);
                        }
                    },
                    error: function (err) {
                        console.log(err);
                        toastr.error(`${err.responseText}`, 'Error!');
                    }
                });
            });
    });
    /* Ajax POST / Posting the FormData as CertificateAddDto ends here. */

    /* Ajax Getting a selected Certificate with details. */
    $(function () {

        const url = '/Admin/Certificate/GetDetail/';
        const placeHolderDiv = $('#modalPlaceHolder');
        $(document).on('click',
            '.btn-detail',
            function (event) {
                event.preventDefault();
                const id = $(this).attr('data-id');
                $.get(url, { certificateId: id }).done(function (data) {
                    placeHolderDiv.html(data);
                    placeHolderDiv.find('.modal').modal('show');
                }).fail(function (err) {
                    toastr.error(`${err.responseText}`, 'Error!');
                });
            });

    });
    /* Ajax Get Details Ends Here */


    /* Ajax GET / Getting the _CertificateUpdatePartial as Modal Form starts from here. */
    $(function () {
        const url = '/Admin/Certificate/Update/';
        const placeHolderDiv = $('#modalPlaceHolder');
        $(document).on('click',
            '.btn-update',
            function (event) {
                event.preventDefault();
                const id = $(this).attr('data-id');
                $.get(url, { certificateId: id }).done(function (data) {
                    placeHolderDiv.html(data);
                    placeHolderDiv.find('.modal').modal('show');
                }).fail(function (err) {
                    toastr.error(`${err.responseText}`, 'Error!');
                });
            });

        /* Ajax POST / Updating a Certificate starts from here */
        placeHolderDiv.on('click',
            '#btnUpdate',
            function (event) {
                event.preventDefault();
                const form = $('#form-certificate-update');
                const actionUrl = form.attr('action');
                const dataToSend = new FormData(form.get(0));
                $.ajax({
                    url: actionUrl,
                    type: 'POST',
                    data: dataToSend,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        const certificateUpdateAjaxModel = jQuery.parseJSON(data);
                        console.log(certificateUpdateAjaxModel);
                        const newFormBody = $('.modal-body', certificateUpdateAjaxModel.CertificateUpdatePartial);
                        placeHolderDiv.find('.modal-body').replaceWith(newFormBody);
                        const isValid = newFormBody.find('[name="IsValid"]').val() === 'True';
                        if (isValid) {
                            const id = certificateUpdateAjaxModel.CertificateDto.Certificate.Id;
                            const tableRow = $(`[name="${id}"]`);
                            placeHolderDiv.find('.modal').modal('hide');
                            dataTable.row(tableRow).data([
                                `<img src="/files/${certificateUpdateAjaxModel.CertificateDto.Certificate.Thumbnail}" alt="${certificateUpdateAjaxModel.CertificateDto.Certificate.Title}" style="width:150px; height:110px;" class="rounded zoom" />`,
                                certificateUpdateAjaxModel.CertificateDto.Certificate.Title,
                                certificateUpdateAjaxModel.CertificateDto.Certificate.Date,
                                `<span class="badge badge-boxed  badge-soft-${(certificateUpdateAjaxModel.CertificateDto.Certificate.IsActive ? "success" : "danger")}">${(certificateUpdateAjaxModel.CertificateDto.Certificate.IsActive ? "Yes" : "No")}</span>`,
                                `<span class="badge badge-boxed  badge-soft-${(certificateUpdateAjaxModel.CertificateDto.Certificate.IsDeleted ? "success" : "danger")}">${(certificateUpdateAjaxModel.CertificateDto.Certificate.IsDeleted ? "Yes" : "No")}</span>`,
                                `<a href="#" data-id="${certificateUpdateAjaxModel.CertificateDto.Certificate.Id}" class="mr-2 btn-detail"><i class="fas fa-book text-success font-16"></i></a>
                                <a href="#" data-id="${certificateUpdateAjaxModel.CertificateDto.Certificate.Id}" class="mr-2 btn-update"><i class="fas fa-edit text-warning font-16"></i></a>
                                <a href="#" data-id="${certificateUpdateAjaxModel.CertificateDto.Certificate.Id}" class="mr-2 btn-delete"><i class="fas fa-trash-alt text-danger font-16"></i></a>`
                            ]);
                            tableRow.attr("name", `${id}`);
                            dataTable.row(tableRow).invalidate();
                            toastr.success(`${certificateUpdateAjaxModel.CertificateDto.Message}`, "Success!");
                        } else {
                            // Dropify'yi yeniden yapılandır
                            placeHolderDiv.find('.dropify').dropify();
                            let summaryText = "";
                            $('#validation-summary > ul > li').each(function () {
                                let text = $(this).text();
                                summaryText = `*${text}\n`;
                            });
                            toastr.warning(summaryText);
                        }
                    },
                    error: function (err) {
                        console.log(err);
                        toastr.error(`${err.responseText}`, 'Error!');
                    }
                });
            });
        /* Ajax POST / Updating a Certificate Ends from here */
    });
    /* Ajax GET / Getting the _CertificateUpdatePartial as Modal Form Ends from here. */


    /* Ajax Soft DELETING (isActive->false | isDeleted->true) */
    $(document).on('click', '.btn-delete', function (event) { //[btn-delete] - butona atadığım classı kullanarak o objeyi yakalıyorum. Bu class bu işlem için butona eklendi
        event.preventDefault(); //Butonun kendi bir işlevi varsa bunu deaktif et.
        const id = $(this).attr('data-id');
        const tableRow = $(`[name="${id}"]`);
        const certificateTitle = tableRow.find('td:eq(1)').text(); //<td> ler içerisinden 3. td yi seçmiş oldu. (bilgisayarlar sıfırdan sayar ve 1.index 2. numaraya denk gelir)
        Swal.fire({
            title: 'Are you sure you want to delete?',
            text: `Certificate '${certificateTitle}' will be deleted!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I want to delete!',
            cancelButtonText: 'No, I don\'t want to delete.'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    data: { certificateId: id },
                    url: '/Admin/Certificate/Delete/',
                    success: function (data) {
                        const certificateDto = jQuery.parseJSON(data);
                        if (certificateDto.ResultStatus === 0) {
                            Swal.fire(
                                'Deleted!',
                                `Certificate titled '${certificateDto.Certificate.Title}' has been deleted successfully.`,
                                "success"
                            );

                            dataTable.row(tableRow).remove().draw();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Failed process.',
                                text: `${certificateDto.Message}`
                            });
                        }
                    },
                    error: function (err) {
                        console.log(err);
                        toastr.error(`${err.responseText}`, "Error!");
                    }
                });
            }
        });
    });
    /* Ajax Soft DELETING (isActive->false | isDeleted->true) ENDS HERE */
});
