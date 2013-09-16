var items; // items database reference

function fnFetchItems() {
  $.getJSON( "/items", function(data) {
    items = data; // keep userlist in case
    $('#items-combobox').combobox({
      data:items,
      valueField:'id',
      textField:'text'
    });
  });
}

function fnDocumentReadyCB() {
  // get items list
  fnFetchItems();
}
