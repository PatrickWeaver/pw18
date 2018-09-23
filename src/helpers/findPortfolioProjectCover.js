function findPortfolioProjectCover(images) {
  var cover = null
  for (var i in images) {
    if (images[i].cover) {
      cover = images[i]
      break
    }
  }
  return cover
}

export default findPortfolioProjectCover