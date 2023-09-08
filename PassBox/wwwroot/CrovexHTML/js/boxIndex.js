$(document).ready(function () {

    /*DataTable */
    const dataTable = $('#datatable').DataTable({
        order: [[3, 'desc']],
        columnDefs: [{
            targets: 3,
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


    /* Ajax GET / Getting the _BoxAddPartial as Modal Form starts from here. */
    $(function () {
        const url = '/Box/Add/';
        const placeHolderDiv = $('#modalPlaceHolder');
        $('#btnAdd').click(function () {
            $.get(url).done(function (data) {
                placeHolderDiv.html(data);
                placeHolderDiv.find(".modal").modal('show');
            });
        });
        /* Ajax GET / Getting the _BoxAddPartial as Modal Form ends here. */

        /* Ajax POST / Posting the FormData as BoxAddDto starts from here. */
        //placeHolderDiv.on('click',
        //    '#btnSave',
        //    function (event) {
        //        event.preventDefault();
        //        const form = $('#form-box-add');
        //        const actionUrl = form.attr('action');
        //        const dataToSend = new FormData(form.get(0));
        //        $.ajax({
        //            url: actionUrl,
        //            type: 'POST',
        //            data: dataToSend,
        //            processData: false,
        //            contentType: false,
        //            success: function (data) {
        //                const boxAddAjaxModel = jQuery.parseJSON(data);
        //                const newFormBody = $('.modal-body', boxAddAjaxModel.BoxAddPartial);
        //                placeHolderDiv.find('.modal-body').replaceWith(newFormBody);
        //                const isValid = newFormBody.find('[name="IsValid"]').val() === 'True';
        //                if (isValid) {
        //                    placeHolderDiv.find('.modal').modal('hide');
        //                    const newBoxCard
        placeHolderDiv.on('click',
            '#btnSave',
            function (event) {
                event.preventDefault();
                const form = $('#form-box-add');
                const actionUrl = form.attr('action');
                const dataToSend = new FormData(form.get(0));
                $.ajax({
                    url: actionUrl,
                    type: 'POST',
                    data: dataToSend,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        const boxAddAjaxModel = jQuery.parseJSON(data);
                        const newFormBody = $('.modal-body', boxAddAjaxModel.BoxAddPartial);
                        placeHolderDiv.find('.modal-body').replaceWith(newFormBody);
                        const isValid = newFormBody.find('[name="IsValid"]').val() === 'True';
                        if (isValid) {
                            placeHolderDiv.find('.modal').modal('hide');
                            const newTableRow = dataTable.row.add([
                                boxAddAjaxModel.BoxDto.Box.URL,
                                boxAddAjaxModel.BoxDto.Box.SiteName,
                                boxAddAjaxModel.BoxDto.Box.Username,
                                boxAddAjaxModel.BoxDto.Box.CreatedDate,
                                boxAddAjaxModel.BoxDto.Box.Status,
                                `<a href="#" data-id="${boxAddAjaxModel.BoxDto.Box.Id}" class="mr-2 btn-detail"><i class="fas fa-book text-success font-16"></i></a>
                                <a href="#" data-id="${boxAddAjaxModel.BoxDto.Box.Id}" class="mr-2 btn-update"><i class="fas fa-edit text-warning font-16"></i></a>
                                <a href="#" data-id="${boxAddAjaxModel.BoxDto.Box.Id}" class="mr-2 btn-delete"><i class="fas fa-trash-alt text-danger font-16"></i></a>`

                            ]).node();
                            const jqueryTableRow = $(newTableRow);
                            jqueryTableRow.attr('name', `${boxAddAjaxModel.BoxDto.Box.Id}`);
                            dataTable.row(newTableRow).draw();
                            toastr.success(`${boxAddAjaxModel.BoxDto.Message}`, 'Success!');
                        } else {
                            let summaryText = "Error!";
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


    /* Ajax Getting a selected Box with details. */
    $(function () {

        const url = '/Box/GetDetail/';
        const placeHolderDiv = $('#modalPlaceHolder');
        $(document).on('click',
            '.btn-detail',
            function (event) {
                event.preventDefault();
                const id = $(this).attr('data-id');
                $.get(url, { boxId: id }).done(function (data) {
                    placeHolderDiv.html(data);
                    placeHolderDiv.find('.modal').modal('show');
                }).fail(function (err) {
                    toastr.error(`${err.responseText}`, 'Error!');
                });
            });

    });
    /* Ajax Get Details Ends Here */



    /* Ajax GET / Getting the _BoxUpdatePartial as Modal Form starts from here. */
    $(function () {
        const url = '/Box/Update/';
        const placeHolderDiv = $('#modalPlaceHolder');
        $(document).on('click',
            '.btn-update',
            function (event) {
                event.preventDefault();
                const id = $(this).attr('data-id');
                $.get(url, { boxId: id }).done(function (data) {
                    placeHolderDiv.html(data);
                    placeHolderDiv.find('.modal').modal('show');
                }).fail(function (err) {
                    toastr.error(`${err.responseText}`, 'Error!');
                });
            });

        /* Ajax POST / Updating a Box starts from here */
        placeHolderDiv.on('click',
            '#btnUpdate',
            function (event) {
                event.preventDefault();
                const form = $('#form-box-update');
                const actionUrl = form.attr('action');
                const dataToSend = new FormData(form.get(0));
                $.ajax({
                    url: actionUrl,
                    type: 'POST',
                    data: dataToSend,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        const boxUpdateAjaxModel = jQuery.parseJSON(data);
                        const newFormBody = $('.modal-body', boxUpdateAjaxModel.BoxUpdatePartial);
                        placeHolderDiv.find('.modal-body').replaceWith(newFormBody);
                        const isValid = newFormBody.find('[name="IsValid"]').val() === 'True';
                        if (isValid) {
                            const id = boxUpdateAjaxModel.BoxDto.Box.Id;
                            const tableRow = $(`[name="${id}"]`);
                            placeHolderDiv.find('.modal').modal('hide');
                            dataTable.row(tableRow).data([
                                boxUpdateAjaxModel.BoxDto.Box.URL,
                                boxUpdateAjaxModel.BoxDto.Box.SiteName,
                                boxUpdateAjaxModel.BoxDto.Box.Username,
                                boxUpdateAjaxModel.BoxDto.Box.CreatedDate,
                                boxUpdateAjaxModel.BoxDto.Box.Status,
                                `<a href="#" data-id="${boxUpdateAjaxModel.BoxDto.Box.Id}" class="mr-2 btn-detail"><i class="fas fa-book text-success font-16"></i></a>
                                <a href="#" data-id="${boxUpdateAjaxModel.BoxDto.Box.Id}" class="mr-2 btn-update"><i class="fas fa-edit text-warning font-16"></i></a>
                                <a href="#" data-id="${boxUpdateAjaxModel.BoxDto.Box.Id}" class="mr-2 btn-delete"><i class="fas fa-trash-alt text-danger font-16"></i></a>`
                            ]);
                            tableRow.attr("name", `${id}`);
                            dataTable.row(tableRow).invalidate();
                            toastr.success(`${boxUpdateAjaxModel.BoxDto.Message}`, "Success!");
                        } else {
                            let summaryText = "Error!";
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
        /* Ajax POST / Updating a Box Ends from here */
    });
    /* Ajax GET / Getting the _BoxUpdatePartial as Modal Form Ends from here. */


    /* Ajax Soft DELETING (isActive->false | isDeleted->true) */
    $(document).on('click', '.btn-delete', function (event) { //[btn-delete] - butona atadığım classı kullanarak o objeyi yakalıyorum. Bu class bu işlem için butona eklendi
        event.preventDefault(); //Butonun kendi bir işlevi varsa bunu deaktif et.
        const id = $(this).attr('data-id');
        const tableRow = $(`[name="${id}"]`);
        const boxTitle = tableRow.find('td:eq(1)').text(); //<td> ler içerisinden 3. td yi seçmiş oldu. (bilgisayarlar sıfırdan sayar ve 1.index 2. numaraya denk gelir)
        Swal.fire({
            title: 'Are you sure you want to delete?',
            text: `Box '${boxTitle}' will be deleted!`,
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
                    data: { boxId: id },
                    url: '/Box/Delete/',
                    success: function (data) {
                        const boxDto = jQuery.parseJSON(data);
                        if (boxDto.ResultStatus === 0) {
                            Swal.fire(
                                'Deleted!',
                                `Box titled '${boxDto.Box.SiteName}' has been deleted successfully.`,
                                "success"
                            );

                            dataTable.row(tableRow).remove().draw();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Failed process.',
                                text: `${boxDto.Message}`
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