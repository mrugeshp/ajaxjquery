$(function() {
    $orders = $("#orders");

    $.ajax({
        method: "GET",
        url: "http://localhost:3000/orders",
        success: function(orders) {
            console.log(orders);
            $.each(orders, function(index, order){
                $orders.append("<li class='mb-2' data-id='" + order.id + "'>" + "<span class='orderName'>" + order.name + " </span><span class='orderDrink'> " + order.drink + "</span><button class='ml-2 mr-2 btn btn-primary order-update'>Update</button><button class='ml-2 btn btn-secondary delete'>Delete</button></li>")
            })
        },
        error: function(err) {
            // console.log(err.status + err.statusText);
        }
    });

    $('.add-order').on('click', function() {

        var actionVal = $orders.attr('data-action');

        if (actionVal === 'update') {
            console.log('update called');
            var orderId = $orders.attr('data-id');
            var orderIndex = $orders.attr('data-index');
            
            $drinkVal = $('#drink').val();
            $nameVal = $('#name').val();
    
            var order = {
                "name": $nameVal,
                "drink": $drinkVal
            }
               
            $.ajax({
                method: "PUT",
                data: order,
                url: "http://localhost:3000/orders/" + orderId,
                success: function(newOrder) {
                    console.log(newOrder);
                    var htmlVal = "<li class='mb-2' data-id='" + newOrder.id + "'>" + "<span class='orderName'>" + newOrder.name + " </span><span class='orderDrink'> " + newOrder.drink + "</span><button class='ml-2 mr-2 btn btn-primary order-update'>Update</button><button class='ml-2 btn btn-secondary delete'>Delete</button></li>";
                    $orders.find("li:eq(" + orderIndex + ")").html(htmlVal);
                },
                error: function(err) {
                    // console.log(err.status + err.statusText);
                }
            });
        }
        else {
            $drinkVal = $('#drink').val();
            $nameVal = $('#name').val();
    
            var order = {
                "name": $nameVal,
                "drink": $drinkVal
            }
    
            $.ajax({
                method: "POST",
                data: order,
                url: "http://localhost:3000/orders",
                success: function(newOrder) {
                    console.log(newOrder);
                    //$.each(newOrder, function(index, newOrder){
                    $orders.append("<li class='mb-2' data-id='" + newOrder.id + "'>" + "<span class='orderName'>" + newOrder.name + " </span><span class='orderDrink'> " + newOrder.drink + "</span><button class='ml-2 mr-2 btn btn-primary order-update'>Update</button><button class='ml-2 btn btn-secondary delete'>Delete</button></li>")
                    //});
                },
                error: function(err) {
                    // console.log(err.status + err.statusText);
                }
            });
        }

       
    });

    $orders.on('click', '.delete', function() { 
        console.log('delete called');

        var $li = $(this).closest('li');
        var orderId = $li.attr('data-id');

        $.ajax({
            method: "DELETE",
            url: "http://localhost:3000/orders/" + orderId,
            success: function(newOrder) {
                console.log(newOrder);
                $li.fadeOut(300, function(){
                    $(this).remove();
                });
            },
            error: function(err) {
                console.log(err.status + err.statusText);
            }
        });
    });

    $orders.on('click', '.order-update', function() {
        $orders.attr('data-action', 'update');

        var $li = $(this).closest('li');
        var orderId = $li.attr('data-id');
        var name = $li.find('.orderName').html();
        var drink = $li.find('.orderDrink').html();

        $orders.attr('data-id', orderId);
        $orders.attr('data-name', name);
        $orders.attr('data-drink', drink);
        $orders.attr('data-index', $li.index());

        $('#drink').val(drink);
        $('#name').val(name);
    });
})