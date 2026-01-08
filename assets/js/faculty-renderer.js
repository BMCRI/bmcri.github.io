// Global function to handle image loading errors
window.handleImageError = function (imgElement) {
    const fallbackDiv = document.createElement("div");
    fallbackDiv.className = "faculty-avatar";

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

    fallbackDiv.innerHTML = '<i class="fa-solid fa-user-doctor"></i>';

    if (imgElement && imgElement.parentNode) {
        imgElement.parentNode.replaceChild(fallbackDiv, imgElement);
    }
};

// UPDATED: Added 'folderPath' parameter (default is empty)
function renderFacultyTable(facultyData, tableBodyId = "faculty-table-body", folderPath = "") {
    const tableBody = document.getElementById(tableBodyId);

    if (!tableBody || !Array.isArray(facultyData)) return;

    tableBody.innerHTML = facultyData.map((member, index) => {
        let registrationInfo = "";

        if (member.ugReg && member.ugReg !== "-") {
            registrationInfo += `<span class="reg-label">UG:</span>${member.ugReg}`;
        }

        if (member.pgReg) {
            if (registrationInfo) registrationInfo += "<br>";
            registrationInfo += `<span class="reg-label">PG:</span>${member.pgReg}`;
        }

        // UPDATED: Prepend folderPath to the image src
        return `
            <tr>
                <td style="text-align:center;">${index + 1}</td>
                <td class="photo-col" style="text-align:center;">
                    <img 
                        src="${folderPath}${member.srno}.jpg" 
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