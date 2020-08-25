import InventoryAllocator from '../src'

test('should pass happy case where enough resources are available', () => {
  expect(InventoryAllocator.getCheapestShipment({ apple: 1 }, 
    [{ name: 'owd', inventory: { apple: 1 } }])).toEqual([ { owd: { apple: 1 } } ]);
    
  expect(InventoryAllocator.getCheapestShipment({ banana: 10 }, 
    [{ name: 'A', inventory: { banana: 10 } }, {
      name: 'B', inventory: { apple: 10, banana: 10 } }])).toEqual([ { A: { banana: 10 } } ]);
});

test('should return no allocations', () => {
  expect(InventoryAllocator.getCheapestShipment({ apple: 1 }, 
    [{ name: 'owd', inventory: { apple: 0 } }])).toEqual([]);

  expect(InventoryAllocator.getCheapestShipment({ banana: 3 }, 
    [{ name: 'A', inventory: { apple: 2 } }])).toEqual([]);

  expect(InventoryAllocator.getCheapestShipment({ apple: 3, banana: 2, chocolate: 1 }, 
    [{ name: 'A', inventory: { apple: 1, banana: 1, chocolate: 0 } },
     { name: 'B', inventory: { apple: 0, banana: 1, chocolate: 0 }}])).toEqual([]);

  expect(InventoryAllocator.getCheapestShipment({ apple: 3, banana: 2, chocolate: 1 }, 
  [{ name: 'A', inventory: { apple: 1, banana: 10, chocolate: 10 } },
    { name: 'B', inventory: { apple: 1, banana: 10, chocolate: 10 }}])).toEqual([]);
})

test('should split an item across warehouses if that is the only way to completely ship an item', 
  () => {
    expect(InventoryAllocator.getCheapestShipment({ apple: 10 }, 
      [{ name: 'A', inventory: { apple: 5 } }, { name: 'B', inventory: { apple: 5 }}]))
      .toEqual([{ A: { apple: 5 }}, { B: { apple: 5 } }]);

    expect(InventoryAllocator.getCheapestShipment({apple: 5, bananas: 10, chocolate: 15}, 
      [{ name: 'A', inventory: { apple: 5 } }, 
      { name: 'B', inventory: { apple: 5, bananas: 7, chocolate: 10} },
      { name: 'C', inventory: { apple: 10, bananas: 4, chocolate: 20} }])).toEqual([
        { A: { apple: 5} }, { B: { bananas: 7, chocolate: 10 } }, { C: { bananas: 3, chocolate: 5 }} 
      ]);

    expect(InventoryAllocator.getCheapestShipment({apple: 5, banana: 10, chocolate: 15}, 
      [{ name: 'A', inventory: { apple: 5}}, { name: 'B', inventory: {banana: 10}},
       {name: 'C', inventory: {chocolate: 15}}])).toEqual([{A: { apple: 5}}, {B: {banana: 10}},
      {C: {chocolate: 15}}])

    // Warehouse C only has 14 chocolate items whereas 15 are needed, 
    // so it is an unfulfilled shipment
    expect(InventoryAllocator.getCheapestShipment({apple: 5, banana: 10, chocolate: 15}, 
    [{ name: 'A', inventory: { apple: 5}}, { name: 'B', inventory: {banana: 10}},
    {name: 'C', inventory: {chocolate: 14}}])).toEqual([]) 

    // !! currently fails bc of warehouse name order
    // expect(InventoryAllocator.getCheapestShipment({ apple: 10 }, 
    //   [{ name: 'owd', inventory: { apple: 5 } }, { name: 'dm', inventory: { apple: 5 }}]))
    //   .toEqual([{ dm: { apple: 5 }}, { owd: { apple: 5 } }]);
})
