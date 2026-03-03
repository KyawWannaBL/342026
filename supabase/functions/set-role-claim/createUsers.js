import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- CONFIGURATION ---
const SUPABASE_URL = "https://dltavabvjwocknkyvwgz.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsdGF2YWJ2andvY2tua3l2d2d6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTExMzE5NCwiZXhwIjoyMDg2Njg5MTk0fQ.ckX1XXGgKPzD3IBW6yG2iG2RGfkQXyjE9IQbQZMMymA";
const DEFAULT_PASSWORD = 'Britium@2026';

// --- SETUP ---
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Error: Missing API Keys.');
  process.exit(1);
}

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// --- HELPER: Load CSV ---
function loadUsersFromCSV() {
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const csvPath = path.join(__dirname, 'useraccount.csv');
    
    if (!fs.existsSync(csvPath)) {
      console.warn('⚠️ CSV file missing! Please ensure "useraccount.csv" is in the same folder.');
      return [];
    }

    let fileContent = fs.readFileSync(csvPath, 'utf-8');
    // REMOVE Byte Order Mark (BOM) if present (fixes common CSV reading errors)
    fileContent = fileContent.replace(/^\uFEFF/, '');

    return fileContent
      .split('\n')
      .map(line => line.trim())
      // Skip empty lines AND the header line (checking if line starts with "email")
      .filter(line => line.length > 0 && !line.toLowerCase().startsWith('email')) 
      .map(line => {
        const parts = line.split(',');
        
        // CSV Columns based on your file: 
        // 0: email
        // 1: full name
        // 2: role
        // 3: is active
        // 4: must change password (SKIP)
        // 5: is demo

        if (parts.length < 3) return null; // Skip invalid lines

        const email = parts[0]?.trim();
        const full_name = parts[1]?.trim(); 
        const role = parts[2]?.trim();      
        
        // Handle "TRUE" string or missing values
        const is_active = parts[3] ? parts[3].trim().toUpperCase() === 'TRUE' : true;
        const is_demo = parts[5] ? parts[5].trim().toUpperCase() === 'TRUE' : false;
        
        return { email, role, full_name, is_active, is_demo };
      })
      .filter(u => u && u.email && u.role); 
  } catch (err) {
    console.error('❌ Error reading CSV:', err.message);
    return [];
  }
}

// --- MAIN LOGIC ---
async function ensureUser({ email, role, full_name, is_active, is_demo }) {
  let userId;
  
  try {
    // 1. Check if user exists in Auth
    const { data: listData } = await supabaseAdmin.auth.admin.listUsers();
    const existing = listData.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());

    if (existing) {
      userId = existing.id;
      process.stdout.write(`.`); // Dot for existing users to reduce noise
    } else {
      // 2. Create Auth User
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password: DEFAULT_PASSWORD,
        email_confirm: true,
        user_metadata: { full_name, role }
      });

      if (error) throw error;
      userId = data.user.id;
      console.log(`\n✅ Created Auth: ${email}`);
    }

    // 3. Update Profile Data in Database
    const { error: upsertErr } = await supabaseAdmin
      .from('profiles')
      .upsert({
          id: userId,
          email,
          role,
          full_name,
          is_active,
          is_demo
      }, { onConflict: 'id' });

    if (upsertErr) {
      console.error(`\n❌ DB Error for ${email}: ${upsertErr.message}`);
    }
  } catch (err) {
    console.error(`\n❌ Failed ${email}: ${err.message}`);
  }
}

// --- RUN ---
async function main() {
  const users = loadUsersFromCSV();
  
  if (users.length === 0) {
    console.log('⚠️ No users found to process. Check your CSV formatting.');
    return;
  }

  console.log(`🚀 Found ${users.length} users. Starting process...`);
  
  for (const u of users) {
    await ensureUser(u);
  }
  console.log('\n🎉 Script finished.');
}

main();