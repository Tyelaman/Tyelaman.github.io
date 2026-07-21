function sendMail(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let status = document.getElementById("contactStatus");

    if (name === "" || email === "" || message === "") {
        status.innerHTML = "Please fill out all fields before sending.";
        return;
    }

    let subject = encodeURIComponent("Portfolio contact from " + name);
    let body = encodeURIComponent(
        "Name: " + name + "\n" +
        "Email: " + email + "\n\n" +
        message
    );

    status.innerHTML = "Opening your email app...";
    window.location.href = "mailto:tyelama@purdue.edu?subject=" + subject + "&body=" + body;
}
