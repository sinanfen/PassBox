$(document).ready(function () {


    /*DataTable */
    const dataTable = $('#datatable').DataTable({
        order: [[0, 'asc']],
        buttons: [
            {
                text: 'Yenile',
                className: 'btn btn-warning',
                action: function (e, dt, node, config) {
                    $.ajax({
                        type: 'GET',
                        url: '/Admin/User/GetAllUsers/',
                        contentType: "application/json",
                        beforeSend: function () {
                            $('#datatable').hide();
                            $('.spinner-border').show();
                        },
                        success: function (data) {
                            const userListDto = jQuery.parseJSON(data);
                            dataTable.clear();
                            console.log(userListDto);
                            if (userListDto.ResultStatus === 0) {
                                $.each(userListDto.Users.$values,
                                    function (index, user) {
                                        const newTableRow = dataTable.row.add([
                                            user.Id,
                                            `<img src="/filesFolder/${user.Image}" alt="${user.UserName}" style="width:110px; height:110px;" class="rounded zoom" />`,
                                            user.Username,
                                            user.Email,
                                            user.FirstName,
                                            user.LastName,
                                            user.About,
                                            `  
                                <a href="#" data-id="${user.Id}" class="mr-2 btn-detail"><i class="fas fa-book text-success font-16"></i></a>
                                <a href="#" data-id="${user.Id}" class="mr-2 btn-assign"><i class="fas fa-user-shield text-primary font-16"></i></a>
                                <a href="#" data-id="${user.Id}" class="mr-2 btn-update"><i class="fas fa-edit text-warning font-16"></i></a>
                                <a href="#" data-id="${user.Id}" class="mr-2 btn-delete"><i class="fas fa-trash-alt text-danger font-16"></i></a>
                            `
                                        ]).node();
                                        const jqueryTableRow = $(newTableRow);
                                        jqueryTableRow.attr('name', `${user.Id}`);
                                    });
                                dataTable.draw();
                                $('.spinner-border').hide();
                                $('#datatable').fadeIn(1400);
                            } else {
                                toastr.error(`${userListDto.Message}`, 'Failed!');
                            }
                        },
                        error: function (err) {
                            console.log(err);
                            $('.spinner-border').hide();
                            $('#datatable').fadeIn(1000);
                            toastr.error(`${err.responseText}`, 'Error!');
                        }
                    });
                }
            }
        ]
    });

    /* Ajax GET / Getting the _UserAddPartial as Modal Form starts from here. */
    $(function () {
        const url = '/Admin/User/Add/';
        const placeHolderDiv = $('#modalPlaceHolder');
        $('#btnAdd').click(function () {
            $.get(url).done(function (data) {
                placeHolderDiv.html(data);
                placeHolderDiv.find(".modal").modal('show');
            });
        });
        /* Ajax GET / Getting the _UserAddPartial as Modal Form ends here. */

        /* Ajax POST / Posting the FormData as UserAddDto starts from here. */
        placeHolderDiv.on('click',
            '#btnSave',
            function (event) {
                event.preventDefault();
                const form = $('#form-user-add');
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
                        const userAddAjaxModel = jQuery.parseJSON(data);
                        console.log(userAddAjaxModel);
                        const newFormBody = $('.modal-body', userAddAjaxModel.UserAddPartial);
                        placeHolderDiv.find('.modal-body').replaceWith(newFormBody);
                        const isValid = newFormBody.find('[name="IsValid"]').val() === 'True';
                        if (isValid) {
                            placeHolderDiv.find('.modal').modal('hide');
                            const newTableRow = dataTable.row.add([
                                userAddAjaxModel.UserDto.User.Id,
                                `<img src="/filesFolder/${userAddAjaxModel.UserDto.User.Image}" alt="${userAddAjaxModel.UserDto.User.UserName}" style="width:110px; height:110px;" class="rounded zoom" />`,
                                userAddAjaxModel.UserDto.User.UserName,
                                userAddAjaxModel.UserDto.User.Email,
                                userAddAjaxModel.UserDto.User.FirstName,
                                userAddAjaxModel.UserDto.User.LastName,
                                userAddAjaxModel.UserDto.User.About.length > 75 ? userAddAjaxModel.UserDto.User.About.substring(0, 75) : userAddAjaxModel.UserDto.User.About,
                                `  
                                <a href="#" data-id="${userAddAjaxModel.UserDto.User.Id}" class="mr-2 btn-detail"><i class="fas fa-book text-success font-16"></i></a>
                                <a href="#" data-id="${userAddAjaxModel.UserDto.User.Id}" class="mr-2 btn-assign"><i class="fas fa-user-shield text-primary font-16"></i></a>
                                <a href="#" data-id="${userAddAjaxModel.UserDto.User.Id}" class="mr-2 btn-update"><i class="fas fa-edit text-warning font-16"></i></a>
                                <a href="#" data-id="${userAddAjaxModel.UserDto.User.Id}" class="mr-2 btn-delete"><i class="fas fa-trash-alt text-danger font-16"></i></a>
                            `
                            ]).node();
                            const jqueryTableRow = $(newTableRow);
                            jqueryTableRow.attr('name', `${userAddAjaxModel.UserDto.User.Id}`);
                            dataTable.row(newTableRow).draw();
                            toastr.success(`${userAddAjaxModel.UserDto.Message}`, 'Success!');
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
    /* Ajax POST / Posting the FormData as UserAddDto ends here. */

    /* Ajax Getting a selected User with details. */
    $(function () {

        const url = '/Admin/User/GetDetail/';
        const placeHolderDiv = $('#modalPlaceHolder');
        $(document).on('click',
            '.btn-detail',
            function (event) {
                event.preventDefault();
                const id = $(this).attr('data-id');
                $.get(url, { userId: id }).done(function (data) {
                    placeHolderDiv.html(data);
                    placeHolderDiv.find('.modal').modal('show');
                }).fail(function (err) {
                    toastr.error(`${err.responseText}`, 'Error!');
                });
            });

    });
    /* Ajax Get Details Ends Here */


    /* Ajax POST / Deleting a User starts from here */
    $(document).on('click',
        '.btn-delete',
        function (event) {
            event.preventDefault();
            const id = $(this).attr('data-id');
            const tableRow = $(`[name="${id}"]`);
            const userName = tableRow.find('td:eq(2)').text();
            Swal.fire({
                title: 'Are you sure you want to delete?',
                text: `User ${userName} will be permanently deleted!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, I want to delete.',
                cancelButtonText: 'No, I don\'t want to delete.'
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        data: { userId: id },
                        url: '/Admin/User/Delete/',
                        success: function (data) {
                            const userDto = jQuery.parseJSON(data);
                            if (userDto.ResultStatus === 0) {
                                Swal.fire(
                                    'Deleted!',
                                    `The user ${userDto.User.UserName} has been successfully deleted.`,
                                    'success'
                                );

                                dataTable.row(tableRow).remove().draw();
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Failed process!',
                                    text: `${userDto.Message}`,
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
    /* Ajax POST / Deleting a User ENDS from here */

    /* Ajax GET / Getting the _UserUpdatePartial as Modal Form starts from here. */

    //burası
    $(function () {
        const url = '/Admin/User/Update/';
        const placeHolderDiv = $('#modalPlaceHolder');
        $(document).on('click',
            '.btn-update',
            function (event) {
                event.preventDefault();
                const id = $(this).attr('data-id');
                $.get(url, { userId: id }).done(function (data) {
                    placeHolderDiv.html(data);
                    placeHolderDiv.find('.modal').modal('show');
                }).fail(function (err) {
                    toastr.error(`${err.responseText}`, 'Error!');
                });
            });
        function HasDeleteRole() {
            // AJAX isteği için jQuery kullanarak bir örnek
            $.ajax({
                url: '/Admin/User/HasDeleteRole',
                type: 'GET',
                success: function (response) {
                    // Cevap başarılı olduğunda yapılacak işlemler
                    if (response) {
                        // Kullanıcının "User.Delete" rolüne sahip olduğu durum
                        // Butonları görünür yapma
                        $('.btn-delete').each(function () {
                            $(this).show();
                        });
                    } else {
                        // Kullanıcının "User.Delete" rolüne sahip olmadığı durum
                        // Butonları gizleme
                        $('.btn-delete').each(function () {
                            $(this).hide();
                        });
                    }
                },
                error: function (error) {
                    // İstek başarısız olduğunda yapılacak işlemler
                    console.log(error);
                }
            });
        };
        function HasAssignRole() {
            // AJAX isteği için jQuery kullanarak bir örnek
            $.ajax({
                url: '/Admin/User/HasAssignRole',
                type: 'GET',
                success: function (response) {
                    // Cevap başarılı olduğunda yapılacak işlemler
                    if (response) {
                        // Kullanıcının "Role.Update" rolüne sahip olduğu durum
                        // Butonları görünür yapma
                        $('.btn-assign').each(function () {
                            $(this).show();
                        });
                    } else {
                        // Kullanıcının "Role.Update" rolüne sahip olmadığı durum
                        // Butonları gizleme
                        $('.btn-assign').each(function () {
                            $(this).hide();
                        });
                    }
                },
                error: function (error) {
                    // İstek başarısız olduğunda yapılacak işlemler
                    console.log(error);
                }
            });
        }


        /* Ajax POST / Updating a User starts from here */
        placeHolderDiv.on('click',
            '#btnUpdate',
            function (event) {
                event.preventDefault();
                const form = $('#form-user-update');
                const actionUrl = form.attr('action');
                const dataToSend = new FormData(form.get(0));
                $.ajax({
                    url: actionUrl,
                    type: 'POST',
                    data: dataToSend,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        const userUpdateAjaxModel = jQuery.parseJSON(data);
                        console.log(userUpdateAjaxModel);
                        const newFormBody = $('.modal-body', userUpdateAjaxModel.UserUpdatePartial);
                        placeHolderDiv.find('.modal-body').replaceWith(newFormBody);
                        const isValid = newFormBody.find('[name="IsValid"]').val() === 'True';
                        if (isValid) {
                            const id = userUpdateAjaxModel.UserDto.User.Id;
                            const tableRow = $(`[name="${id}"]`);
                            placeHolderDiv.find('.modal').modal('hide');
                            dataTable.row(tableRow).data([
                                userUpdateAjaxModel.UserDto.User.Id,
                                `<img src="/filesFolder/${userUpdateAjaxModel.UserDto.User.Image}" alt="${userUpdateAjaxModel.UserDto.User.UserName}" style="width:110px; height:110px;" class="rounded" />`,
                                userUpdateAjaxModel.UserDto.User.UserName,
                                userUpdateAjaxModel.UserDto.User.Email,
                                userUpdateAjaxModel.UserDto.User.FirstName,
                                userUpdateAjaxModel.UserDto.User.LastName,
                                userUpdateAjaxModel.UserDto.User.About.length > 75 ? userUpdateAjaxModel.UserDto.User.About.substring(0, 75) : userUpdateAjaxModel.UserDto.User.About,
                                `  
                                <a href="#" data-id="${userUpdateAjaxModel.UserDto.User.Id}" class="mr-2 btn-detail"><i class="fas fa-book text-success font-16"></i></a>
                                <a href="#" data-id="${userUpdateAjaxModel.UserDto.User.Id}" class="mr-2 btn-assign"><i class="fas fa-user-shield text-primary font-16"></i></a>
                                <a href="#" data-id="${userUpdateAjaxModel.UserDto.User.Id}" class="mr-2 btn-update"><i class="fas fa-edit text-warning font-16"></i></a>
                                <a href="#" data-id="${userUpdateAjaxModel.UserDto.User.Id}" class="mr-2 btn-delete"><i class="fas fa-trash-alt text-danger font-16"></i></a>
                            `
                            ]);
                            tableRow.attr("name", `${id}`);
                            dataTable.row(tableRow).invalidate();
                            toastr.success(`${userUpdateAjaxModel.UserDto.Message}`, "Success!");

                            HasDeleteRole();
                            HasAssignRole();

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
        HasDeleteRole();
        HasAssignRole();
        /* Ajax POST / Updating a User Ends from here */
    });
    /* Ajax GET / Getting the _UserUpdatePartial as Modal Form Ends from here. */


    $(function () {
        const url = '/Admin/Role/Assign/';
        const placeHolderDiv = $('#modalPlaceHolder');
        $(document).on('click',
            '.btn-assign',
            function (event) {
                event.preventDefault();
                const id = $(this).attr('data-id');
                $.get(url, { userId: id }).done(function (data) {
                    placeHolderDiv.html(data);
                    placeHolderDiv.find('.modal').modal('show');
                }).fail(function (err) {
                    toastr.error(`${err.responseText}`, 'Error!');
                });
            });

        /* Ajax POST / Updating a RoleAssign starts from here */

        placeHolderDiv.on('click',
            '#btnAssign',
            function (event) {
                event.preventDefault();
                const form = $('#form-role-assign');
                const actionUrl = form.attr('action');
                const dataToSend = new FormData(form.get(0));
                $.ajax({
                    url: actionUrl,
                    type: 'POST',
                    data: dataToSend,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        const userRoleAssignAjaxModel = jQuery.parseJSON(data);
                        console.log(userRoleAssignAjaxModel);
                        const newFormBody = $('.modal-body', userRoleAssignAjaxModel.RoleAssignPartial);
                        placeHolderDiv.find('.modal-body').replaceWith(newFormBody);
                        const isValid = newFormBody.find('[name="IsValid"]').val() === 'True';
                        if (isValid) {
                            const id = userRoleAssignAjaxModel.UserDto.User.Id;
                            const tableRow = $(`[name="${id}"]`);
                            placeHolderDiv.find('.modal').modal('hide');
                            toastr.success(`${userRoleAssignAjaxModel.UserDto.Message}`, "Success!");
                        } else {
                            let summaryText = "";
                            $('#validation-summary > ul > li').each(function () {
                                let text = $(this).text();
                                summaryText = `*${text}\n`;
                            });
                            toastr.warning(summaryText);
                        }
                    },
                    error: function (error) {
                        console.log(error);
                        toastr.error(`${err.responseText}`, 'Hata!');
                    }
                });
            });

    });
});