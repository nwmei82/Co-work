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

export async function getReviews(id){
  const {data,error} = await supabase
    .from('reviews')
    .select(`
      *,
      user_id(*)
    `)
    .eq('shop_id',id)
  if(error){
    console.log("getReviews error ", error);
  }
  return data;
}

export async function addBookmark(uid,id) {
  const { data,error } = await supabase
  .from('user_bookmarks')
  .insert([
    { user_id: uid, shop_id: id },
  ])
  if(error){
    console.log("error at addBookmark", error)
  }
  return data;
}

export async function deleteBookmark(uid,id) {
  const { error } = await supabase
    .from('user_bookmarks')
    .delete()
    .eq('user_id', uid)
    .eq('shop_id', id)
  if(error){
    console.log("error at deleteBookmark")
  }
}

export async function getBookmark(uid){
  const { data: user_bookmarks, error } = await supabase
  .from('user_bookmarks')
  .select('*')
  

}