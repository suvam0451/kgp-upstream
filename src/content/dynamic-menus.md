---
lyout: page
title: Dynamic sidebar
---

Right now, the sidebar is hard-coded. That is because we don't have enough sectons yet. After applying the code, it should look like this sidebar from my website.

This basically makes a tree out of the markdown headers like so

### How it works

For my previous website, I divided the tree into categories and injected that into the markdown header,like so:

```md
---
path: '/tutorials/ue4/plugin-development-using-rust-2'
title: 'Making a rust plug-in (Part 2/3)'
date: '2019-19-12'
tags: ['ue4', 'mdx', 'example']
moduleID: 1
submoduleID: 1
seriesID: 1
seriesIndex: 2
---

This is an example markdown file.
```

After that, according to the moduleID, submoduleID, seriesIndex this will fall into the appropriate section and category.
