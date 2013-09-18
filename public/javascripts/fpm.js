var items; // items database reference
var fpm; // fpm database reference

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

function fnFetchFPM() {
  $.getJSON( "/fp", function(data) {
    fpm = data; // keep userlist in case
  });
}

function fnSelectItemCB(item) {
  //console.log(item);
  $('#placeholder').show();
  $('#viewed_text').text(item.text);
  $('#next_text span').text(function (index) {
    return "item number " + ( index + 1 );
  });
}

function fnDocumentReadyCB() {
  // get items list
  fnFetchItems();
  fnFetchFPM();
}
