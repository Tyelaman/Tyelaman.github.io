function copyEmail() {
    let email = "tyelama@purdue.edu";
    let status = document.getElementById("copyStatus");

    navigator.clipboard.writeText(email).then(function() {
        status.innerHTML = "Email copied to clipboard.";
    }).catch(function() {
        status.innerHTML = "Copy failed. Email: " + email;
    });
}
