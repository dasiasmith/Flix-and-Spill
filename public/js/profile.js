// Option to create a new Review
const newFormHandler = async (event) => {
  event.preventDefault();
  console.log("test");

  const title = document.querySelector("#review-title").value.trim();
  const review = document.querySelector("#review-content").value.trim();
  console.log(title);
  console.log(review);

  if (title && review) {
    const response = await fetch(`/api/reviews`, {
      method: "POST",
      body: JSON.stringify({ title, review }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create review");
    }
  }
};

const delButtonHandler = async (event) => {
  console.log("click work?");
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    console.log("get id------------>", id);
    const response = await fetch(`/api/reviews/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to delete review");
    }
  }
};

document
  .querySelector(".new-review-form")
  .addEventListener("submit", newFormHandler);

document
  .querySelector(".review-list")
  .addEventListener("click", delButtonHandler);
