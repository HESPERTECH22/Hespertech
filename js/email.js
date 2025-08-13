// made by Underemployed 24-06-2025
// pls add how many hours u wasted on this appscript
// total = 8
// i was bored

const headers = {
    emailSheet: ["Name", "Email", "Subject", "Body", "Date", "Time"],
    error: ["Date", "Error Message"]
};

// const mygmail = getColumn('CONFIG', 'Email')[0]; // getting variables from sheet
const mygmail = Session.getActiveUser().getEmail();
const sheetName = "Sheet1";

// just for like knowing which excel
const url = "https://docs.google.com/spreadsheets/d/1acQ7qOlcUXHxdZ1QxOwBkcVVMxc_KsTtXM1jzh4LGYQ/edit?gid=0#gid=0"



function testEmailTemplatesSendToSelf() {
    const testName = "john doe";
    const testEmail = "johndoe@example.com";
    const testSubject = "Product Inquiry";
    const testMessage = "I would like to know more about your product pricing and availability.";

    const clientHTML = createClientEmailTemplate(testName, testSubject, testMessage, testEmail);
    const inboxHTML = createInboxEmailTemplate(testName, testSubject, testMessage, testEmail);

    const myEmail = Session.getActiveUser().getEmail();

    // Send the "client" styled email
    // MailApp.sendEmail({
    //   to: myEmail,
    //   subject: "We will contact you soon",
    //   htmlBody: clientHTML
    // });

    // Send the "inbox" styled email
    MailApp.sendEmail({
        to: myEmail,
        subject: "idk d.",
        htmlBody: inboxHTML
    });
}









function createSuccessResponse() {
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
        .setMimeType(ContentService.MimeType.JSON);
}

function createErrorResponse(err) {
    let errorSheet = selectOrCreateSheet("Errors");
    let dateTime = new Date();
    let errorInfo = [dateTime.toLocaleString(), err.message];
    if (errorSheet.getLastRow() === 0) errorSheet.appendRow(headers.error);
    errorSheet.appendRow(errorInfo);
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": err.message }))
        .setMimeType(ContentService.MimeType.JSON);
}

// Function to get a column from a sheet with trimming
function getColumn(sheetName, column, url = null) {
    // let sheet = selectOrCreateSheet(sheetName, url);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    // Normalize headers by trimming and lowering case
    const lowerHeaders = headers.map(header => header.toString().trim().toLowerCase());
    const lowerColumn = column.trim().toLowerCase();
    const columnIndex = lowerHeaders.indexOf(lowerColumn);

    if (columnIndex === -1) {
        throw new Error(`Header "${column}" not found in sheet "${sheetName}"`);
    }

    const columnValues = sheet.getRange(2, columnIndex + 1, sheet.getLastRow() - 1, 1).getValues();
    const flattenedValues = columnValues.map(row => row[0]?.toString().trim() ?? '');

    return flattenedValues;
}

function createClientEmailTemplate(name, subject, body, email) {

    name = name.replace(/\b(\w)/g, (s) => s.toUpperCase());

    return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You - HesperTech</title>
</head>

<body>
    <div style="height:0px;max-height:0;width:0px;overflow:hidden;opacity:0">This is a copy of the inquiry you send us. Please don't reply...</div>
    <div style="height:0px;max-height:0;width:0px;overflow:hidden;opacity:0"> ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; </div>
    <div style="margin:0px;width:100%;background-color:#f3f2f0;padding:0px;padding-top:8px;font-family:-apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue','Fira Sans',Ubuntu,Oxygen,'Oxygen Sans',Cantarell,'Droid Sans','Apple Color Emoji','Segoe UI Emoji','Segoe UI Emoji','Segoe UI Symbol','Lucida Grande',Helvetica,Arial,sans-serif">
        <table role="presentation" valign="top" border="0" cellspacing="0" cellpadding="0" width="512" align="center" style="margin-left:auto;margin-right:auto;margin-top:0px;margin-bottom:0px;width:512px;max-width:512px;padding:0px">
            <tbody>
                <tr>
                    <td>
                        <table role="presentation" valign="top" border="0" cellspacing="0" cellpadding="0" width="100%" style="background-color:#ffffff">
                            <tbody>
                                <tr>
                                    <td style="padding:24px;text-align:center">
                                        <table role="presentation" valign="top" border="0" cellspacing="0" cellpadding="0" width="100%" style="min-width:100%">
                                            <tbody>
                                                <tr>
                                                    <td align="left" valign="middle">
                                                        <a href="https://hespertech.in/" style="color:#0a66c2;display:inline-block;text-decoration:none;width:120px" target="_blank">
                                                            <img alt="HesperTech" src="https://rimanoble04.github.io/Hespertech/img/logo/hespertech-logo-min.png" style="outline:none;text-decoration:none;height:80px;width:auto">
                                                        </a>
                                                    </td>
                                                    <td valign="middle" align="right">
                                                        <span style="color:#666;font-size:14px;font-weight:500;">hespertech.in</span>
                                                        </td>
                   
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-left:24px;padding-right:24px;padding-bottom:24px">
                                        <div>
                                            <table role="presentation" valign="top" border="0" cellspacing="0" cellpadding="0" width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <table role="presentation" valign="top" border="0" cellspacing="0" cellpadding="0" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <p style="margin:0;font-weight:400;font-size:16px;line-height:1.5">
                                                                              Hi ${(name || "Client").split(" ")[0]},
                                                                            </p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="padding-top:24px">
                                                                            <p style="margin:0;font-weight:400;font-size:16px;line-height:1.5">
                                                                                Thank you for reaching out to us through
                                                                                <strong>hespertech.in</strong>. We have
                                                                                successfully received your inquiry and
                                                                                our team is reviewing it.</p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="padding-top:24px">
                                                                            <p style="margin:0;font-weight:400;font-size:16px;line-height:1.5">
                                                                                <strong>We will get back to you
                                                                                    shortly.</strong> Here is a copy of your query
                                                                                for your reference:</p>
                                                                            <p></p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="padding-top:24px">
                                                                            <div style="background-color:#f8f9fa;padding:20px;border-radius:8px;border-left:4px solid #0a66c2;">
                                                                                <p style="margin:0;font-weight:400;font-size:15px;line-height:1.6;color:#333;">
                                                                                    <strong>Name:</strong> ${name}<br>
                                                                                    <strong>Email:</strong> ${email}<br>
                                                                                    <strong>Subject:</strong> ${subject}
                                                                                </p>
                                                                                <p style="margin:16px 0 0 0;font-weight:400;font-size:15px;line-height:1.6;color:#333;">
                                                                                    <strong>Message:</strong><br>
                                                                                    ${body}
                                                                                </p>
                                                                            </div>
                                                                            </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="padding-top:24px">
                                                                            <p style="margin:0;font-weight:400;font-size:16px;line-height:1.5">
                                                                                Our typical response time is
                                                                                <strong>24-48 hours</strong>.
                                                                        </p></td>
                                                                    </tr>
                                                                    <tr>
                                                                 
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="padding-top:24px">
                                                                            <p style="margin:0;font-weight:400;font-size:16px;line-height:1.5">
                                                                                Thank you for considering HesperTech for
                                                                                your project needs.<br>
                                                                                <strong>The HesperTech Team</strong>
                                                                            </p>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="background-color:#f3f2f0;padding:24px">
 
                                        <table role="presentation" valign="top" border="0" cellspacing="0" cellpadding="0" width="100%" style="font-size:12px">
                                            <tbody>
                                                <tr>
                                                    <td style="margin:0px;padding-bottom:8px;color:#666;">
                                                        This email was sent from HesperTech Pvt Ltd in response to your
                                                        inquiry through our website.
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="margin:0px;padding-bottom:8px;color:#666;">
                                                        <strong>CIN:</strong> U72900KL2022PTC076964 |
                                                        <strong>DIPP:</strong> 109220
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="margin:0px;padding-bottom:8px;color:#666;">
                                                        You are receiving this email because you contacted us through
                                                        hespertech.in
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-bottom:8px">
                                                        <a href="https://hespertech.in/" style="color:#0a66c2;display:inline-block;text-decoration:none">
                                                            <span style="font-weight:bold;font-size:14px;color:#0a66c2;">HesperTech</span>
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="color:#666;">
                                                        © 2025 HesperTech Pvt Ltd, Thiruvananthapuram, Kerala, India.
                                                        <span>All rights reserved.</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>
    `.trim();

}


function createInboxEmailTemplate(name, subject, body, email) {
    name = name.replace(/\b(\w)/g, (s) => s.toUpperCase());

    return `

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Client Inquiry - HesperTech</title>
</head>
<body>
    <div style="height:0px;max-height:0;width:0px;overflow:hidden;opacity:0">${body}</div>
    <div style="height:0px;max-height:0;width:0px;overflow:hidden;opacity:0"> ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; ͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp;͏&nbsp; </div>
    <div
        style="margin:0px;width:100%;background-color:#f3f2f0;padding:0px;padding-top:8px;font-family:-apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue','Fira Sans',Ubuntu,Oxygen,'Oxygen Sans',Cantarell,'Droid Sans','Apple Color Emoji','Segoe UI Emoji','Segoe UI Emoji','Segoe UI Symbol','Lucida Grande',Helvetica,Arial,sans-serif">
        <table role="presentation" valign="top" border="0" cellspacing="0" cellpadding="0" width="512" align="center"
            style="margin-left:auto;margin-right:auto;margin-top:0px;margin-bottom:0px;width:512px;max-width:512px;padding:0px">
            <tbody>
                <tr>
                    <td>
                        <table role="presentation" valign="top" border="0" cellspacing="0" cellpadding="0" width="100%"
                            style="background-color:#ffffff">
                            <tbody>
                                <tr>
                                    <td style="padding:24px;text-align:center">
                                        <table role="presentation" valign="top" border="0" cellspacing="0"
                                            cellpadding="0" width="100%" style="min-width:100%">
                                            <tbody>
                                                <tr>
                                                    <td align="left" valign="middle">
                                                        <a href="https://hespertech.in/"
                                                            style="color:#0a66c2;display:inline-block;text-decoration:none;width:120px"
                                                            target="_blank">
                                                            <img alt="HesperTech"
                                                                src="https://rimanoble04.github.io/Hespertech/img/logo/hespertech-logo-min.png"
                                                                style="outline:none;text-decoration:none;height:80px;width:auto">
                                                        </a>
                                                    </td>
                                                    <td valign="middle" align="right">
                                                        <span
                                                            style="background-color:#e8f4fd;color:#0a66c2;padding:6px 12px;border-radius:20px;font-size:12px;font-weight:600;text-transform:uppercase;">New
                                                            Inquiry</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-left:24px;padding-right:24px;padding-bottom:24px">
                                        <div>
                                            <table role="presentation" valign="top" border="0" cellspacing="0"
                                                cellpadding="0" width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <table role="presentation" valign="top" border="0"
                                                                cellspacing="0" cellpadding="0" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <h2
                                                                                style="margin:0;color:#333;font-size:20px;font-weight:600;line-height:1.3">
                                                                                Client Inquiry Received
                                                                            </h2>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                      
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="padding-top:24px">
                                                                            <div
                                                                                style="background-color:#f8f9fa;padding:24px;border-radius:8px;border-left:4px solid #28a745;">
                                                                                <h3
                                                                                    style="margin:0 0 16px 0;color:#333;font-size:16px;font-weight:600;">
                                                                                    Client Information</h3>
                                                                                <table
                                                                                    style="width:100%;border-collapse:collapse;">
                                                                                    <tr>
                                                                                        <td
                                                                                            style="padding:6px 0;font-weight:600;color:#333;width:80px;vertical-align:top;">
                                                                                            Name:</td>
                                                                                        <td
                                                                                            style="padding:6px 0;color:#333;">
                                                                                            ${name}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td
                                                                                            style="padding:6px 0;font-weight:600;color:#333;vertical-align:top;">
                                                                                            Email:</td>
                                                                                        <td
                                                                                            style="padding:6px 0;color:#333;">
                                                                                            <a href="mailto:${email}"
                                                                                                style="color:#0a66c2;text-decoration:none;">${email}</a>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td
                                                                                            style="padding:6px 0;font-weight:600;color:#333;vertical-align:top;">
                                                                                            Subject:</td>
                                                                                        <td
                                                                                            style="padding:6px 0;color:#333;">
                                                                                            ${subject}</td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td
                                                                                            style="padding:6px 0;font-weight:600;color:#333;vertical-align:top;">
                                                                                            Submitted:</td>
                                                                                        <td
                                                                                            style="padding:6px 0;color:#666;font-size:14px;">
                                                                                            ${new
            Date().toLocaleString('en-IN',
                {
                    timeZone: 'Asia/Kolkata'
                })}</td>
                                                                                    </tr>
                                                                                </table>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="padding-top:20px">
                                                                            <div
                                                                                style="background-color:#fff;padding:20px;border-radius:8px;border:1px solid #e9ecef;">
                                                                                <h3
                                                                                    style="margin:0 0 12px 0;color:#333;font-size:16px;font-weight:600;">
                                                                                    Client Message</h3>
                                                                                <p
                                                                                    style="margin:0;font-weight:400;font-size:15px;line-height:1.6;color:#333;">
                                                                                    ${body}
                                                                                </p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                               
                                                                    <tr>
                                                                        <td style="padding-top:24px;text-align:center">
                                                                            <a href="mailto:${email}?subject=Re: ${subject}"
                                                                                style="background-color:#0a66c2;color:white;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:600;display:inline-block;">
                                                                                Reply to Client
                                                                            </a>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="background-color:#f3f2f0;padding:24px">
                                        <table role="presentation" valign="top" border="0" cellspacing="0"
                                            cellpadding="0" width="100%" style="font-size:12px">
                                            <tbody>
                                                <tr>
                                                    <td style="margin:0px;padding-bottom:8px;color:#666;">
                                                        This is an automated notification from the HesperTech website
                                                        contact form.
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="margin:0px;padding-bottom:8px;color:#666;">
                                                        <strong>CIN:</strong> U72900KL2022PTC076964 |
                                                        <strong>DIPP:</strong> 109220
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-bottom:8px">
                                                        <a href="https://hespertech.in/"
                                                            style="color:#0a66c2;display:inline-block;text-decoration:none">
                                                            <span
                                                                style="font-weight:bold;font-size:14px;color:#0a66c2;">HesperTech</span>
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="color:#666;">
                                                        © 2025 HesperTech Pvt Ltd, Thiruvananthapuram, Kerala, India.
                                                        <span>All rights reserved.</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>
</html>
    `.trim();
}

function validateInput(e) {
    if (!e.postData.contents) throw new Error("No data provided");
    let obj = JSON.parse(e.postData.contents);
    if (!obj.name || !obj.email || !obj.subject || !obj.body) throw new Error("Missing required fields");

    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            obj[key] = obj[key].trim();
        }
    }

    return obj;
}

// Function to select or create a sheet
function selectOrCreateSheet(sheetName, url = null) {
    let app;
    if (url) {
        app = SpreadsheetApp.openByUrl(url);
    } else {
        app = SpreadsheetApp.getActiveSpreadsheet();
    }
    let sheet = app.getSheetByName(sheetName.trim());
    return sheet ? sheet : app.insertSheet(sheetName.trim());
}


function appendToSheet(dataObject, sheet) {
    if (sheet.getLastRow() === 0) sheet.appendRow(Object.keys(dataObject));
    sheet.appendRow(Object.values(dataObject));
}

function doPost(e) {
    try {
        // Validate input using your existing function
        const obj = validateInput(e);

        // Add date and time fields
        const now = new Date();
        obj["Date"] = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy-MM-dd");
        obj["Time"] = Utilities.formatDate(now, Session.getScriptTimeZone(), "HH:mm:ss");


        // Create confirmation email content
        const htmlBody = createClientEmailTemplate(obj.name, obj.subject, obj.body, obj.email);

        // Send the confirmation email
        MailApp.sendEmail({
            to: obj.email,
            subject: `We will contact you soon`,
            htmlBody: htmlBody
        });

        const inboxMail = createInboxEmailTemplate(obj.name, obj.subject, obj.body, obj.email);

        // Email i should receive
        MailApp.sendEmail({
            to: mygmail,
            subject: `From: ${obj.name} - ${obj.subject}`,
            htmlBody: inboxMail
        });



        // Optionally store email metadata in a tracking sheet
        const emailSheet = selectOrCreateSheet("Email");
        const trackingData = {
            Name: obj.name,
            Email: obj.email,
            Subject: obj.subject,
            Body: obj.body,
            Date: obj.Date,
            Time: obj.Time
        };

        appendToSheet(trackingData, emailSheet);



        // Return success response
        return createSuccessResponse();


    } catch (err) {
        return createErrorResponse(err);
    }
}




function doGet(e) {
    return HtmlService.createHtmlOutput("Were you bored ?<br>Well, I was too!<br>So I made this page.<br>Have a nice day :)");
}