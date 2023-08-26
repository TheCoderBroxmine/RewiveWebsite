document.addEventListener("DOMContentLoaded", function () {
    const commentForm = document.getElementById("commentForm");
    const commentsList = document.getElementById("comments");
    const storedComments = JSON.parse(localStorage.getItem("comments")) || [];

    // Display stored comments on page load
    storedComments.forEach((comment, index) => {
        const newComment = createCommentElement(comment.name, comment.comment, index);
        commentsList.appendChild(newComment);
    });

    commentForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const name = commentForm.name.value;
        const comment = commentForm.comment.value;

        if (name.trim() !== "" && comment.trim() !== "") {
            const newComment = createCommentElement(name, comment, storedComments.length);
            commentsList.appendChild(newComment);

            // Store comment in local storage
            storedComments.push({ name, comment });
            localStorage.setItem("comments", JSON.stringify(storedComments));

            commentForm.reset();
        }
    });

    function createCommentElement(name, comment, index) {
        const newComment = document.createElement("li");

        // Apply different styles to the submitted comment
        newComment.innerHTML = `
            <strong>${name}:</strong> <span class="submitted-comment">${comment}</span>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;

        const deleteButton = newComment.querySelector(".delete-btn");
        deleteButton.addEventListener("click", deleteComment);

        // Apply custom styles to the "Delete" button
        deleteButton.style.color = "red";
        deleteButton.style.fontWeight = "bold";

        return newComment;
    }

    function deleteComment(event) {
        const index = event.target.getAttribute("data-index");
        storedComments.splice(index, 1);
        localStorage.setItem("comments", JSON.stringify(storedComments));
        event.target.parentElement.remove();
    }
});
