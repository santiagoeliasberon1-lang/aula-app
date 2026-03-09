import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ndesugkxeipdizasdria.supabase.co'
const SUPABASE_KEY = 'sb_publishable_njxLK822uHJ2QZjt-HCSWw_rnILQCQL'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)