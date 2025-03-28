document.addEventListener("DOMContentLoaded", () => {
  let counter = document.getElementById("counter");
  let count = 0;
  let isPaused = false;
  let interval = setInterval(incrementCounter, 1000);

  function incrementCounter() {
    if (!isPaused) {
      count++;
      counter.textContent = count;
    }
  }

  document.getElementById("plus").addEventListener("click", () => {
    count++;
    counter.textContent = count;
  });

  document.getElementById("minus").addEventListener("click", () => {
    count--;
    counter.textContent = count;
  });

  document.getElementById("heart").addEventListener("click", () => {
    const likesList = document.querySelector(".likes");
    let existingLike = document.getElementById(`like-${count}`);

    if (existingLike) {
      let likeCount = parseInt(existingLike.dataset.count);
      likeCount++;
      existingLike.dataset.count = likeCount;
      existingLike.textContent = `${count} has been liked ${likeCount} times`;
    } else {
      let newLike = document.createElement("li");
      newLike.id = `like-${count}`;
      newLike.dataset.count = 1;
      newLike.textContent = `${count} has been liked 1 time`;
      likesList.appendChild(newLike);
    }
  });

  document.getElementById("pause").addEventListener("click", (event) => {
    isPaused = !isPaused;
    if (isPaused) {
      clearInterval(interval);
      event.target.textContent = "resume";
      disableButtons(true);
    } else {
      interval = setInterval(incrementCounter, 1000);
      event.target.textContent = "pause";
      disableButtons(false);
    }
  });

  function disableButtons(disable) {
    document.getElementById("plus").disabled = disable;
    document.getElementById("minus").disabled = disable;
    document.getElementById("heart").disabled = disable;
    document.getElementById("submit").disabled = disable;
  }

  document
    .getElementById("comment-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const commentInput = document.getElementById("comment-input");
      const commentText = commentInput.value.trim();

      if (commentText !== "") {
        const commentList = document.getElementById("list");
        const newComment = document.createElement("p");
        newComment.textContent = commentText;
        commentList.appendChild(newComment);
        commentInput.value = "";
      }
    });
});
