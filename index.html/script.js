let currentUser = localStorage.getItem("user");

// On page load
window.onload = () => {
  if (currentUser) {
    document.getElementById("signupBox").classList.add("hidden");
    document.getElementById("blogBox").classList.remove("hidden");
  }
  loadBlogs();
};

// Sign Up
function signUp() {
  const username = document.getElementById("username").value.trim();
  if (!username) return alert("Enter username");

  localStorage.setItem("user", username);
  currentUser = username;

  document.getElementById("signupBox").classList.add("hidden");
  document.getElementById("blogBox").classList.remove("hidden");
}

// Add Blog
function addBlog() {
  const title = blogTitle.value;
  const content = blogContent.value;

  if (!title || !content) return alert("Fill all fields");

  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  blogs.unshift({
    user: currentUser,
    title,
    content,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("blogs", JSON.stringify(blogs));
  blogTitle.value = "";
  blogContent.value = "";

  loadBlogs();
}

// Load Blogs
function loadBlogs() {
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  const container = document.getElementById("blogs");
  container.innerHTML = "";

  blogs.forEach(blog => {
    container.innerHTML += `
      <div class="blog">
        <h3>${blog.title}</h3>
        <p>${blog.content}</p>
        <small>👤 ${blog.user} | ${blog.date}</small>
      </div>
    `;
  });
}