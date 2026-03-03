
import { createClient } from '@supabase/supabase-js'



// IMPORTANT: Go to Supabase > Settings > API and copy the 'service_role' (secret) key

const supabase = createClient(

  'https://dltavabvjwocknkyvwgz.supabase.co',

  'sb_secret_Wr-SMTiANhrvVtJINib02A_w6vE9ccj' 

)



const email = 'rider_ygn0001@britiumexpress.com';

const password = 'P@ssw0rd1';

const metadata = { role: 'rider', full_name: 'Britium Rider' };



async function runUpdate() {

  console.log(`Checking for user: ${email}...`);

  

  // Try to find the user first

  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();

  

  if (listError) {

    return console.error("🚨 Database/Auth Error:", listError.message);

  }



  const existingUser = users.find(u => u.email === email);



  if (existingUser) {

    // Update existing user

    const { error: updateError } = await supabase.auth.admin.updateUserById(

      existingUser.id,

      { password, user_metadata: metadata }

    );

    if (updateError) console.error("❌ Update failed:", updateError.message);

    else console.log("✅ Success! Rider password and role updated.");

  } else {

    // Create new user if they don't exist in this specific project

    const { error: createError } = await supabase.auth.admin.createUser({

      email,

      password,

      user_metadata: metadata,

      email_confirm: true

    });

    if (createError) console.error("❌ Creation failed:", createError.message);

    else console.log("✅ Success! New Rider created with Password and Role.");

  }

}



runUpdate();

