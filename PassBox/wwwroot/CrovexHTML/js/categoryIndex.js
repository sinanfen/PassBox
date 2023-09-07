$(document).ready(function () {

    /*DataTable */
    const dataTable = $('#datatable').DataTable({
        order: [[1, 'desc']],
    });

    //const treeViewElement = $('#jstree');

    //// Call the API endpoint to get HTML data
    //const apiUrl = '/Admin/Category/GetCategoryTree/';
    //$.get(apiUrl).done(function (data) {
    //    treeViewElement.html(data);
    //});



    /* Ajax GET / Getting the _CategoryAddPartial as Modal Form starts from here. */
    $(function () {
        const url = '/Admin/Category/Add/';
        const placeHolderDiv = $('#modalPlaceHolder');
        $('#btnAdd').click(function () {
            $.get(url).done(function (data) {
                placeHolderDiv.html(data);
                placeHolderDiv.find(".modal").modal('show');
            });
        });
        /* Ajax GET / Getting the _CategoryAddPartial as Modal Form ends here. */


        /* Ajax POST / Posting the FormData as CategoryAddDto starts from here. */
        placeHolderDiv.on('click',
            '#btnSave',
            function (event) {
                event.preventDefault();
                const form = $('#form-category-add');
                const actionUrl = form.attr('action');
                const dataToSend = new FormData(form.get(0));
                $.ajax({
                    url: actionUrl,
                    type: 'POST',
                    data: dataToSend,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        const categoryAddAjaxModel = jQuery.parseJSON(data);
                        const newFormBody = $('.modal-body', categoryAddAjaxModel.CategoryAddPartial);
                        placeHolderDiv.find('.modal-body').replaceWith(newFormBody);
                        const isValid = newFormBody.find('[name="IsValid"]').val() === 'True';
                        if (isValid) {
                            placeHolderDiv.find('.modal').modal('hide');
                            const newTableRow = dataTable.row.add([
                                `<a asp-controller="Cateogry" asp-action="Detail" asp-route-categoryId="@category.Id">${(categoryAddAjaxModel.CategoryDto.Category.Title)}</a>`,
                                `<span class="badge badge-boxed  badge-soft-primary">0</span>`,
                                `<span class="badge badge-boxed  badge-soft-${(categoryAddAjaxModel.CategoryDto.Category.IsActive ? "success" : "danger")}">${(categoryAddAjaxModel.CategoryDto.Category.IsActive ? "Yes" : "No")}</span>`,
                                `<span class="badge badge-boxed  badge-soft-${(categoryAddAjaxModel.CategoryDto.Category.IsDeleted ? "success" : "danger")}">${(categoryAddAjaxModel.CategoryDto.Category.IsDeleted ? "Yes" : "No")}</span>`,
                                `<a href="#" data-id="${categoryAddAjaxModel.CategoryDto.Category.Id}" class="mr-2 btn-detail"><i class="fas fa-book text-success font-16"></i></a>
                                <a href="#" data-id="${categoryAddAjaxModel.CategoryDto.Category.Id}" class="mr-2 btn-update"><i class="fas fa-edit text-warning font-16"></i></a>
                                <a href="#" data-id="${categoryAddAjaxModel.CategoryDto.Category.Id}" class="mr-2 btn-delete"><i class="fas fa-trash-alt text-danger font-16"></i></a>`

                            ]).node();
                            const jqueryTableRow = $(newTableRow);
                            jqueryTableRow.attr('name', `${categoryAddAjaxModel.CategoryDto.Category.Id}`);
                            dataTable.row(newTableRow).draw();
                            toastr.success(`${categoryAddAjaxModel.CategoryDto.Message}`, 'Success!');
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
    /* Ajax POST / Posting the FormData as CategoryAddDto ends here. */

    /* Ajax Getting a selected Category with details. */
    $(function () {

        const url = '/Admin/Category/GetDetail/';
        const placeHolderDiv = $('#modalPlaceHolder');
        $(document).on('click',
            '.btn-detail',
            function (event) {
                event.preventDefault();
                const id = $(this).attr('data-id');
                $.get(url, { categoryId: id }).done(function (data) {
                    placeHolderDiv.html(data);
                    placeHolderDiv.find('.modal').modal('show');
                }).fail(function (err) {
                    toastr.error(`${err.responseText}`, 'Error!');
                });
            });

    });
    /* Ajax Get Details Ends Here */


    /* Ajax GET / Getting the _CategoryUpdatePartial as Modal Form starts from here. */
    $(function () {
        const url = '/Admin/Category/Update/';
        const placeHolderDiv = $('#modalPlaceHolder');
        $(document).on('click',
            '.btn-update',
            function (event) {
                event.preventDefault();
                const id = $(this).attr('data-id');
                $.get(url, { categoryId: id }).done(function (data) {
                    placeHolderDiv.html(data);
                    placeHolderDiv.find('.modal').modal('show');
                }).fail(function (err) {
                    toastr.error(`${err.responseText}`, 'Error!');
                });
            });

        /* Ajax POST / Updating a Category starts from here */
        placeHolderDiv.on('click',
            '#btnUpdate',
            function (event) {
                event.preventDefault();
                const form = $('#form-category-update');
                const actionUrl = form.attr('action');
                const dataToSend = new FormData(form.get(0));
                $.ajax({
                    url: actionUrl,
                    type: 'POST',
                    data: dataToSend,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        const categoryUpdateAjaxModel = jQuery.parseJSON(data);
                        const newFormBody = $('.modal-body', categoryUpdateAjaxModel.CategoryUpdatePartial);
                        placeHolderDiv.find('.modal-body').replaceWith(newFormBody);
                        const isValid = newFormBody.find('[name="IsValid"]').val() === 'True';

                        if (isValid) {
                            const id = categoryUpdateAjaxModel.CategoryDto.Category.Id;
                            const tableRow = $(`[name="${id}"]`);
                            placeHolderDiv.find('.modal').modal('hide');
                            // İkinci Ajax çağrısı - Post sayısını almak için
                            $.ajax({
                                url: '/Admin/Category/GetPostCountById',
                                type: 'GET',
                                data: { categoryId: id },
                                success: function (response) {
                                    const postCount = response.postCount;
                                    dataTable.row(tableRow).data([
                                        `<a asp-controller="Cateogry" asp-action="Detail" asp-route-categoryId="@category.Id">${(categoryUpdateAjaxModel.CategoryDto.Category.Title)}</a>`,
                                        `<span class="badge badge-boxed  badge-soft-primary">${postCount}</span>`,
                                        `<span class="badge badge-boxed  badge-soft-${(categoryUpdateAjaxModel.CategoryDto.Category.IsActive ? "success" : "danger")}">${(categoryUpdateAjaxModel.CategoryDto.Category.IsActive ? "Yes" : "No")}</span>`,
                                        `<span class="badge badge-boxed  badge-soft-${(categoryUpdateAjaxModel.CategoryDto.Category.IsDeleted ? "success" : "danger")}">${(categoryUpdateAjaxModel.CategoryDto.Category.IsDeleted ? "Yes" : "No")}</span>`,
                                        `<a href="#" data-id="${categoryUpdateAjaxModel.CategoryDto.Category.Id}" class="mr-2 btn-detail"><i class="fas fa-book text-success font-16"></i></a>
                                    <a href="#" data-id="${categoryUpdateAjaxModel.CategoryDto.Category.Id}" class="mr-2 btn-update"><i class="fas fa-edit text-warning font-16"></i></a>
                                    <a href="#" data-id="${categoryUpdateAjaxModel.CategoryDto.Category.Id}" class="mr-2 btn-delete"><i class="fas fa-trash-alt text-danger font-16"></i></a>`
                                    ]);
                                    tableRow.attr("name", `${id}`);
                                    dataTable.row(tableRow).invalidate();
                                    toastr.success(`${categoryUpdateAjaxModel.CategoryDto.Message}`, "Success!");
                                },
                                error: function (err) {
                                    console.log(err);
                                    toastr.error(`${err.responseText}`, 'Error!');
                                }
                            });
                        }
                    }
                });
            });
        /* Ajax POST / Updating a Category Ends from here */
    });
    /* Ajax GET / Getting the _CategoryUpdatePartial as Modal Form Ends from here. */


    /* Ajax Soft DELETING (isActive->false | isDeleted->true) */
    $(document).on('click', '.btn-delete', function (event) { //[btn-delete] - butona atadığım classı kullanarak o objeyi yakalıyorum. Bu class bu işlem için butona eklendi
        event.preventDefault(); //Butonun kendi bir işlevi varsa bunu deaktif et.
        const id = $(this).attr('data-id');
        const tableRow = $(`[name="${id}"]`);
        const categoryTitle = tableRow.find('td:eq(0)').text(); //<td> ler içerisinden 1. td yi seçmiş oldu. (bilgisayarlar sıfırdan sayar ve 1.index 2. numaraya denk gelir)
        Swal.fire({
            title: 'Are you sure you want to delete?',
            text: `Category '${categoryTitle}' will be deleted!`,
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
                    data: { categoryId: id },
                    url: '/Admin/Category/Delete/',
                    success: function (data) {
                        const categoryDto = jQuery.parseJSON(data);
                        if (categoryDto.ResultStatus === 0) {
                            Swal.fire(
                                'Deleted!',
                                `Category titled ${categoryDto.Category.Title} has been deleted successfully.`,
                                "success"
                            );

                            dataTable.row(tableRow).remove().draw();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Failed process.',
                                text: `${categoryDto.Message}`
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
