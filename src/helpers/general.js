import * as slug from 'slug'

export function updateSlug() {
  if (this.autofillSlug) {
    var sluggable = this.title ? this.title : this.name;
    this.slug = sluggable ? slug(sluggable) : "";
  }
}

export function editObject(section, slug) {
  const path = '/' + section + '/' + slug + '/edit'
  console.log("EDIT PATH:", path);
  this.$router.push({ path: path })
}

export function resetFields () {
  Object.assign(this.$data, this.$options.data.call(this));
}

export default {
  updateSlug: updateSlug
}