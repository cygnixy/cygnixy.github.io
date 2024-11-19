document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    menuToggle.addEventListener("click", () => {
        // Toggle visibility of the Flyout menu
        mobileMenu.classList.toggle("hidden");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
        if (!menuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.add("hidden");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const name = String.fromCharCode(99, 111, 110, 116, 97, 99, 116);
    const domain = String.fromCharCode(99, 121, 103, 110, 105, 120, 121, 46, 99, 111, 109);
    const emailLink = `<a href="mailto:${name}@${domain}" class="text-blue-400 hover:underline">${name}@${domain}</a>`;
    document.getElementById("email").innerHTML = emailLink;
});

document.querySelectorAll("#download-btn, #free-download").forEach((element) => {
    element.addEventListener("click", async (event) => {
        event.preventDefault();

        try {
            const jsonUrl = "https://cygnixy-update.s3.eu-central-1.amazonaws.com/latest.json";

            const response = await fetch(jsonUrl);
            const data = await response.json();
            const downloadUrl = data.platforms["windows-x86_64"].url;

            const tempLink = document.createElement("a");
            tempLink.href = downloadUrl;
            tempLink.download = "";
            tempLink.style.display = "none";
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
        } catch (error) {
            console.error("Error fetching or downloading the file:", error);
            alert("Failed to download. Please try again later.");
        }
    });
});
