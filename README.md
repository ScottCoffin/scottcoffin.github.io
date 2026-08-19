Website for Scott Coffin, using [Minimal Mistakes jekyll theme](https://mmistakes.github.io/minimal-mistakes/)

## Local preview

Requires Ruby + Bundler (already vendored via `Gemfile`/`Gemfile.lock`).

```
bundle install      # first time only, or after Gemfile changes
bundle exec jekyll serve
```

Then open http://127.0.0.1:4000/ in a browser. Leave the command running while you edit — Jekyll rebuilds and live-reloads on file save.

**Always use `jekyll serve`, never `jekyll build` alone.** A manual `jekyll build` writes `_site/` with `url: https://scottcoff.in` (the production value in `_config.yml`), so pages load CSS/assets from the live site instead of locally. `jekyll serve` overrides this to `http://localhost:4000` automatically.

## Notes for me
- to change colors and such in the "default" theme, need to directly change the \_variables css. 
