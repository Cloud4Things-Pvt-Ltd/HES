//Datatables
$(document).ready(function () {
  $('.tableMain').DataTable({
    dom: 'Bfrtip',   // Buttons, search, pagination, entries count
    buttons: [
      {
        extend: 'colvis',
        className: 'btn btn-primary'
      }
    ],
    pageLength: 10
  });
});







