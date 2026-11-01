# Whiteplain theme provenance

- Upstream repository: https://github.com/taikii/whiteplain.git
- Upstream commit: `e80918a53acdd30e3e55cef6f2c7cabbaf33b71d`
- License: MIT; see `LICENSE` for the original copyright and license text.

This theme was converted from a Git submodule to ordinary repository files on
2026-11-02. Articles and theme changes can now be committed and pushed together
from the blog repository, without a separate theme repository push.

Existing local customizations were preserved in `layouts/partials/head.html`,
`static/css/custom.css`, and `static/css/style.css`. Blog-level overrides also
remain in the root `layouts/` and `static/` directories.

When importing future upstream changes, compare against the commit above and
preserve these customizations and the original license.
