// Global function to handle image loading errors
// Replaces broken images with a default "Doctor" icon avatar
window.handleImageError = function (imgElement) {
    // Create a replacement div
    const fallbackDiv = document.createElement("div");
    fallbackDiv.className = "faculty-avatar";

    // Apply styles to match the original circular avatar look
    Object.assign(fallbackDiv.style, {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "80px",
        height: "80px",
        minWidth: "80px",
        background: "rgba(59, 130, 246, 0.1)",
        color: "var(--primary, #3b82f6)",
        fontSize: "2.5rem",
        borderRadius: "50%",
        margin: "0 auto"
    });

    // Add the doctor icon
    fallbackDiv.innerHTML = '<i class="fa-solid fa-user-doctor"></i>';

    // Replace the broken image with the new div
    if (imgElement && imgElement.parentNode) {
        imgElement.parentNode.replaceChild(fallbackDiv, imgElement);
    }
};

// Function to render the faculty table based on JSON data
function renderFacultyTable(facultyData, tableBodyId = "faculty-table-body") {
    const tableBody = document.getElementById(tableBodyId);

    // clear execution if target doesn't exist or data is invalid
    if (!tableBody || !Array.isArray(facultyData)) return;

    // Map through data and create HTML rows
    tableBody.innerHTML = facultyData.map((member, index) => {
        let registrationInfo = "";

        // Format UG Registration
        if (member.ugReg && member.ugReg !== "-") {
            registrationInfo += `<span class="reg-label">UG:</span>${member.ugReg}`;
        }

        // Format PG Registration
        if (member.pgReg) {
            if (registrationInfo) registrationInfo += "<br>";
            registrationInfo += `<span class="reg-label">PG:</span>${member.pgReg}`;
        }

        // Return the table row HTML
        return `
            <tr>
                <td style="text-align:center;">${index + 1}</td>
                <td class="photo-col" style="text-align:center;">
                    <img 
                        src="${member.srno}.jpg" 
                        alt="${member.name}" 
                        class="faculty-avatar" 
                        style="object-fit:cover;" 
                        onerror="handleImageError(this)"
                    >
                </td>
                <td style="font-weight:600;color:var(--text-main);">${member.name}</td>
                <td>${member.designation}</td>
                <td>${member.qual}</td>
                <td style="line-height:1.6;">${registrationInfo || "-"}</td>
            </tr>
        `;
    }).join("");
}