# Deployment + Custom Domain (wyatt-works)

## Live target
`openclaw.wyatt-works.com`

## How this works
This site is published via GitHub Pages. The `CNAME` file tells Pages which custom domain to use.

## DNS steps (do once in your DNS provider)
Create this DNS record for `wyatt-works.com`:

- Type: `CNAME`
- Name/Host: `openclaw`
- Value/Target: `lifexpadmin.github.io`
- TTL: default (or 300)

## Verify after DNS propagates
1. Open GitHub repo settings → Pages
2. Confirm custom domain shows: `openclaw.wyatt-works.com`
3. Ensure "Enforce HTTPS" is enabled
4. Visit: `https://openclaw.wyatt-works.com`

## Updating the site
Any push to the deployment repo `LifEXPAdmin/openclaw-book-companion` triggers a new Pages build.
