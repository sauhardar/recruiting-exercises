# recruiting-exercises

## Inventory Allocator

### Instructions
- View tests in `/tests/main.test.ts`
- Run tests with command `npm test`

### Assumptions
- There will be no negative orders
- If a part of order cannot be completely fulfilled, only that part of the order will remain unfulfilled and thus only a `[]` will be returned. For all other parts of the order, if the resources are available, it will be fulfilled. For example:
```
  expect(InventoryAllocator.getCheapestShipment({ apple: 3, banana: 2, chocolate: 1 }, [
    { name: 'A', inventory: { apple: 1, banana: 10, chocolate: 10 } },
    { name: 'B', inventory: { apple: 1, banana: 10, chocolate: 10 } }])).toEqual(
    [{ A: { banana: 2, chocolate: 1 } }],
  );
```
- If the order of warehouses provided is `A, B, C`, though it may be cheaper to ship from warehouse `A` than from warehouse `C`, it is even cheaper to ship all items from a single warehouse than to split it up amongst multiple. Thus if it's possible to either ship from only warehouse `C` or split it up amongst two or more of the warehouses, the order should be fulfilled from only warehouse `C`.
