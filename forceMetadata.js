
import { createClient } from '@supabase/supabase-js'



const supabase = createClient(

  'https://dltavabvjwocknkyvwgz.supabase.co',

  'sb_secret_Wr-SMTiANhrvVtJINib02A_w6vE9ccj' 

)



async function updateSain() {

  const { data, error } = await supabase.auth.admin.updateUserById(

    '094c4bb4-2858-4fbe-bd0b-c6befde46811',

    { user_metadata: { role: 'admin', full_name: 'Sain Yan Htun' } }

  );



  if (error) console.error("🚨 still blocked:", error.message);

  else console.log("✅ Metadata injected successfully!");

}



updateSain();

