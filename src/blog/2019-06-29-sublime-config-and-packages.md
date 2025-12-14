---
layout: post
title:  "Sublime config and packages"
date:   2019-06-29 19:34:49 +0000
categories: sublime packages settings gist
---

### Hiding folders from project using project manager plugin

{% include codeHeader.html %}
```
{
  "folders":
  [
    {
      "path": "c:\\laragon\\www\\edwuma",
      "folder_exclude_patterns": ["node_modules","vendor","storage","bootstrap"]
    }
  ]
}
```
