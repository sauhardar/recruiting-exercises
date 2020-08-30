## Instructions
- View tests in `/tests/main.test.ts`
- Run tests with command `npm test`

## Assumptions
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


### Problem

The problem is compute the best way an order can be shipped (called shipments) given inventory across a set of warehouses (called inventory distribution). 

Your task is to implement InventoryAllocator class to produce the cheapest shipment.

The first input will be an order: a map of items that are being ordered and how many of them are ordered. For example an order of apples, bananas and oranges of 5 units each will be 

`{ apple: 5, banana: 5, orange: 5 }`

The second input will be a list of object with warehouse name and inventory amounts (inventory distribution) for these items. For example the inventory across two warehouses called owd and dm for apples, bananas and oranges could look like

`[ 
    {
    	name: owd,
    	inventory: { apple: 5, orange: 10 }
    }, 
    {
    	name: dm:,
    	inventory: { banana: 5, orange: 10 } 
    }
]`

You can assume that the list of warehouses is pre-sorted based on cost. The first warehouse will be less expensive to ship from than the second warehouse. 

You can use any language of your choice to write the solution (internally we use Typescript/Javascript, Python, and some Java). Please write unit tests with your code, a few are mentioned below, but these are not comprehensive. Fork the repository and put your solution inside of the src directory and include a way to run your tests!

### Examples

*Happy Case, exact inventory match!**

Input: `{ apple: 1 }, [{ name: owd, inventory: { apple: 1 } }]`  
Output: `[{ owd: { apple: 1 } }]`

*Not enough inventory -> no allocations!*

Input: `{ apple: 1 }, [{ name: owd, inventory: { apple: 0 } }]`  
Output: `[]`

*Should split an item across warehouses if that is the only way to completely ship an item:*

Input: `{ apple: 10 }, [{ name: owd, inventory: { apple: 5 } }, { name: dm, inventory: { apple: 5 }}]`  
Output: `[{ dm: { apple: 5 }}, { owd: { apple: 5 } }]`

### What are we looking for

We'll evaluate your code via the following guidelines in no particular order:

1. **Readability**: naming, spacing, consistency
2. **Correctness**: is the solution correct and does it solve the problem
1. **Test Code Quality**: Is the test code comperehensive and covering all cases.
1. **Tool/Language mastery**: is the code using up to date syntax and techniques. 
