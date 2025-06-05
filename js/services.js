document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll(".collapsible").forEach(button => {
        button.addEventListener("click", function () {
            // Toggle the active class to rotate the arrow
            this.classList.toggle("active");

            // Get the <ul class="content"> which is the sibling of the button's parent
            const content = this.parentElement.nextElementSibling;

            // Collapse other open lists
            document.querySelectorAll(".content").forEach(otherContent => {
                if (otherContent !== content) {
                    otherContent.style.maxHeight = null;
                    const otherButton = otherContent.previousElementSibling.querySelector('.collapsible');
                    if (otherButton) {
                        otherButton.classList.remove("active");
                    }
                }
            });

            // Toggle the maxHeight to show/hide the content
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
});
