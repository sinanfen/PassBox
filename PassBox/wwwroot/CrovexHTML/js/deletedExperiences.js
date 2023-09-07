$(document).ready(function () {

    /*DataTable */
    const dataTable = $('#datatable').DataTable({
        order: [[0, 'desc']],
    });

    /* Ajax POST / HardDeleting a Experience starts from here */
    $(document).on('click',
        '.btn-hard-delete',
        function (event) {
            event.preventDefault();
            const id = $(this).attr('data-id');
            const tableRow = $(`[name="${id}"]`);
            const experienceTitle = tableRow.find('td:eq(1)').text();
            Swal.fire({
                title: 'Are you sure you want to delete it permanently?',
                text: `The experience titled ${experienceTitle} will be permanently deleted!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, I want to delete it.',
                cancelButtonText: 'No, I don\'t want.'
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        data: { experienceId: id },
                        url: '/Admin/Experience/HardDelete/',
                        success: function (data) {
                            const experienceResult = jQuery.parseJSON(data);
                            if (experienceResult.ResultStatus === 0) {
                                Swal.fire(
                                    'Deleted!',
                                    `${experienceResult.Message}`,
                                    'success'
                                );

                                dataTable.row(tableRow).remove().draw();
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Failed process.',
                                    text: `${experienceResult.Message}`,
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
    /* Ajax POST / HardDeleting a Experience ends here */


    /* Ajax POST / UndoDeleting a Experience starts from here */
    $(document).on('click',
        '.btn-undo',
        function (event) {
            event.preventDefault();
            const id = $(this).attr('data-id');
            const tableRow = $(`[name="${id}"]`);
            let experienceTitle = tableRow.find('td:eq(1)').text();
            Swal.fire({
                title: 'Are you sure you want to restore from archive?',
                text: `The experience titled ${experienceTitle} will be brought back from the archive!`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, I want to restore it.',
                cancelButtonText: 'No, I don\'t want.'
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        data: { experienceId: id },
                        url: '/Admin/Experience/UndoDelete/',
                        success: function (data) {
                            const experienceUndoDeleteResult = jQuery.parseJSON(data);
                            console.log(experienceUndoDeleteResult);
                            if (experienceUndoDeleteResult.ResultStatus === 0) {
                                Swal.fire(
                                    'Restored from Archive.',
                                    `${experienceUndoDeleteResult.Message}`,
                                    'success'
                                );
                                dataTable.row(tableRow).remove().draw();
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Failed process.',
                                    text: `${experienceUndoDeleteResult.Message}`,
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
    /* Ajax POST / UndoDeleting a Experience ends here */

});