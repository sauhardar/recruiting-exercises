type Order = {
  [key: string]: number;
}

type Inventory = {
  name: string;
  inventory: Order;
}[]

type WarehouseFulfillment = {
  [warehouseName: string]: Order;
}

/**
 * 
 */
class InventoryAllocator {

  /**
   * !! Determines ... 
   * @param order The requirements from the customer.
   * @param inventory What is current in stock and where.
   */
  static getCheapestShipment(order: Order, inventory: Inventory ): WarehouseFulfillment[] {
    const remainingOrder = order;
    const output: WarehouseFulfillment[] = [];

    inventory.forEach((warehouse) => {
      const { name: warehouseName, inventory } = warehouse;

      const warehouseFulfillment: WarehouseFulfillment = { [warehouseName]: {} };
      
      Object.keys(remainingOrder).map(function(itemName, index) {
        if (itemName in inventory && inventory[itemName] !== 0 && remainingOrder[itemName] != 0) {
          const itemsAdded: number = inventory[itemName] >= remainingOrder[itemName] 
          ? remainingOrder[itemName] : inventory[itemName];

          warehouseFulfillment[warehouseName][itemName] = itemsAdded

          remainingOrder[itemName] -= itemsAdded;
        }
      });
      Object.keys(warehouseFulfillment[warehouseName]).length !== 0 
      && output.push(warehouseFulfillment);
    })

    let isOrderFulfilled: boolean = true;

    Object.keys(remainingOrder).forEach((remainingItemName) => {
      if (remainingOrder[remainingItemName] !== 0) {
        isOrderFulfilled = false;
      }
    })
    return isOrderFulfilled ? output : [];
  }
}

export default InventoryAllocator;

console.log(InventoryAllocator.getCheapestShipment({apple: 5, bananas: 10, chocolate: 15}, 
  [{ name: 'A', inventory: { apple: 5 } }, 
  { name: 'B', inventory: { apple: 5, bananas: 7, chocolate: 10} },
  { name: 'C', inventory: { apple: 10, bananas: 4, chocolate: 20} }]))

  console.log(InventoryAllocator.getCheapestShipment({ apple: 1 }, 
    [{ name: 'owd', inventory: { apple: 0 } }]))

    console.log('asdf', )