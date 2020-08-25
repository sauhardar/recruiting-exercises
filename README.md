# recruiting-exercises

## Instructions
- View tests in `/tests/main.test.ts`
- Run tests with command `npm test`

## Assumptions
- There will be no negative orders
- If an order cannot be completely fulfilled, it won't be fulfilled at all. Thus, only a `[]` will be returned. For example:
```
expect(InventoryAllocator.getCheapestShipment({ apple: 3, banana: 2, chocolate: 1 }, [
  { name: 'A', inventory: { apple: 1, banana: 10, chocolate: 10 } },
  { name: 'B', inventory: { apple: 1, banana: 10, chocolate: 10 }}])).toEqual([]);
```
