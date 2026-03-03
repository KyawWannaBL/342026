
import { createClient } from '@supabase/supabase-js'



// Use your FULL 'service_role' key (sb_secret_...)

const supabase = createClient(

  'https://dltavabvjwocknkyvwgz.supabase.co',

  'sb_secret_Wr-SMTiANhrvVtJINib02A_w6vE9ccj' 

)



const email = 'sainyanhtun82@gmail.com';

const metadata = { role: 'admin', full_name: 'Sain Yan Htun' };



async function forceUpdate() {

  console.log("Attempting direct creation/overwrite...");

  

  // 1. Try to create the user directly

  const { data, error } = await supabase.auth.admin.createUser({

    email: email,

    password: 'Sh@nstar28',

    user_metadata: metadata,

    email_confirm: true

  });



  if (error) {

    if (error.message.includes("already exists")) {

      console.log("User exists. You MUST delete this user from the Dashboard manually to clear the 'Database Error' flag.");

    } else {

      console.error("🚨 Critical Error:", error.message);

    }

  } else {

    console.log("✅ Success! Sain Yan Htun created/updated directly.");

  }

}



forceUpdate();

