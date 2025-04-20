// Initialize Supabase client
const SUPABASE_URL = 'https://pxgeekvsjpnlwdwazovp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4Z2Vla3ZzanBubHdkd2F6b3ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNzg0OTUsImV4cCI6MjA2MDY1NDQ5NX0.ceDHVTlEVbesXXVBsFJOrp6VmWjxPav1PWUAijCmZks';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  const emailInput = document.getElementById('email');
  const pwInput = document.getElementById('password');

  // Login
  loginBtn.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = pwInput.value;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert('Login error: ' + error.message);
    } else {
      window.location.href = 'dashboard.html';
    }
  });

  // Sign up
  signupBtn.addEventListener('click', async () => {
    const name = nameInput.value;
    const email = emailInput.value;
    const password = pwInput.value;
    const cpassword = cpwInput.value;
    const { error } = await supabase.auth.signUp({ name, email, password, cpassword });
    if (error) {
      alert('Signup error: ' + error.message);
    } else {
      alert('Signup successful! Please check your email for verification.');
    }
  });
});