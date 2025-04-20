import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Replace with your credentials
const supabaseUrl = 'https://pxgeekvsjpnlwdwazovp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4Z2Vla3ZzanBubHdkd2F6b3ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNzg0OTUsImV4cCI6MjA2MDY1NDQ5NX0.ceDHVTlEVbesXXVBsFJOrp6VmWjxPav1PWUAijCmZks';
const supabase = createClient(supabaseUrl, supabaseKey);

const dropdown = document.getElementById('userSelect');
const card = document.getElementById('profileCard');

// 1. Fetch all alumni names for dropdown
async function loadAlumniNames() {
  const { data, error } = await supabase
    .from('alumni')
    .select('id, name')
    .order('name', { ascending: true });

  if (data) {
    data.forEach(user => {
      const opt = document.createElement('option');
      opt.value = user.id;
      opt.textContent = user.name;
      dropdown.appendChild(opt);
    });
  } else {
    console.error(error.message);
  }
}

// 2. Fetch profile on selection
dropdown.addEventListener('change', async (e) => {
  const selectedId = e.target.value;

  const { data, error } = await supabase
    .from('alumni')
    .select('*')
    .eq('id', selectedId)
    .single();

  if (data) {
    card.style.display = 'block';
    document.getElementById('pname').textContent = data.name;
    document.getElementById('pbatch').textContent = data.batch;
    document.getElementById('pcollege').textContent = data.college;
    document.getElementById('pdepartment').textContent = data.department;
    document.getElementById('pprofession').textContent = data.profession;
    document.getElementById('plocation').textContent = data.location;
    document.getElementById('pachievement').textContent = data.achievements;
    document.getElementById('pimage').src = data.profileImageUrl || '';
  } else {
    console.error(error.message);
    alert('Profile not found!');
  }
});

loadAlumniNames();
