---
title: Icons
---

### How to use icons

We are using an SVG sprite generator (details [here](https://www.npmjs.com/package/svg-sprite-loader)), which automatically takes individual SVGs from `/images/icons` and generates `/dist/icons.svg`. Webpack will automatically add your individual SVGs to this sprite.

**Usage**

The SVG component is found here: `/components/01-atoms/images/icon/icon.twig`. See available variables in that file as well as instructions for Drupal. Examples of usage below:

Simple: (no BEM renaming)

```
{% include "@atoms/images/icon/icon.twig" with {
  icon__name: 'menu',
} %}
```

... creates...

```
<svg class="icon">
  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/icons.svg#src--menu"></use>
</svg>
```

Complex (BEM classes):

```
{% include "@atoms/04-images/icon/icon.twig" with {
  icon__base_class: 'toggle',
  icon__blockname: 'main-nav',
  icon__name: 'menu',
} %}
```

... creates...

```
<svg class="main-nav__toggle">
  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/icons.svg#src--menu"></use>
</svg>
```
