import os
import json
import re

base_dir = r"c:\dev\donbrico-net"
locales_dir = os.path.join(base_dir, "locales")

def update_locales():
    keys_added = set()
    blog_data = {
        "nav": "Blog",
        "page": {
        "title": "Blog — Donbrico",
        "description": "Guides, tips, and tutorials on browser automation, AI writing tools, and tab management for professionals.",
        "ogTitle": "Blog — Donbrico",
        "ogDescription": "Guides, tips, and tutorials on browser automation, AI writing tools, and tab management for professionals."
        },
        "hero": {
        "eyebrow": "BLOG",
        "title": "Guides & resources",
        "subtitle": "Practical tips on browser automation, AI writing tools, and workspace management."
        },
        "allPosts": "All Posts",
        "readMore": "Read more →",
        "byProduct": "By product:",
        "minRead": "min read"
    }

    en_path = os.path.join(locales_dir, "en.json")
    if not os.path.exists(en_path):
        return []
    
    with open(en_path, "r", encoding="utf-8") as f:
        en_data = json.load(f)
        
    en_data["blog"] = blog_data
    if "nav" not in en_data:
        en_data["nav"] = {}
    en_data["nav"]["blog"] = "Blog"
    
    with open(en_path, "w", encoding="utf-8") as f:
        json.dump(en_data, f, indent=2, ensure_ascii=False)
    
    keys_added.add("nav.blog")
    keys_added.add("blog.*")

    # Update other locales
    files = ["de.json", "es.json", "fr.json", "hi.json", "it.json", "ja.json", "ko.json", "pt_BR.json", "ru.json", "zh_CN.json", "zh_TW.json"]
    for file in files:
        file_path = os.path.join(locales_dir, file)
        if os.path.exists(file_path):
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
            
            data["blog"] = blog_data
            if "nav" not in data:
                data["nav"] = {}
            data["nav"]["blog"] = "Blog"
            
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
                
    return list(keys_added)

def update_html_files():
    modified_count = 0
    failed_files = []
    
    for root, dirs, files in os.walk(base_dir):
        if "node_modules" in root or ".git" in root or "blog" in root:
            continue
            
        for file in files:
            if file.endswith(".html"):
                file_path = os.path.join(root, file)
                
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
                    
                original_content = content
                
                # Insert Nav Item
                # Look for: <li><a href="/null-carrier/" data-i18n="nav.game">Game</a></li>
                # and insert <li><a href="/blog/" data-i18n="nav.blog">Blog</a></li> before it
                nav_pattern = r'(<li>\s*<a[^>]*href="/null-carrier/"[^>]*data-i18n="nav.game"[^>]*>.*?</a>\s*</li>)'
                nav_replacement = r'<li><a href="/blog/" data-i18n="nav.blog">Blog</a></li>\n          \1'
                if re.search(nav_pattern, content):
                    content = re.sub(nav_pattern, nav_replacement, content)
                
                # Insert Footer Item
                # Look for: <h4 data-i18n="footer.company">Company</h4>
                footer_pattern = r'(<h4[^>]*data-i18n="footer.company"[^>]*>.*?</h4>)'
                footer_replacement = r'\1\n            <a href="/blog/" data-i18n="nav.blog">Blog</a>'
                if re.search(footer_pattern, content):
                    content = re.sub(footer_pattern, footer_replacement, content)
                    
                if content != original_content:
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(content)
                    modified_count += 1
                else:
                    failed_files.append(file_path)
                    
    return modified_count, failed_files

def create_blog_index():
    index_path = os.path.join(base_dir, "index.html")
    blog_dir = os.path.join(base_dir, "blog")
    blog_index_path = os.path.join(blog_dir, "index.html")
    
    os.makedirs(blog_dir, exist_ok=True)
    
    with open(index_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # First, let's apply the nav and footer changes because index.html might not have it if we read the unmodified one
    # Wait, we already modified index.html in the step above! 
    # So it should already have the blog links.
    
    # 1. Active class
    content = re.sub(r'href="/" class="active"', 'href="/"', content)
    content = re.sub(r'href="/blog/" data-i18n="nav.blog"', 'href="/blog/" class="active" data-i18n="nav.blog"', content)
    
    # 2. Canonical
    content = re.sub(r'<link rel="canonical" href="https://donbrico.net/" />', '<link rel="canonical" href="https://donbrico.net/blog/" />', content)
    
    # 3. Title and Meta
    content = re.sub(r'<title data-i18n="home.page.title">.*?</title>', '<title data-i18n="blog.page.title">Blog — Donbrico</title>', content, flags=re.DOTALL)
    content = re.sub(r'<meta\s+name="description"\s+data-i18n="home.page.description"\s+content="[^"]*"\s*/>', '<meta name="description" data-i18n="blog.page.description" content="Guides, tips, and tutorials on browser automation, AI writing tools, and tab management for professionals." />', content)
    content = re.sub(r'<meta\s+property="og:title"\s+data-i18n="home.page.ogTitle"\s+content="[^"]*"\s*/>', '<meta property="og:title" data-i18n="blog.page.ogTitle" content="Blog — Donbrico" />', content)
    content = re.sub(r'<meta\s+property="og:description"\s+data-i18n="home.page.ogDescription"\s+content="[^"]*"\s*/>', '<meta property="og:description" data-i18n="blog.page.ogDescription" content="Guides, tips, and tutorials on browser automation, AI writing tools, and tab management for professionals." />', content)
    
    # 4. Paths
    content = content.replace('href="./css/style.css"', 'href="../css/style.css"')
    content = content.replace('href="assets/', 'href="../assets/')
    content = content.replace('src="./js/', 'src="../js/')
    
    # 5. Content replacement
    hero_section_replacement = """    <section class="hero">
      <div class="container">
        <p class="eyebrow" data-i18n="blog.hero.eyebrow">BLOG</p>
        <h1 data-i18n="blog.hero.title">Guides & resources</h1>
        <p class="subtitle" data-i18n="blog.hero.subtitle">
          Practical tips on browser automation, AI writing tools, and workspace management.
        </p>
      </div>
    </section>

    <section style="padding: var(--spacing-xl) 0">
      <div class="container">
        <div class="solution-grid" id="blog-posts">
          <!-- Posts will be populated here -->
          <div class="card" style="text-align:center; color: var(--muted);">
            <p>Blog posts coming soon. Check back shortly.</p>
          </div>
        </div>
      </div>
    </section>"""
    
    # We replace from <section class="hero"> to just before the "ALSO FROM DONBRICO" section, 
    # but since it's hard to match exactly, we can match from <section class="hero"> up to <footer class="footer">, 
    # and then put the footer back.
    # Wait, the user just says "Replace the hero and the solutions grid with...". 
    # I can use a regex to replace everything between `<nav class="nav">...` and `<footer class="footer">`.
    # Let's extract nav and footer.
    
    nav_match = re.search(r'(<nav class="nav">.*?</nav>)', content, flags=re.DOTALL)
    footer_match = re.search(r'(<footer class="footer">.*?</footer>)', content, flags=re.DOTALL)
    head_match = re.search(r'(<!doctype html>.*?<body>)', content, flags=re.DOTALL)
    scripts_match = re.search(r'(<script.*?>.*?</script>\s*</body>\s*</html>)', content, flags=re.DOTALL)
    
    if nav_match and footer_match and head_match and scripts_match:
        new_content = head_match.group(1) + "\n    " + nav_match.group(1) + "\n\n" + hero_section_replacement + "\n\n    " + footer_match.group(1) + "\n    " + scripts_match.group(1)
        with open(blog_index_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        return True
    return False

def update_sitemap():
    sitemap_path = os.path.join(base_dir, "sitemap.xml")
    with open(sitemap_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    sitemap_entry = """  <url>
    <loc>https://donbrico.net/blog/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
"""
    if "https://donbrico.net/blog/" not in content:
        # Insert before </urlset>
        content = content.replace("</urlset>", sitemap_entry + "</urlset>")
        with open(sitemap_path, "w", encoding="utf-8") as f:
            f.write(content)
            
if __name__ == "__main__":
    keys = update_locales()
    count, failed = update_html_files()
    success = create_blog_index()
    update_sitemap()
    print(f"Modified HTML files: {count}")
    print(f"Failed files: {failed}")
    print(f"Keys added: {keys}")
    print(f"Blog created: {success}")
