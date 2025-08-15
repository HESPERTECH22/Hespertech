const { dir } = require('console');
const fs = require('fs');
const path = require('path');

const CONFIG = {
    sitemapFile: 'sitemap.xml',
    defaultPreview: 'https://hespertech.in/img/tab/android-chrome-512x512.png',
    defaultIcon: 'img/tab/favicon-32x32.png',
    defaultTitle: 'Hesper Tech Pvt Ltd',
    defaultDescription: 'Showcasing engineering excellence and innovative projects.',
    addBodyImage: false
};

function getSitemapUrls() {
    const content = fs.readFileSync(CONFIG.sitemapFile, 'utf-8');
    return [...content.matchAll(/<loc>(.*?)<\/loc>/g)]
        .map(m => m[1].trim())
        .filter(Boolean);
}

function urlToFilename(url) {
    try {
        const pathname = new URL(url).pathname;
        const base = path.basename(pathname);
        return (!base || base === '/') ? 'index.html' : base;
    } catch {
        return url.split('/').pop() || 'index.html';
    }
}

function escapeAttr(str) {
    return String(str || '').replace(/"/g, '&quot;').replace(/\n/g, ' ');
}

function escapeRegExp(str) {
    return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildMetaTags(title, description, canonicalUrl) {
    const { defaultPreview } = CONFIG;
    return {
        'og:type': `<meta property="og:type" content="website">`,
        'og:title': `<meta property="og:title" content="${escapeAttr(title)}">`,
        'og:description': `<meta property="og:description" content="${escapeAttr(description)}">`,
        'og:url': `<meta property="og:url" content="${escapeAttr(canonicalUrl)}">`,
        'og:image': `<meta property="og:image" content="${escapeAttr(defaultPreview)}">`,
        'twitter:card': `<meta name="twitter:card" content="summary_large_image">`,
        'twitter:title': `<meta name="twitter:title" content="${escapeAttr(title)}">`,
        'twitter:description': `<meta name="twitter:description" content="${escapeAttr(description)}">`,
        'twitter:image': `<meta name="twitter:image" content="${escapeAttr(defaultPreview)}">`,
        'author': `<meta name="author" content="HesperTech Pvt Ltd">`
    };
}

function extractHeadContent(html) {
    const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
    if (!headMatch) return null;

    const headStartIndex = headMatch.index;
    const uptoHeadOpen = html.slice(0, headStartIndex);
    const lastLine = uptoHeadOpen.split('\n').pop();
    const baseIndent = (lastLine.match(/^\s*/) || [''])[0] + '    ';

    return {
        full: headMatch[0],
        inner: headMatch[1],
        startIndex: headStartIndex,
        baseIndent
    };
}

function extractMetadata(headInner) {
    const titleMatch = headInner.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : CONFIG.defaultTitle;

    const descMatch = headInner.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["'][^>]*>/i);
    const description = descMatch ? descMatch[1].trim() : CONFIG.defaultDescription;

    return { title, description };
}

function upsertMetaTag(headInner, key, tagStr, baseIndent) {
    if (!tagStr) return { headInner, updated: false };

    const isProperty = key.startsWith('og:');
    const attrName = isProperty ? 'property' : 'name';
    const regex = new RegExp(`(^|\\n)(\\s*)<meta[^>]*\\b${attrName}=["']${escapeRegExp(key)}["'][^>]*>`, 'i');

    const match = headInner.match(regex);
    if (match) {
        const indent = match[2] || baseIndent;
        headInner = headInner.replace(regex, `${indent}${tagStr}`);
        return { headInner, updated: true };
    }

    const allMetaMatches = [...headInner.matchAll(/(^\s*)<meta[^>]*>/gim)];
    if (allMetaMatches.length > 0) {
        const last = allMetaMatches[allMetaMatches.length - 1];
        const insertPos = last.index + last[0].length;
        const indent = last[1] !== undefined ? last[1] : baseIndent;
        headInner = headInner.slice(0, insertPos) + `\n${indent}${tagStr}` + headInner.slice(insertPos);
    } else {
        headInner = `${baseIndent}${tagStr}\n${headInner}`;
    }

    headInner = headInner.replace(/(\n\s*\n)+/g, '\n');
    return { headInner, updated: true };
}

function insertCanonicalLink(headInner, canonicalUrl, baseIndent) {
    const canonicalTag = `<link rel="canonical" href="${escapeAttr(canonicalUrl)}">`;

    if (/<link[^>]*rel=["']canonical["'][^>]*>/i.test(headInner)) {
        headInner = headInner.replace(/(^|\n)(\s*)<link[^>]*rel=["']canonical["'][^>]*>/i, `\n$2${canonicalTag}`);
        return { headInner, updated: true };
    }

    const allMetaMatches = [...headInner.matchAll(/(^\s*)<meta[^>]*>/gim)];
    if (allMetaMatches.length > 0) {
        const last = allMetaMatches[allMetaMatches.length - 1];
        const insertPos = last.index + last[0].length;
        const indent = last[1] !== undefined ? last[1] : baseIndent;
        headInner = headInner.slice(0, insertPos) + `\n${indent}${canonicalTag}` + headInner.slice(insertPos);
    } else {
        headInner = `\n${baseIndent}${canonicalTag}` + headInner;
    }

    return { headInner, updated: true };
}

function insertFavicon(headInner, baseIndent) {
    if (/<link[^>]*rel=["']icon["'][^>]*>/i.test(headInner)) {
        return { headInner, updated: false };
    }

    const faviconTag = `<link rel="icon" type="image/png" sizes="32x32" href="${CONFIG.defaultIcon}">`;
    const lastLink = [...headInner.matchAll(/(^\s*)<link[^>]*>/gim)].pop();

    if (lastLink) {
        const insertPos = lastLink.index + lastLink[0].length;
        const indent = lastLink[1] !== undefined ? lastLink[1] : baseIndent;
        headInner = headInner.slice(0, insertPos) + `\n${indent}${faviconTag}` + headInner.slice(insertPos);
    } else {
        headInner = `\n${baseIndent}${faviconTag}` + headInner;
    }

    return { headInner, updated: true };
}

function updateFile(filePath, canonicalUrl) {
    let html;
    try {
        html = fs.readFileSync(filePath, 'utf-8');
    } catch {
        return { status: 'error', reason: 'read' };
    }

    const headContent = extractHeadContent(html);
    if (!headContent) return { status: 'skipped', reason: 'no-head' };

    const { title, description } = extractMetadata(headContent.inner);
    const metaTags = buildMetaTags(title, description, canonicalUrl);

    let newHeadInner = headContent.inner;
    let updated = false;

    const canonical = insertCanonicalLink(newHeadInner, canonicalUrl, headContent.baseIndent);
    newHeadInner = canonical.headInner;
    updated = updated || canonical.updated;

    const tagsToUpsert = [
        'author', 'og:type', 'og:title', 'og:description', 'og:url', 'og:image',
        'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'
    ];

    for (const key of tagsToUpsert) {
        const result = upsertMetaTag(newHeadInner, key, metaTags[key], headContent.baseIndent);
        newHeadInner = result.headInner;
        updated = updated || result.updated;
    }

    const favicon = insertFavicon(newHeadInner, headContent.baseIndent);
    newHeadInner = favicon.headInner;
    updated = updated || favicon.updated;

    if (!updated) return { status: 'skipped', reason: 'nothing to update' };

    const originalHeadOpen = html.slice(
        headContent.startIndex,
        headContent.startIndex + html.slice(headContent.startIndex).indexOf('>') + 1
    );

    const newHeadFull = originalHeadOpen + newHeadInner + '</head>';
    const beforeHead = html.slice(0, headContent.startIndex);
    const afterHead = html.slice(headContent.startIndex + headContent.full.length);
    const finalHtml = beforeHead + newHeadFull + afterHead;

    try {
        fs.writeFileSync(filePath, finalHtml, 'utf-8');
        return { status: 'updated' };
    } catch {
        return { status: 'error', reason: 'write' };
    }
}

function main() {
    const urls = getSitemapUrls();
    const htmlUrls = urls.filter(u => u.endsWith('.html') || u.endsWith('/'));
    let root_dir = __dirname;
    if (__dirname.includes('helper')) {
        root_dir = (path.join(__dirname, '..'));
    } 
    htmlUrls.forEach(url => {
        const filename = urlToFilename(url);

        const filePath = path.join(root_dir, filename);
       
        

        if (!fs.existsSync(filePath)) {
            console.log(`Skipped: ${filename} (not found)`);
            return;
        }

        const result = updateFile(filePath, url);
        console.log(`${result.status === 'updated' ? 'Updated' : 'Skipped'}: ${filename}`);
    });

    console.log('Done.');
}

main();