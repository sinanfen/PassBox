$(document).ready(function () {

    /*DataTable */
    const dataTable = $('#datatable').DataTable({
        order: [[0, 'desc']],
    });

    /* Ajax POST / HardDeleting a Education starts from here */
    $(document).on('click',
        '.btn-hard-delete',
        function (event) {
            event.preventDefault();
            const id = $(this).attr('data-id');
            const tableRow = $(`[name="${id}"]`);
            const educationTitle = tableRow.find('td:eq(1)').text();
            Swal.fire({
                title: 'Are you sure you want to delete it permanently?',
                text: `The education titled ${educationTitle} will be permanently deleted!`,
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
                        data: { educationId: id },
                        url: '/Admin/Education/HardDelete/',
                        success: function (data) {
                            const educationResult = jQuery.parseJSON(data);
                            if (educationResult.ResultStatus === 0) {
                                Swal.fire(
                                    'Deleted!',
                                    `${educationResult.Message}`,
                                    'success'
                                );

                                dataTable.row(tableRow).remove().draw();
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Failed process.',
                                    text: `${educationResult.Message}`,
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
    /* Ajax POST / HardDeleting a Education ends here */


    /* Ajax POST / UndoDeleting a Education starts from here */
    $(document).on('click',
        '.btn-undo',
        function (event) {
            event.preventDefault();
            const id = $(this).attr('data-id');
            const tableRow = $(`[name="${id}"]`);
            let educationTitle = tableRow.find('td:eq(1)').text();
            Swal.fire({
                title: 'Are you sure you want to restore from archive?',
                text: `The education titled ${educationTitle} will be brought back from the archive!`,
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
                        data: { educationId: id },
                        url: '/Admin/Education/UndoDelete/',
                        success: function (data) {
                            const educationUndoDeleteResult = jQuery.parseJSON(data);
                            console.log(educationUndoDeleteResult);
                            if (educationUndoDeleteResult.ResultStatus === 0) {
                                Swal.fire(
                                    'Restored from Archive.',
                                    `${educationUndoDeleteResult.Message}`,
                                    'success'
                                );
                                dataTable.row(tableRow).remove().draw();
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Failed process.',
                                    text: `${educationUndoDeleteResult.Message}`,
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
    /* Ajax POST / UndoDeleting a Education ends here */

});