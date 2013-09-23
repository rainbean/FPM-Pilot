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

var stack = [];
function onSelectNextCB(id) {
  stack.push(id);
  //console.log(stack);
  var t = $('#viewed_text').html();
  $('#viewed_text').html(t + '<br>' + items[id].text);
  fnInsertNextItems(id);
  return false;
}

function fnSelectItemCB(item) {
  stack = [item.id];
  $('#placeholder').show();
  $('#viewed_text').text(item.text);
  fnInsertNextItems(item.id);
}

function fnInsertNextItems(id) {
  var list = fpm[stack[0]].joinsub(stack,1);
  //console.log(list);
  $('#next_text span').html(function (index) {
    if (!list || index >= list.length)
      return '';

    var next = list[index];
    var text = items[list[index]].text;
    return '<a href="#" onclick="javascript:onSelectNextCB(' + next + ')">' + text +'</a>';
  });
}

function fnDocumentReadyCB() {
  // get items list
  fnFetchItems();
  fnFetchFPM();
}
