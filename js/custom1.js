//Datatables
$(document).ready(function () {
  $('.tableMain').each(function () {
    if (!$.fn.DataTable.isDataTable(this)) {
      $(this).DataTable({
        dom: 'Bfrtip',
        buttons: [
          {
            extend: 'colvis',
            className: 'btn btn-primary'
          }
        ],
        pageLength: 10
      });
    }
  });
});







