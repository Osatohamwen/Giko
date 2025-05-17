document.addEventListener('DOMContentLoaded', function () {

    function toggleDescription(service) {
        const text = document.getElementById(service + '-text');
        const button = document.querySelector(`#${service} .read-more`);

        // Toggle visibility of the full description
        if (text.style.maxHeight === "none") {
            text.style.maxHeight = "100px"; // Collapse the description
            button.textContent = "Read More";
        } else {
            text.style.maxHeight = "none"; // Expand the description
            button.textContent = "Read Less";
        }
    }
    // Add event listener for collapsible buttons
    document.querySelectorAll(".collapsible").forEach(button => {
        button.addEventListener("click", function () {
            // Toggle the active class to rotate the arrow
            this.classList.toggle("active");

            // Get the content of the clicked button
            const content = this.nextElementSibling;

            // Collapse other open lists
            document.querySelectorAll(".content").forEach(otherContent => {
                if (otherContent !== content) {
                    otherContent.style.maxHeight = null;
                    otherContent.previousElementSibling.classList.remove("active");
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

})