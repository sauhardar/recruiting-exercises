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
  static getCheapestShipment(order: Order, warehouses: Inventory ): WarehouseFulfillment[] {
    const remainingOrder = order;
    const output: WarehouseFulfillment[] = [];

    warehouses.forEach((warehouse) => {
      const { name: warehouseName, inventory } = warehouse;

      const warehouseFulfillment: WarehouseFulfillment = { [warehouseName]: {} };
      
      Object.keys(remainingOrder).map(function(itemName) {
        if (itemName in inventory && inventory[itemName] !== 0 && remainingOrder[itemName] > 0) {
          const itemsAdded: number = inventory[itemName] >= remainingOrder[itemName] 
          ? remainingOrder[itemName] : inventory[itemName];

          warehouseFulfillment[warehouseName][itemName] = itemsAdded

          remainingOrder[itemName] -= itemsAdded;

          if (remainingOrder[itemName] === 0) {
            delete remainingOrder[itemName]
          }
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