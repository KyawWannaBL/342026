
import { createClient } from '@supabase/supabase-js'



// Replace with your FULL service_role key

const supabase = createClient(

  'https://dltavabvjwocknkyvwgz.supabase.co',

  'sb_secret_Wr-SMTiANhrvVtJINib02A_w6vE9ccj' 

)



const targetEmail = 'sainyanhtun82@gmail.com';



async function syncAdmin() {

  console.log(`Searching for ${targetEmail} in the current project...`);

  

  // 1. List all users to find the correct ID for THIS project

  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();

  

  if (listError) return console.error("🚨 Connection Error:", listError.message);



  const user = users.find(u => u.email === targetEmail);



  if (!user) {

    return console.error(`❌ User ${targetEmail} not found. Please create them in the Dashboard first.`);

  }



  // 2. Update the user found in THIS project

  const { data, error } = await supabase.auth.admin.updateUserById(

    user.id,

    { 

      user_metadata: { role: 'admin', full_name: 'Sain Yan Htun' } 

    }

  );



  if (error) console.error("❌ Update Failed:", error.message);

  else console.log(`✅ Success! ${targetEmail} is now an Admin (ID: ${user.id})`);

}



syncAdmin();

