const newFormHandler = async (event) => {
<<<<<<< HEAD
    event.preventDefault();
    const comment = document.querySelector("#comment-text").value.trim();
    const review_id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
    console.log("comment------>", comment, review_id);
    if (comment) {
      const Comment = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ comment, review_id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (Comment.ok) {
        document.location.reload();
      } else {
        alert("Failed to create comment");
      }
    }
  };
  document
    .querySelector(".new-comment-form")
    .addEventListener("submit", newFormHandler);
=======
  event.preventDefault();

  const comment = document.querySelector("#comment-text").value.trim();
  const review_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  console.log("comment------>", comment, review_id);
  if (comment) {
    const Comment = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ comment, review_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (Comment.ok) {
      document.location.reload();
    } else {
      alert("Failed to create comment");
    }
  }
};

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", newFormHandler);
>>>>>>> 774b3e66250ba7fe2db0bd869b20f66fd17854e7
