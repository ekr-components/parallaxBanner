# parallaxBanner

This component is used to create a parallax effect. It does this by altering
the CSS `background-position` property. The parallax effect will cacluate its
range of motion to be the height of the image (adjusted for scaling) minus the
height of the element. It will then calculate the range of motion to be the
moment the element comes into the viewport (window) to the moment it leaves.
When the difference between these values is large, the parallax effect will be
greater than if the difference is small.

This component detects a mobile breakpoint where it will remove the parallax
effect.

TODO: Using `background-position` isn't the smoothest way to do this. It would
be much better to have a separate element and adjust its position with
`transform: translate`. Once that is in place, it would also be nice to have the
image fade in once loaded.

## How to Use This Component

```html
<div
    data-component="parallax-banner"
    data-pb-image="/images/image.jpg">
    <!-- Content -->
</div>
```
