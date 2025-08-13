const fs = require('fs');
const path = require('path');

// List of meta tags to check/insert
const metaTags = [
    // `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'strict-dynamic'; style-src 'self'; img-src 'self' https:; frame-ancestors 'none'; require-trusted-types-for 'script'; upgrade-insecure-requests;">`,
    // `<meta http-equiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains; preload">`,
    // `<meta http-equiv="X-Frame-Options" content="DENY">`,
    // `<meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin">`,
    // `<meta name="robots" content="index, follow">`,
    `<meta name="author" content="HesperTech Pvt Ltd">`
];

function addMetaTagsIfMissing(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            addMetaTagsIfMissing(fullPath);
        }
        else if (entry.isFile() && fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf-8');

            const headStart = content.match(/<head[^>]*>/i);
            if (!headStart) {
                console.warn(`No <head> tag found in ${fullPath}, skipping`);
                continue;
            }

            const headContentMatch = content.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
            if (!headContentMatch) {
                console.warn(`No </head> found in ${fullPath}, skipping`);
                continue;
            }

            let updated = false;

            // Find all existing <meta> in head
            let headContent = headContentMatch[1];
            const lastMetaMatch = [...headContent.matchAll(/<meta[^>]*>/gi)].pop();

            // Loop through each tag in the list
            metaTags.forEach(tag => {
                if (content.includes(tag)) {
                    console.log(`Already has tag in ${fullPath}: ${tag}`);
                    return;
                }

                let insertPos;
                if (lastMetaMatch) {
                    insertPos = headStart.index + headStart[0].length + lastMetaMatch.index + lastMetaMatch[0].length;
                } else {
                    insertPos = headStart.index + headStart[0].length;
                }

                content = content.slice(0, insertPos) + '\n    ' + tag + content.slice(insertPos);
                updated = true;
                console.log(`Added tag to ${fullPath}: ${tag}`);
            });

            if (updated) {
                fs.writeFileSync(fullPath, content, 'utf-8');
            }
        }
    }
}

// Run it
addMetaTagsIfMissing(__dirname);
