#!/usr/bin/env python3
# MediaWiki API에서 HTML을 가져와 Markdown으로 변환해 컬렉션에 저장
# GitHub Actions에서 실행: requests, html2text 필요
import os, json, re, pathlib, argparse, requests, html2text

ROOT = pathlib.Path(__file__).resolve().parents[1]
API = "https://nookipedia.com/api.php"

def fetch_html(slug):
    params = {"action":"parse","page":slug,"prop":"text|displaytitle","format":"json"}
    r = requests.get(API, params=params, timeout=30); r.raise_for_status()
    data = r.json()
    if "error" in data: raise RuntimeError(f"API error for {slug}: {data['error']}")
    html = data["parse"]["text"]["*"]; title = data["parse"].get("displaytitle", slug)
    return title, html

def html_to_markdown(html):
    h = html2text.HTML2Text(); h.ignore_links=False; h.body_width=0
    md = h.handle(html)
    md = re.sub(r"\n{3,}", "\n\n", md).strip()
    return md

def write_doc(collection, filename, title_ko, source_url, source_title, body_md):
    coll = collection if collection in {"guide","items","events"} else "guide"
    outdir = ROOT / coll; outdir.mkdir(parents=True, exist_ok=True)
    path = outdir / filename
    fm = f"""---
layout: default
title: {title_ko}
original_source_url: {source_url}
original_title: {source_title}
---

"""
    path.write_text(fm + body_md + "\n", encoding="utf-8")
    print("Wrote:", path)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--config", default=str(ROOT / "data" / "nooki_pages.json"))
    args = ap.parse_args()
    items = json.loads(pathlib.Path(args.config).read_text(encoding="utf-8"))
    for it in items:
        slug = it["slug"]
        collection = it.get("collection","guide")
        filename = it.get("filename","imported.md")
        title_ko = it.get("title_ko", slug)
        source_url = f"https://nookipedia.com/wiki/{slug.replace(' ', '_')}"
        print("Fetching:", slug)
        title_en, html = fetch_html(slug)
        md = html_to_markdown(html)
        write_doc(collection, filename, title_ko, source_url, title_en, md)

if __name__ == "__main__":
    main()
