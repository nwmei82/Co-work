import { supabase } from './supabase.js';

export async function getAllUsers() {
  const { data, error } = await supabase.from('alluser').select('*');
  if (error) throw error;
  return data;
}

export async function checkSignIn(usernameIn, passwordIn) {
  const datas = await getAllUsers();

  const matchedUser = datas.find(data =>
    (data.username === usernameIn || data.email === usernameIn) &&
    data.password === passwordIn
  );

  if (matchedUser) {
    return matchedUser;
  } else {
    console.log("error checkSignIn")
    return null;
  }

}

export async function createUser(datas) {
  console.log(datas)
  const creating = await supabase
  .from('alluser')
  .insert([datas])
  .select();

if (creating.error) {
  console.error("Error creating user:", creating.error);
  return null;
}

return creating.data?.[0] || null;
}

export async function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        resolve({ lat, lng });
      },
      (err) => {
        console.error("Location error", err);
        reject(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

  });
}

export async function getUserById(id) {
  console.log("start back getUserById")
  const {data,error} = await supabase
    .from('alluser')
    .select('*')
    .eq('uid',id)
  if(error){
    console.log("error at getUserById")
  }
}