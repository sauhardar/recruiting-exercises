// TYPES

/**
 * An order, what Deliverr receives from the customer. Represents the items available and
 * at what quantity.
 */
type Order = {
  [key: string]: number;
}

/**
 * What a single warehouse may have in storage.
 */
type Inventory = {
  name: string;
  inventory: Order;
}[]

/**
 * Instructions for how a given order should be fulfilled.
 */
type WarehouseFulfillment = {
  [warehouseName: string]: Order;
}

/**
 * Describes how to distribute orders across the available warehouses.
 */
class InventoryAllocator {
  /**
   * Which items should be shipped from which warehouse given the order and available resources.
   * @param order The requirements from the customer.
   * @param inventory What is current in stock and where.
   */
  static getCheapestShipment(order: Order, warehouses: Inventory): WarehouseFulfillment[] {
    const output: WarehouseFulfillment[] = [];
    const warehouseOrders: { [warehouseName: string]: Order} = {};

    Object.keys(order).forEach((orderItem) => {
      let remainingItemAmount = order[orderItem];
      let bestItemFulfillment: { warehouseName: string, amount: number }[] = [];

      for (let i = 0; i < warehouses.length; i += 1) {
        const { name, inventory } = warehouses[i];
        const amountAvailable = inventory[orderItem];
        const amountNecessary = order[orderItem];

        if (orderItem in inventory && amountAvailable >= amountNecessary) {
          bestItemFulfillment = [{ warehouseName: name, amount: order[orderItem] }];
          remainingItemAmount = 0;
          break;
        } else {
          const amountToAdd = remainingItemAmount - inventory[orderItem] <= 0
            ? remainingItemAmount : inventory[orderItem];

          if (amountToAdd && amountToAdd !== 0) {
            bestItemFulfillment.push({ warehouseName: name, amount: amountToAdd });
            remainingItemAmount -= amountToAdd;
          }
        }
      }

      if (remainingItemAmount === 0) {
        bestItemFulfillment.forEach((fulfillment) => {
          const { warehouseName, amount } = fulfillment;
          warehouseOrders[warehouseName] = {
            ...warehouseOrders[warehouseName],
            [orderItem]: amount,
          };
        });
      }
    });

    Object.keys(warehouseOrders).forEach((warehouseName) => {
      output.push({ [warehouseName]: warehouseOrders[warehouseName] });
    });

    return output;
  }
}

export default InventoryAllocator;
