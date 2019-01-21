import * as slug from 'slug'

export function updateSlug() {
  if (this.autofillSlug) {
    var sluggable = this.title ? this.title : this.name;
    this.slug = sluggable ? sluggable : "error no sluggable available";
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