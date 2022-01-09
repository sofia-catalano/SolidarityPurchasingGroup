import API from "../API";

/* ------------------------------------------------ */

/*
 * Tested functions: getClientAcceptedOrders
 *                   getClientPendingOrders
 *                   getCancellingOrdersByClientId
*/

var fakeOrder = {
    creation_date: '2021-12-8',
    client_id: 2,
    total: 3.55,
    pick_up: 1,
    address: 'prova',
    date: 'prova',
    time: 'prova'
  };

var fakeOrder2 = {
    creation_date: '2021-12-8',
    client_id: 2,
    total: 4.19,
    pick_up: 0,
    address: 'prova',
    date: 'prova',
    time: 'prova'
  };

  var fakeOrder3 = {
    creation_date: '2021-12-8',
    client_id: 2,
    total: 6.12,
    pick_up: 1,
    address: 'prova',
    date: 'prova',
    time: 'prova'
  };

test('', async () => {

    //Create an order
    const orderId =  await API.createOrder(fakeOrder);
    const orderId1 =  await API.createOrder(fakeOrder2);
    const orderId2 =  await API.createOrder(fakeOrder3);

    //Change status 
    await API.changeStatus(orderId.id, 'ACCEPTED');
    await API.changeStatus(orderId2.id, 'CANCELLING');

    //Verify correct insertion
    const ordersAccepted = await API.getClientAcceptedOrders(2);
    const ordersPending = await API.getClientPendingOrders(2);
    const ordersCancelling = await API.getCancellingOrdersByClientId(2);
    expect(ordersAccepted.length >= 1).toEqual(true);
    expect(ordersPending.length >= 1).toEqual(true);
    expect(ordersCancelling.length >= 1).toEqual(true);


    await API.deleteOrder(orderId.id);
    await API.deleteOrder(orderId1.id);
    await API.deleteOrder(orderId2.id);
})

/* ------------------------------------------------------------------- */

/* ------------------------------------------------------------------- */

/**
 * Tested functions: createBasket
 *                   getOrderedByFarmerByDate
 */

test('', async () =>  {

    //Create an order
    const orderId =  await API.createOrder(fakeOrder3);

    //Create basket
    const basketCreated = await API.createBasket({order_id : orderId.id, product_id: 20, quantity: 5, updated: 0});
    expect(basketCreated.inserted).toEqual(true);

    const ordersOfProduct20 = await API.getOrderedByFarmerByDate(20);

    var totQuant = 0;
    ordersOfProduct20.map((o) => {
        totQuant = totQuant + o.quantity;
    })

    expect(totQuant >=5 ).toEqual(true);

    const basket = await API.getBasket(orderId.id);
    expect(basket[0].id).toEqual(20);
    expect(basket[0].quantity).toEqual(5);

    await API.deleteOrder(orderId.id);

})

/* ------------------------------------------------------------------- */

/* ------------------------------------------------------------------- */

/**
 * Tested functions: getProductsByFarmer
 */


test('', async () => {

    const productOfFarmer6 = await API.getProductsByFarmer(6);

    expect( productOfFarmer6[0].id).toEqual(21);
    expect( productOfFarmer6[1].id).toEqual(22);
})



/* ------------------------------------------------------------------- */

/* ------------------------------------------------------------------- */

/**
 * Tested functions: createProductNW,
  changeProductNW,
  deleteProductNW,
  deleteAllUserProductNW,
  deleteAllProductNW,
 */

  test('', async () => {

    await API.createProductNW({ quantity:7,price:3, name: 'name1', description: "description1", category: "category1", farmer_id: 4, img_path: 'some-img-path-1', confirmed_by_farmer: 0});

    let productNW = await API.getProductNW(4);

   
    expect( productNW[0].quantity).toEqual(7);
    expect( productNW[0].name).toEqual('name1');
    expect( productNW[0].description).toEqual('description1');
    expect( productNW[0].category).toEqual('category1');
    expect( productNW[0].farmer_id).toEqual(4);
    expect( productNW[0].img_path).toEqual('some-img-path-1');
    expect( productNW[0].confirmed_by_farmer).toEqual(0);



    await API.changeProductNW(1, 10);

    productNW = await API.getProductNW(4);

    expect( productNW[0].quantity).toEqual(10);

    await API.deleteProductNW(1);

    await API.createProductNW({ quantity:7,price:3, name: 'name1', description: "description1", category: "category1", farmer_id: 4, img_path: 'some-img-path-1', confirmed_by_farmer: 0});
    await API.createProductNW({ quantity:10 ,price:4, name: 'name2', description: "description2", category: "category2", farmer_id: 5, img_path: 'some-img-path-2', confirmed_by_farmer: 1});
    await API.createProductNW({ quantity:20,price:3, name: 'name3', description: "description3", category: "category3", farmer_id: 5, img_path: 'some-img-path-3', confirmed_by_farmer: 1});


    await API.deleteAllProductNWNotConfirmed();

    productNW = await API.getProductNW(4);

    expect((productNW)).toEqual([]);

    productNW = await API.getProductNW(5);
    expect((productNW[0])).toEqual({'id':2, 'quantity':10 ,'price':4, 'name': 'name2', 'description': "description2", 'category': "category2", 'farmer_id': 5, 'img_path': 'some-img-path-2', 'confirmed_by_farmer': 1});
    await API.deleteAllProductNW();

    

});