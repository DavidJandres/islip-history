<?xml version="1.0" encoding="UTF-8"?>
<!-- Human-readable rendering of /sitemap.xml. Browsers apply this XSLT when
     someone opens the sitemap directly; search engines ignore it and read the
     raw XML. Colors match the site's design tokens. -->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>XML Sitemap · The Islip Promise</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <style>
          body { margin: 0; padding: 2rem 1.25rem 4rem; background: #faf8f5; color: #1e293b;
                 font: 16px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif; }
          main { max-width: 60rem; margin: 0 auto; }
          h1 { color: #174a7c; font-family: Georgia, "Times New Roman", serif; margin: 0 0 .25rem; }
          p.note { color: #4b5563; font-size: .9rem; max-width: 46rem; }
          p.note code { background: #f1f3f5; padding: 0 .3em; border-radius: 2px; }
          table { border-collapse: collapse; width: 100%; margin-top: 1.25rem;
                  background: #fff; border: 1px solid #dad8d1; font-size: .9rem; }
          th { text-align: left; background: #174a7c; color: #fff; padding: .5rem .75rem; }
          td { padding: .45rem .75rem; border-top: 1px solid #dad8d1; word-break: break-all; }
          td.n { color: #856325; white-space: nowrap; }
          a { color: #174a7c; }
          tr:hover td { background: #f1f3f5; }
        </style>
      </head>
      <body>
        <main>
          <h1>XML Sitemap</h1>
          <p class="note">
            This is the sitemap for <a href="https://theislippromise.org">The Islip Promise</a>,
            listing <strong><xsl:value-of select="count(s:urlset/s:url)"/></strong> URLs.
            Search engines read the XML document itself; this styled page is the
            human-readable view of the same file. To see the raw
            <code>&lt;urlset&gt;</code>/<code>&lt;url&gt;</code>/<code>&lt;loc&gt;</code>
            markup, use your browser's <em>View Page Source</em>.
          </p>
          <table>
            <tr><th>#</th><th>URL</th><th>Languages</th></tr>
            <xsl:for-each select="s:urlset/s:url">
              <tr>
                <td class="n"><xsl:value-of select="position()"/></td>
                <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                <td>
                  <xsl:for-each select="xhtml:link[@hreflang != 'x-default']">
                    <xsl:value-of select="@hreflang"/>
                    <xsl:if test="position() != last()">, </xsl:if>
                  </xsl:for-each>
                </td>
              </tr>
            </xsl:for-each>
          </table>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
