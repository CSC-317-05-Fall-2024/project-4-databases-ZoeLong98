/* This file should contain definitions for deleteRestaurantCard,
    and js to attach it as a handler per card.
*/
document.addEventListener("DOMContentLoaded", function () {
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      // use event.target
      let restaurantId = event.target.id.split("-")[1];
      fetch(`/api/restaurants/${restaurantId}`, {
        method: "DELETE",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          location.reload();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  });
});
