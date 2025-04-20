const alumniGrid = document.getElementById("alumniGrid");
const searchInput = document.getElementById("searchInput");
const batchFilter = document.getElementById("batchFilter");

let alumniList = [];

// Fetch alumni from Supabase on page load
window.onload = async () => {
  try {
    const { data, error } = await supabase
      .from("alumni")
      .select("*");

    if (error) {
      console.error("Error fetching alumni:", error.message);
      alumniGrid.innerHTML = "<p>Failed to load alumni data.</p>";
      return;
    }

    alumniList = data;
    renderAlumni(alumniList);
  } catch (err) {
    console.error("Unexpected error:", err);
    alumniGrid.innerHTML = "<p>Something went wrong.</p>";
  }
};

// Render alumni cards
function renderAlumni(list) {
  alumniGrid.innerHTML = "";

  if (list.length === 0) {
    alumniGrid.innerHTML = "<p>No alumni found.</p>";
    return;
  }

  list.forEach(alumni => {
    const card = document.createElement("div");
    card.className = "alumni-card";

    card.innerHTML = `
      <img src="${alumni.profileImageUrl || 'https://via.placeholder.com/300x180?text=No+Image'}" alt="${alumni.name}" />
      <h4>${alumni.name}</h4>
      <p><strong>Batch:</strong> ${alumni.batch}</p>
      <p><strong>College:</strong> ${alumni.college}</p>
      <p><strong>Department:</strong> ${alumni.department}</p>
      <p><strong>Profession:</strong> ${alumni.profession}</p>
      <p><strong>Location:</strong> ${alumni.location}</p>
    `;

    alumniGrid.appendChild(card);
  });
}

// Search and filter
function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedBatch = batchFilter.value;
    const selectedCollege = document.getElementById("collegeFilter").value;
    const selectedDept = document.getElementById("departmentFilter").value;
    const selectedLoc = document.getElementById("locationFilter").value;
    const sortBy = document.getElementById("sortFilter").value;
  
    const filtered = alumniList.filter(alumni => {
      // 🧠 Search across all major fields
      const searchableFields = [
        alumni.name,
        alumni.profession,
        alumni.batch,
        alumni.college,
        alumni.department,
        alumni.location
      ];
  
      const matchSearch = searchableFields.some(field =>
        field?.toLowerCase().includes(searchTerm)
      );
  
      const matchBatch = selectedBatch ? alumni.batch === selectedBatch : true;
      const matchCollege = selectedCollege ? alumni.college === selectedCollege : true;
      const matchDept = selectedDept ? alumni.department === selectedDept : true;
      const matchLoc = selectedLoc ? alumni.location === selectedLoc : true;
  
      return matchSearch && matchBatch && matchCollege && matchDept && matchLoc;
    });
  
        // Sorting logic
    if (sortBy === "name-asc") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "batch-newest") {
        filtered.sort((a, b) => b.batch.localeCompare(a.batch));
    } else if (sortBy === "batch-oldest") {
        filtered.sort((a, b) => a.batch.localeCompare(b.batch));
    } else if (sortBy === "profession-asc") {
        filtered.sort((a, b) => a.profession.localeCompare(b.profession));
    } else if (sortBy === "profession-desc") {
        filtered.sort((a, b) => b.profession.localeCompare(a.profession));
    } else if (sortBy === "college-asc") {
        filtered.sort((a, b) => a.college.localeCompare(b.college));
    } else if (sortBy === "college-desc") {
        filtered.sort((a, b) => b.college.localeCompare(a.college));
    } else if (sortBy === "department-asc") {
        filtered.sort((a, b) => a.department.localeCompare(b.department));
    } else if (sortBy === "department-desc") {
        filtered.sort((a, b) => b.department.localeCompare(a.department));
    } else if (sortBy === "location-asc") {
        filtered.sort((a, b) => a.location.localeCompare(b.location));
    } else if (sortBy === "location-desc") {
        filtered.sort((a, b) => b.location.localeCompare(a.location));
    }
    
    
    renderAlumni(filtered);
  }
  
  
  


  searchInput.addEventListener("input", applyFilters);
  batchFilter.addEventListener("change", applyFilters);
  document.getElementById("collegeFilter").addEventListener("change", applyFilters);
  document.getElementById("departmentFilter").addEventListener("change", applyFilters);
  document.getElementById("locationFilter").addEventListener("change", applyFilters);
  document.getElementById("sortFilter").addEventListener("change", applyFilters);
  
