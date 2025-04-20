const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

let currentUser = null;

document.addEventListener("DOMContentLoaded", () => {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "login.html";
    } else {
      currentUser = user;
      loadUserData();
    }
  });

  // Upload profile pic
  document.getElementById("profileUpload").addEventListener("change", async (e) => {
    const file = e.target.files[0];
    const ref = storage.ref(`profiles/${currentUser.uid}/profile.jpg`);
    await ref.put(file);
    const url = await ref.getDownloadURL();
    await db.collection("users").doc(currentUser.uid).update({ profileImage: url });
    document.getElementById("profileImage").src = url;
  });

  // Upload header image
  document.getElementById("headerUpload").addEventListener("change", async (e) => {
    const file = e.target.files[0];
    const ref = storage.ref(`profiles/${currentUser.uid}/header.jpg`);
    await ref.put(file);
    const url = await ref.getDownloadURL();
    await db.collection("users").doc(currentUser.uid).update({ headerImage: url });
    document.getElementById("headerImage").src = url;
  });
});

// Load user profile from Firestore
async function loadUserData() {
  const doc = await db.collection("users").doc(currentUser.uid).get();
  const data = doc.data();

  document.getElementById("userName").innerText = data.name || currentUser.displayName || "User";
  document.getElementById("aboutInput").value = data.about || "";
  document.getElementById("batch").value = data.batch || "";
  document.getElementById("branch").value = data.branch || "";
  document.getElementById("jobTitle").value = data.jobTitle || "";
  document.getElementById("location").value = data.location || "";
  document.getElementById("profileImage").src = data.profileImage || "assets/images/default-profile.png";
  document.getElementById("headerImage").src = data.headerImage || "assets/images/default-header.jpg";

  // Load achievements
  const achievementsList = document.getElementById("achievementsList");
  achievementsList.innerHTML = "";
  (data.achievements || []).forEach((achv) => {
    const li = document.createElement("li");
    li.textContent = achv;
    achievementsList.appendChild(li);
  });

  // Show resume link
  if (data.resumeUrl) {
    document.getElementById("resumeLink").innerHTML = `<a href="${data.resumeUrl}" target="_blank">View Resume</a>`;
  }
}

// Save About section
async function saveAbout() {
  const about = document.getElementById("aboutInput").value;
  await db.collection("users").doc(currentUser.uid).update({ about });
  alert("About updated!");
}

// Save Info section
async function saveInfo() {
  const batch = document.getElementById("batch").value;
  const branch = document.getElementById("branch").value;
  const jobTitle = document.getElementById("jobTitle").value;
  const location = document.getElementById("location").value;

  await db.collection("users").doc(currentUser.uid).update({
    batch,
    branch,
    jobTitle,
    location,
  });

  alert("Information updated!");
}

// Add Achievement
async function addAchievement() {
  const input = document.getElementById("newAchievement");
  const text = input.value.trim();
  if (text) {
    const userRef = db.collection("users").doc(currentUser.uid);
    await userRef.update({
      achievements: firebase.firestore.FieldValue.arrayUnion(text),
    });
    input.value = "";
    loadUserData();
  }
}

// Upload Resume
async function uploadResume() {
  const fileInput = document.getElementById("resumeUpload");
  const file = fileInput.files[0];
  if (!file || file.type !== "application/pdf") {
    alert("Please upload a valid PDF file.");
    return;
  }

  const ref = storage.ref(`resumes/${currentUser.uid}.pdf`);
  await ref.put(file);
  const url = await ref.getDownloadURL();
  await db.collection("users").doc(currentUser.uid).update({ resumeUrl: url });
  document.getElementById("resumeLink").innerHTML = `<a href="${url}" target="_blank">View Resume</a>`;
  alert("Resume uploaded!");
}
