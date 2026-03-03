
import { createClient } from '@supabase/supabase-js'



// CRITICAL: Ensure this is the 'service_role' key, NOT the 'anon' key

const supabase = createClient(

  'https://dltavabvjwocknkyvwgz.supabase.co',

  'sb_secret_Wr-SMTiANhrvVtJINib02A_w6vE9ccj' 

)



const riderEmail = 'rider_ygn0001@britiumexpress.com';



async function forceUpdate() {

  console.log("Connecting to Database...");

  

  // 1. Get all users to find the correct internal ID for this project

  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();

  

  if (listError) return console.error("🚨 Database Connection Failed:", listError.message);



  const user = users.find(u => u.email === riderEmail);



  if (user) {

    // 2. Update the existing user in this project

    const { error: updateError } = await supabase.auth.admin.updateUserById(

      user.id,

      { 

        password: 'P@ssw0rd1',

        user_metadata: { role: 'rider', full_name: 'Britium Rider' } 

      }

    );

    if (updateError) console.error("❌ Update Error:", updateError.message);

    else console.log("✅ Success: Rider updated in the database.");

  } else {

    // 3. Create the user if they don't exist in this project yet

    const { error: createError } = await supabase.auth.admin.createUser({

      email: riderEmail,

      password: 'P@ssw0rd1',

      user_metadata: { role: 'rider', full_name: 'Britium Rider' },

      email_confirm: true

    });

    if (createError) console.error("❌ Creation Error:", createError.message);

    else console.log("✅ Success: New Rider created in the database.");

  }

}



forceUpdate();

