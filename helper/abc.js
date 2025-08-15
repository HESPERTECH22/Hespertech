// nvm use 14
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

function modifyHtml(fileLocation, fileTemplateLocation, templateId) {
    const htmlContent = fs.readFileSync(fileLocation, 'utf-8');
    const dom = new JSDOM(htmlContent, { includeNodeLocations: true });
    const document = dom.window.document;

    // find element
    const targetDiv = document.getElementById(templateId);
    if (!targetDiv) {
        throw new Error(`No div found with id '${templateId}'`);
    }

    // get indent
    const loc = dom.nodeLocation(targetDiv);
    const baseIndent = htmlContent
        .slice(0, loc.startOffset)
        .split('\n')
        .pop()
        .match(/^\s*/)[0];
    const extraIndent = baseIndent + '        ';

    // indent template
    const templateContent = fs.readFileSync(fileTemplateLocation, 'utf-8');
    const indentedTemplate =
        '\n' +
        templateContent
            .split('\n')
            .map(line => extraIndent + line)
            .join('\n') +
        '\n' + baseIndent;

    // update and save
    targetDiv.innerHTML = indentedTemplate;
    fs.writeFileSync(
        fileLocation,
        htmlContent.slice(0, loc.startOffset) +
        targetDiv.outerHTML +
        htmlContent.slice(loc.endOffset),
        'utf-8'
    );
}


// Process batch of files
const files = [
    // Add nav and footer to all main pages
    ["about-us.html", "html/nav.html", "nav"],
    ["automated-braking-system-patent.html", "html/nav.html", "nav"],
    ["blog_detail.html", "html/nav.html", "nav"],
    ["contact-us.html", "html/nav.html", "nav"],
    ["index.html", "html/nav.html", "nav"],
    ["careers.html", "html/nav.html", "nav"],
    ["railway-point-indicator.html", "html/nav.html", "nav"],
    ["portfolio.html", "html/nav.html", "nav"],
    ["services.html", "html/nav.html", "nav"],
    ["thompsons-tyre-machines-partnership.html", "html/nav.html", "nav"],
    ["custom-1-ton-construction-hoist.html", "html/nav.html", "nav"],
    ["vibrationless-patient-trolley.html", "html/nav.html", "nav"],
    ["vendor-registration.html", "html/nav.html", "nav"],
    ["amul-scooping-kiosk.html", "html/nav.html", "nav"],
    ["wheelchair-cum-stretcher.html", "html/nav.html", "nav"],
    ["xray-shield-prototype.html", "html/nav.html", "nav"],

    // ["blog/blog.html", "html/nav.html", "nav"],
    // ["blog/new_blog.html", "html/nav.html", "nav"],
    
    // Same files with footer
    ["about-us.html", "html/footer.html", "footer"],
    ["automated-braking-system-patent.html", "html/footer.html", "footer"],
    ["blog_detail.html", "html/footer.html", "footer"],
    ["contact-us.html", "html/footer.html", "footer"],
    ["index.html", "html/footer.html", "footer"],
    ["careers.html", "html/footer.html", "footer"],
    ["railway-point-indicator.html", "html/footer.html", "footer"],
    ["portfolio.html", "html/footer.html", "footer"],
    ["services.html", "html/footer.html", "footer"],
    ["thompsons-tyre-machines-partnership.html", "html/footer.html", "footer"],
    ["custom-1-ton-construction-hoist.html", "html/footer.html", "footer"],
    ["vibrationless-patient-trolley.html", "html/footer.html", "footer"],
    ["vendor-registration.html", "html/footer.html", "footer"],
    ["amul-scooping-kiosk.html", "html/footer.html", "footer"],
    ["wheelchair-cum-stretcher.html", "html/footer.html", "footer"],
    ["xray-shield-prototype.html", "html/footer.html", "footer"],

    // ["blog/blog.html", "html/footer.html", "footer"],
    // ["blog/new_blog.html", "html/footer.html", "footer"],
    
    // Updating section for specific pages
    ["about-us.html", "html/team.html", "team"],
    ["index.html", "html/client_logo.html", "client_logo"],
    ["about-us.html", "html/client_logo.html", "client_logo"],
    ["portfolio.html", "html/team.html", "team"],

    ["portfolio.html", "html/client_logo.html", "client_logo"],
    
];

files.forEach(([fileLocation, templateLocation, divId]) => {
    try {
        modifyHtml(fileLocation, templateLocation, divId);
        console.log(`Successfully modified ${fileLocation}`);
    } catch (error) {
        console.error(`Error processing ${fileLocation}: ${error.message}`);
    }
});


//  Get-ChildItem -Recurse -Filter *.html  -File | Select-Object -First 20

