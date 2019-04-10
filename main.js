$(function() {
    

    var $orders = $('#orders');
    var $name = $('#name');
    var $drink = $('#drink');

    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/orders',
        success: function(orders) {
            $.each(orders, function(index, order) {
                $orders.append("<li class='mb-2' data-id='" + order.id + "'>" + "<span class='drink'>" + order.drink + "</span>" + " BY " + "<span class='name'>" + order.name + "</span>" + "  <button class='btn btn-secondary remove'>Delete</button></li>")
            });
        },
        error: function() {
            alert('Error loading data');
        }
    });

    $orders.on('click', '.remove', function() {
        var $li = $(this).closest('li');
        var $orderid = $li.attr('data-id');

        $.ajax({
            method: 'DELETE',
            url: 'http://localhost:3000/orders/' + $orderid,
            success: function(order) {
                $li.fadeOut(300, function(){
                    $(this).remove();
                });
            },
            error: function() {
                alert('Error deleting data');
            }
        })
        
    });


    $('.add-order').on('click', function() {
        var order = {
            name: $name.val(),
            drink: $drink.val()
        };

        $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/orders',
            data: order,
            success: function(newOrder) {
                $orders.append("<li class='mb-2' data-id='" + newOrder.id + "'>" + "<span class='drink'>" + newOrder.drink + "</span>" + " BY " + "<span class='name'>" + newOrder.name + "</span>" + "  <button class='btn btn-secondary remove'>Delete</button></li>")
            },
            error: function() {
                alert('Error in adding data');
            }
        });

    });


})