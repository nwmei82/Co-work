import { supabase } from "./supabase";

export async function getAllShops() {
  const { data, error } = await supabase
    .from('shops')
    .select(`
      *,
      shop_detail_id (*)
    `); 

  if (error) {
    console.error("Fetch error:", error);
    throw error;
  }
  return data;
}

export async function getShopById(id) {
  const { data, error } = await supabase
    .from('shops')
    .select(`
      *,
      shop_detail_id (*)
    `)
    .eq('shop_id', id);

  if (error) {
    console.error("Fetch error:", error);
    throw error;
  }
  return data;
}
