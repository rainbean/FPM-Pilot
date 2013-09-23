// attach the .contains method to Array's prototype to call it on any array
Array.prototype.contains = function (array, sizediff) {
  // if the other array is a falsy value, return
  if (!array)
    return false;

  // compare lengths - can save a lot of time
  if (this.length <= array.length)
    return false;

  if (sizediff && this.length > array.length + sizediff)
    return false;

  for (var i = 0; i < array.length; i++) {
    if (this.indexOf(array[i]) == -1) {
      return false;
    }
  }
  return true;
}

// attach the .listsub method to Array's prototype to call it on any array
Array.prototype.listsub = function (array, sizediff) {
  // if the other array is a falsy value, return
  if (!array)
    return null;

  var match = [];
  for (var i = 0; i < this.length; i++) {
    if (this[i].contains(array, sizediff)) {
      match.push(this[i]);
    }
  }
  return match;
}

// attach the .joinsub method to Array's prototype to call it on any array
Array.prototype.joinsub = function (array, sizediff) {
  // if the other array is a falsy value, return
  if (!array)
    return null;

  var match = [];
  for (var i = 0; i < this.length; i++) {
    if (this[i].contains(array, sizediff)) {
      for (var j = 0; j < this[i].length; j++) {
        if (array.indexOf(this[i][j]) == -1) {
          match.push(this[i][j]);
        }
      }
    }
  }
  return match;
}


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
  var list = fpm[item.id].joinsub([item.id],1);
  $('#next_text span').text(function (index) {
    if (!list || index >= list.length)
      return '';

    return items[list[index]].text;
  });
}

function fnDocumentReadyCB() {
  // get items list
  fnFetchItems();
  fnFetchFPM();
}
