// Make sure supabase is already initialized in supabase.js

const postContentInput = document.getElementById("postContent");
const postList = document.getElementById("postList");

// Fetch posts on page load
window.onload = async () => {
  await loadPosts();
};

// Submit a new post
async function submitPost() {
  const content = postContentInput.value.trim();
  if (!content) return alert("Post cannot be empty!");

  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;
  const username = user.data.user?.email; // 👈 use email as username

  const { error } = await supabase.from("posts").insert([
    {
      userId,
      username,
      content,
      likes: 0
    }
  ]);

  if (error) {
    console.error("Error posting:", error.message);
    alert("Something went wrong.");
  } else {
    postContentInput.value = "";
    loadPosts();
  }
}

// Fetch and render posts
async function loadPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error.message);
    postList.innerHTML = "<p>Unable to load posts.</p>";
    return;
  }

  renderPosts(data);
}

// Render posts
function renderPosts(posts) {
  postList.innerHTML = "";
  posts.forEach((post) => {
    const card = document.createElement("div");
    card.className = "post-card";

    card.innerHTML = `
      <h4>${post.username}</h4>
      <p>${post.content}</p>
      <small>${new Date(post.created_at).toLocaleString()}</small>
      <div class="like-section">
        <button onclick="likePost('${post.id}', ${post.likes || 0})">👍 Like (${post.likes || 0})</button>
      </div>
    `;

    postList.appendChild(card);
  });
}

// Like a post
async function likePost(postId, currentLikes) {
  const { error } = await supabase
    .from("posts")
    .update({ likes: currentLikes + 1 })
    .eq("id", postId);

  if (error) {
    console.error("Error liking post:", error.message);
  } else {
    loadPosts();
  }
}
