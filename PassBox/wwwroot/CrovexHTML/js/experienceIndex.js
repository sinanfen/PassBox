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


    /* Ajax GET / Getting the _ExperienceAddPartial as Modal Form starts from here. */
    $(function () {
        const url = '/Admin/Experience/Add/';
        const placeHolderDiv = $('#modalPlaceHolder');
        $('#btnAdd').click(function () {
            $.get(url).done(function (data) {
                placeHolderDiv.html(data);
                placeHolderDiv.find(".modal").modal('show');
            });
        });
        /* Ajax GET / Getting the _ExperienceAddPartial as Modal Form ends here. */

        /* Ajax POST / Posting the FormData as ExperienceAddDto starts from here. */
        placeHolderDiv.on('click',
            '#btnSave',
            function (event) {
                event.preventDefault();
                const form = $('#form-experience-add');
                const actionUrl = form.attr('action');
                const dataToSend = new FormData(form.get(0));
                $.ajax({
                    url: actionUrl,
                    type: 'POST',
                    data: dataToSend,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        const experienceAddAjaxModel = jQuery.parseJSON(data);
                        const newFormBody = $('.modal-body', experienceAddAjaxModel.ExperienceAddPartial);
                        placeHolderDiv.find('.modal-body').replaceWith(newFormBody);
                        const isValid = newFormBody.find('[name="IsValid"]').val() === 'True';
                        if (isValid) {
                            placeHolderDiv.find('.modal').modal('hide');
                            const newTableRow = dataTable.row.add([
                                experienceAddAjaxModel.ExperienceDto.Experience.Title,
                                experienceAddAjaxModel.ExperienceDto.Experience.Company,
                                experienceAddAjaxModel.ExperienceDto.Experience.StartDate,
                                experienceAddAjaxModel.ExperienceDto.Experience.EndDate,
                                `<span class="badge badge-boxed  badge-soft-${(experienceAddAjaxModel.ExperienceDto.Experience.IsActive ? "success" : "danger")}">${(experienceAddAjaxModel.ExperienceDto.Experience.IsActive ? "Yes" : "No")}</span>`,
                                `<span class="badge badge-boxed  badge-soft-${(experienceAddAjaxModel.ExperienceDto.Experience.IsDeleted ? "success" : "danger")}">${(experienceAddAjaxModel.ExperienceDto.Experience.IsDeleted ? "Yes" : "No")}</span>`,
                                `<a href="#" data-id="${experienceAddAjaxModel.ExperienceDto.Experience.Id}" class="mr-2 btn-detail"><i class="fas fa-book text-success font-16"></i></a>
                                <a href="#" data-id="${experienceAddAjaxModel.ExperienceDto.Experience.Id}" class="mr-2 btn-update"><i class="fas fa-edit text-warning font-16"></i></a>
                                <a href="#" data-id="${experienceAddAjaxModel.ExperienceDto.Experience.Id}" class="mr-2 btn-delete"><i class="fas fa-trash-alt text-danger font-16"></i></a>`

                            ]).node();
                            const jqueryTableRow = $(newTableRow);
                            jqueryTableRow.attr('name', `${experienceAddAjaxModel.ExperienceDto.Experience.Id}`);
                            dataTable.row(newTableRow).draw();
                            toastr.success(`${experienceAddAjaxModel.ExperienceDto.Message}`, 'Success!');
                        } else {
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
    /* Ajax POST / Posting the FormData as ExperienceAddDto ends here. */

    /* Ajax Getting a selected Experience with details. */
    $(function () {

        const url = '/Admin/Experience/GetDetail/';
        const placeHolderDiv = $('#modalPlaceHolder');
        $(document).on('click',
            '.btn-detail',
            function (event) {
                event.preventDefault();
                const id = $(this).attr('data-id');
                $.get(url, { experienceId: id }).done(function (data) {
                    placeHolderDiv.html(data);
                    placeHolderDiv.find('.modal').modal('show');
                }).fail(function (err) {
                    toastr.error(`${err.responseText}`, 'Error!');
                });
            });

    });
    /* Ajax Get Details Ends Here */


    /* Ajax GET / Getting the _ExperienceUpdatePartial as Modal Form starts from here. */
    $(function () {
        const url = '/Admin/Experience/Update/';
        const placeHolderDiv = $('#modalPlaceHolder');
        $(document).on('click',
            '.btn-update',
            function (event) {
                event.preventDefault();
                const id = $(this).attr('data-id');
                $.get(url, { experienceId: id }).done(function (data) {
                    placeHolderDiv.html(data);
                    placeHolderDiv.find('.modal').modal('show');                    
                }).fail(function (err) {
                    toastr.error(`${err.responseText}`, 'Error!');
                });
            });

        /* Ajax POST / Updating a Experience starts from here */
        placeHolderDiv.on('click',
            '#btnUpdate',
            function (event) {
                event.preventDefault();
                const form = $('#form-experience-update');
                const actionUrl = form.attr('action');
                const dataToSend = new FormData(form.get(0));
                $.ajax({
                    url: actionUrl,
                    type: 'POST',
                    data: dataToSend,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        const experienceUpdateAjaxModel = jQuery.parseJSON(data);
                        const newFormBody = $('.modal-body', experienceUpdateAjaxModel.ExperienceUpdatePartial);
                        placeHolderDiv.find('.modal-body').replaceWith(newFormBody);
                        const isValid = newFormBody.find('[name="IsValid"]').val() === 'True';
                        if (isValid) {
                            const id = experienceUpdateAjaxModel.ExperienceDto.Experience.Id;
                            const tableRow = $(`[name="${id}"]`);
                            placeHolderDiv.find('.modal').modal('hide');
                            dataTable.row(tableRow).data([
                                experienceUpdateAjaxModel.ExperienceDto.Experience.Title,
                                experienceUpdateAjaxModel.ExperienceDto.Experience.Company,
                                experienceUpdateAjaxModel.ExperienceDto.Experience.StartDate,
                                experienceUpdateAjaxModel.ExperienceDto.Experience.EndDate,
                                `<span class="badge badge-boxed  badge-soft-${(experienceUpdateAjaxModel.ExperienceDto.Experience.IsActive ? "success" : "danger")}">${(experienceUpdateAjaxModel.ExperienceDto.Experience.IsActive ? "Yes" : "No")}</span>`,
                                `<span class="badge badge-boxed  badge-soft-${(experienceUpdateAjaxModel.ExperienceDto.Experience.IsDeleted ? "success" : "danger")}">${(experienceUpdateAjaxModel.ExperienceDto.Experience.IsDeleted ? "Yes" : "No")}</span>`,
                                `<a href="#" data-id="${experienceUpdateAjaxModel.ExperienceDto.Experience.Id}" class="mr-2 btn-detail"><i class="fas fa-book text-success font-16"></i></a>
                                <a href="#" data-id="${experienceUpdateAjaxModel.ExperienceDto.Experience.Id}" class="mr-2 btn-update"><i class="fas fa-edit text-warning font-16"></i></a>
                                <a href="#" data-id="${experienceUpdateAjaxModel.ExperienceDto.Experience.Id}" class="mr-2 btn-delete"><i class="fas fa-trash-alt text-danger font-16"></i></a>`
                            ]);
                            tableRow.attr("name", `${id}`);
                            dataTable.row(tableRow).invalidate();
                            toastr.success(`${experienceUpdateAjaxModel.ExperienceDto.Message}`, "Success!");
                        } else {
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
        /* Ajax POST / Updating a Experience Ends from here */
    });
    /* Ajax GET / Getting the _ExperienceUpdatePartial as Modal Form Ends from here. */


    /* Ajax Soft DELETING (isActive->false | isDeleted->true) */
    $(document).on('click', '.btn-delete', function (event) { //[btn-delete] - butona atadığım classı kullanarak o objeyi yakalıyorum. Bu class bu işlem için butona eklendi
        event.preventDefault(); //Butonun kendi bir işlevi varsa bunu deaktif et.
        const id = $(this).attr('data-id');
        const tableRow = $(`[name="${id}"]`);
        const experienceTitle = tableRow.find('td:eq(0)').text(); //<td> ler içerisinden 3. td yi seçmiş oldu. (bilgisayarlar sıfırdan sayar ve 1.index 2. numaraya denk gelir)
        Swal.fire({
            title: 'Are you sure you want to delete?',
            text: `Experience '${experienceTitle}' will be deleted!`,
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
                    data: { experienceId: id },
                    url: '/Admin/Experience/Delete/',
                    success: function (data) {
                        const experienceDto = jQuery.parseJSON(data);
                        if (experienceDto.ResultStatus === 0) {
                            Swal.fire(
                                'Deleted!',
                                `Experience titled '${experienceDto.Experience.Title}' has been deleted successfully.`,
                                "success"
                            );

                            dataTable.row(tableRow).remove().draw();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Failed process.',
                                text: `${experienceDto.Message}`
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
