/*********
  product data
***********/

var product = {
  tops : [
  {
    style: "Men's White T-shirt",
    description: "Short sleeve, 100% cotton",
    size: "X-Large",
    price: "$5.99",
    available: "1",
    image: "resources/short_white_t.jpg"
  },

  {
    style: "Men's White V-neck shirt",
    description: "Short sleeve, 100% cotton",
    size: "X-Large",
    price: "$5.99",
    available: "22",
    image: "resources/white-v-neck.jpg"
  },
  {
    style: "Men's Black t-shirt",
    description: "Short sleeve, 100% cotton",
    size: "X-Large",
    price: "$6.99",
    available: "10",
    image: "resources/black-t-shirt-man.jpg"
  },
  {
    style: "Men's Grey shirt",
    description: "Long sleeve, 50% cotton, 50% rayon",
    size: "X-Large",
    price: "$9.99",
    available: "34",
    image: "resources/mens-grey-long.jpg"
  },
  {
    style: "Men's White V-neck shirt",
    description: "Short sleeve, 100% cotton",
    size: "Large",
    price: "$5.99",
    available: "22",
    image: "resources/white-v-neck.jpg"
  },
  {
    style: "Men's Black t-shirt",
    description: "Short sleeve, 100% cotton",
    size: "Large",
    price: "$6.99",
    available: "10",
    image: "resources/black-t-shirt-man.jpg"
  },
  {
    style: "Men's Grey shirt",
    description: "Long sleeve, 50% cotton, 50% rayon",
    size: "Large",
    price: "$9.99",
    available: "34",
    image: "resources/mens-grey-long.jpg"
  },
  {
    style: "Men's White V-neck shirt",
    description: "Short sleeve, 100% cotton",
    size: "Medium",
    price: "$5.99",
    available: "22",
    image: "resources/white-v-neck.jpg"
  },
  {
    style: "Men's Black t-shirt",
    description: "Short sleeve, 100% cotton",
    size: "Medium",
    price: "$6.99",
    available: "10",
    image: "resources/black-t-shirt-man.jpg"
  },
 ],
bottoms : [],
shoes : []
};

$(document).ready(function(){

  /***********
    DOM Manipulators
  ************/
  var addTableData = function(category){
    $('#product-data').children().remove();
    product[category].forEach(function(item){
      var $row = $('<tr></tr>');
      var $anchor = $('<a></a>').attr('href', '#').text(item.style);
      $('<td></td>').attr('class', 'col-1').html($anchor).appendTo($row);
      $('<td></td>').attr('class', 'col-2').text(item.description).appendTo($row);
      $('<td></td>').attr('class', 'col-3').text(item.size).appendTo($row);
      $('<td></td>').attr('class', 'col-4').text(item.price).appendTo($row);
      $('<td></td>').attr('class', 'col-5').text(item.available).appendTo($row);
      
      $('#product-data').append($row);
    });
  };
  var displayObjectFromList = function(item){
      $('#product-name').text(item.style);
      $('#price').text(item.price);
      $('#model-image').attr('src', item.image);
  };

  var flushSmalldisplayData = function(){
    var sibling = $('.selected').next()[0];
    $(sibling).children().remove();
  };

  var changeSelection = function(context){
    var $tab = $(context);
    if(!$tab.hasClass('selected')){
      flushSmalldisplayData();
      var name = $tab.attr('id');
      $('.selected').removeClass('selected');
      $tab.addClass('selected');
      addTableData(name);
      addSmallDisplayData(name);
    }
  };

  var addSmallDisplayData = function(selection){
    var element = '#small-'+ selection;
    var category = product[selection];
    category.forEach(function(item){
      var $container = $('<div></div>').attr('class', 'small-container');
      var $anchor = $('<a></a>').attr('href', '#').text(item.style);
      var $description = $('<div></div>').attr('class', 'small-');
      var availability = item.available + ' left';
      $('<span></span>').attr('class', 'small-item').html($anchor).appendTo($container);
      $('<span></span>').attr('class', 'small-availability').text(availability).appendTo($description);
      $('<span></span>').attr('class', 'small-size').text(item.size).appendTo($description);
      $('<span></span>').attr('class', 'small-price').text(item.price).appendTo($description);
      $container.append($description);
      $(element).append($container);
    });
  };

  /*********
    event handlers
  ***********/
  $('.tabs > span').on('click', function(){
    changeSelection(this);
  });

  $('.tabs').on('click', 'a', function(){
    var list = $(this).parent().parent()[0];
    var index = $(list).index();
    var typeOfselection = $(list).parent()[0].previousElementSibling;
    var selectedClass = $('.selected').attr('id');
    displayObjectFromList(product[selectedClass][index]);
  });

  $('tbody').on('click', 'a', function(){
    var $item = $(this).parent().parent();
    var index = $item[0].rowIndex;
    var selectedClass = $('.selected').attr('id');
    displayObjectFromList(product[selectedClass][index]);
  });

  $('.cart').on('click', function(){
    var $select = $('#right-panel select');  
    var selectedSize = $select[0];
    var selectedQuantity = $select[1];
    
    if($(selectedQuantity).val() === '0'){
      alert('Error! Please indicate quantity.');
    }else{
      //would then add to a shopping cart
    }

  });

  /*******
    initialization function calls
  ********/
  addTableData('tops');
  displayObjectFromList(product.tops[0]);
  addSmallDisplayData('tops');

  //number of items for each tab--
  $('#tops').text("Tops (" + product.tops.length + ")");
  $('#bottoms').text("Bottoms (" + product.bottoms.length + ")" );
  $('#shoes').text("Shoes (" + product.shoes.length + ")" );  
});
