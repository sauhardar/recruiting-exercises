import InventoryAllocator from '../src';

test('should pass happy case where enough resources are available', () => {
  expect(InventoryAllocator.getCheapestShipment({ apple: 1 },
    [{ name: 'owd', inventory: { apple: 1 } }]))
    .toEqual([{ owd: { apple: 1 } }]);

  expect(InventoryAllocator.getCheapestShipment({ apple: 1, banana: 2 },
    [{ name: 'A', inventory: { apple: 1 } }, { name: 'B', inventory: { banana: 2 } }]))
    .toEqual([{ A: { apple: 1 } }, { B: { banana: 2 } }]);
});

test('should return no allocations since the order cannot be completed, not even partially',
  () => {
    expect(InventoryAllocator.getCheapestShipment({ apple: 1 },
      [{ name: 'A', inventory: { apple: 0 } }]))
      .toEqual([]);

    expect(InventoryAllocator.getCheapestShipment({ banana: 3 },
      [{ name: 'A', inventory: { apple: 2 } }]))
      .toEqual([]);

    expect(InventoryAllocator.getCheapestShipment({ apple: 2, banana: 3 },
      [{ name: 'A', inventory: { apple: 1, banana: 1 } },
        { name: 'B', inventory: { apple: 0, banana: 1 } }]))
      .toEqual([]);
  });

test('should split an item across warehouses if that is the only way to completely ship an item',
  () => {
    expect(InventoryAllocator.getCheapestShipment({ apple: 10 },
      [{ name: 'A', inventory: { apple: 5 } }, { name: 'B', inventory: { apple: 5 } }]))
      .toEqual([{ A: { apple: 5 } }, { B: { apple: 5 } }]);

    expect(InventoryAllocator.getCheapestShipment({ apple: 5, banana: 10, chocolate: 15 },
      [{ name: 'A', inventory: { apple: 5 } },
        { name: 'B', inventory: { apple: 5, banana: 7, chocolate: 10 } },
        { name: 'C', inventory: { apple: 10, banana: 4, chocolate: 6 } },
      ]))
      .toEqual([
        { A: { apple: 5 } }, { B: { banana: 7, chocolate: 10 } },
        { C: { banana: 3, chocolate: 5 } },
      ]);

    expect(InventoryAllocator.getCheapestShipment({ apple: 5, banana: 10, chocolate: 15 },
      [{ name: 'A', inventory: { apple: 5 } }, { name: 'B', inventory: { banana: 10 } },
        { name: 'C', inventory: { chocolate: 14 } },
      ]))
      .toEqual([{ A: { apple: 5 } }, { B: { banana: 10 } }]);
  });

test('should ship from only one and the cheapest warehouse if possible', () => {
  expect(InventoryAllocator.getCheapestShipment({ apple: 10 }, [
    { name: 'A', inventory: { apple: 5 } }, { name: 'B', inventory: { apple: 5 } },
    { name: 'C', inventory: { apple: 10 } }])).toEqual([{ C: { apple: 10 } }]);

  expect(InventoryAllocator.getCheapestShipment({ apple: 10 }, [
    { name: 'A', inventory: { apple: 5 } }, { name: 'B', inventory: { apple: 5 } },
    { name: 'C', inventory: { apple: 10 } }, { name: 'D', inventory: { apple: 10 } }]))
    .toEqual([{ C: { apple: 10 } }]);

  expect(InventoryAllocator.getCheapestShipment({ apple: 5, banana: 10, chocolate: 15 },
    [
      { name: 'A', inventory: { apple: 5 } },
      { name: 'B', inventory: { banana: 10, chocolate: 10 } },
      { name: 'C', inventory: { chocolate: 15 } },
    ]))
    .toEqual([
      { A: { apple: 5 } },
      { B: { banana: 10 } },
      { C: { chocolate: 15 } },
    ]);

  expect(InventoryAllocator.getCheapestShipment({ apple: 100 }, [
    { name: 'A', inventory: { apple: 20 } },
    { name: 'B', inventory: { apple: 20 } },
    { name: 'C', inventory: { apple: 50 } },
    { name: 'D', inventory: { apple: 99 } },
    { name: 'E', inventory: { apple: 100 } },
  ])).toEqual([{ E: { apple: 100 } }]);
});
