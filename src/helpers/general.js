import * as slugNpm from 'slug'
slugNpm.defaults.modes['pretty'].lower = true;

export const slug = slugNpm

export function updateSlug() {
  if (this.autofillSlug) {
    var sluggable = this.title ? this.title : this.name;
    this.slug = sluggable ? slug(sluggable) : "";
  }
}

export function editObject(section, slug) {
  const path = '/' + section + '/' + slug + '/edit'
  this.$router.push({ path: path })
}

export function resetFields () {
  Object.assign(this.$data, this.$options.data.call(this));
}

export function passTitleUp(title) {
  this.$emit('set-page-title', title)
}

export default {
  updateSlug: updateSlug,
  slug: slug
}