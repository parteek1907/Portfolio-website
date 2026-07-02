import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://parteekgarg.in</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://parteekgarg.in/#about</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://parteekgarg.in/#projects</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://parteekgarg.in/#certifications</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>https://parteekgarg.in/#contact</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.5</priority>
    </url>
</urlset>`;

    return new NextResponse(sitemap, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
