import { items as staticItems } from "@/data/items";

export const getStoredItems = () => {
  if (typeof window === "undefined") return staticItems;
  const stored = localStorage.getItem("luxe_items_v4");
  if (!stored) {
    localStorage.setItem("luxe_items_v4", JSON.stringify(staticItems));
    return staticItems;
  }
  
  const parsed = JSON.parse(stored);
  
  const staticMap = new Map(staticItems.map(item => [item.id, item]));
  const updatedItems = parsed.map(item => {
    if (staticMap.has(item.id)) {
      return staticMap.get(item.id);
    }
    return item;
  });

  const storedMap = new Map(parsed.map(item => [item.id, item]));
  const missingStaticItems = staticItems.filter(item => !storedMap.has(item.id));
  
  const finalItems = [...updatedItems, ...missingStaticItems];
  
  localStorage.setItem("luxe_items_v4", JSON.stringify(finalItems));
  
  return finalItems;
};

export const saveItem = (item) => {
  const items = getStoredItems();
  const newItems = [item, ...items];
  localStorage.setItem("luxe_items_v4", JSON.stringify(newItems));
  return newItems;
};

export const deleteStoredItem = (id) => {
  const items = getStoredItems();
  const newItems = items.filter(item => item.id !== id);
  localStorage.setItem("luxe_items_v4", JSON.stringify(newItems));
  return newItems;
};

export const getWishlist = () => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("luxe_wishlist");
  return stored ? JSON.parse(stored) : [];
};

export const toggleWishlist = (id) => {
  const wishlist = getWishlist();
  const isWishlisted = wishlist.includes(id);
  let newWishlist;
  
  if (isWishlisted) {
    newWishlist = wishlist.filter(itemId => itemId !== id);
  } else {
    newWishlist = [...wishlist, id];
  }
  
  localStorage.setItem("luxe_wishlist", JSON.stringify(newWishlist));
  return newWishlist;
};
