import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function test() {
  const { data, error } = await supabase.from("leads").insert({
    full_name: "Test",
    email: "test@example.com",
    website: "https://example.com",
    main_goal: "test",
    source: "test"
  });
  console.log("Error:", error);
  console.log("Data:", data);
}
test();
