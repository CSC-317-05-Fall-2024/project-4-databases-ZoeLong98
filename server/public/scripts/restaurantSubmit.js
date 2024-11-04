const handleSubmit = async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Extract fields from the form
  const form = event.target;
  const formData = new FormData(form);
  const restaurantData = {
    name: formData.get("name"),
    phone: formData.get("address"),
    address: formData.get("address"),
    photo: formData.get("address"),
  };

  try {
    // use await to ensure the response is resolved before jumping to other page
    const response = await fetch("/api/restaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restaurantData),
    });

    if (response.ok) {
      // Navigate to the restaurants page
      window.location.href = "/restaurants";
    } else {
      console.error("Failed to create restaurant");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("restaurant-form");
  form.addEventListener("submit", handleSubmit);
});
