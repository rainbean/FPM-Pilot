var items; // items database reference

function fnFetchItems() {
  $.getJSON( "/items", function(data) {
    items = data; // keep userlist in case
    $('#items-combobox').combobox({
      data:items,
      valueField:'id',
      textField:'text',
      onSelect: fnSelectItemCB
    });
  });
}

function fnSelectItemCB(item) {
  console.log(item);
  //var url = 'get_data2.php?id='+item.id;
  //$('#cc2').combobox('reload', url);
}

function fnDocumentReadyCB() {
  // get items list
  fnFetchItems();
}
