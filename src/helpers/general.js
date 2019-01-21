import * as slug from 'slug'

export function updateSlug() {
  if (this.autofillSlug) {
    this.slug = slug(this.title)
  }
}

export function editObject(section, slug) {
  const path = '/' + section + '/' + slug + '/edit'
  console.log("EDIT PATH:", path);
  this.$router.push({ path: path })
}

export default {
  updateSlug: updateSlug
}