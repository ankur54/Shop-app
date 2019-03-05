exports.error = (req, res, next) => {
    res.status(404).render('404.html', {pageTitle: 'Page NOT Found!!! :('});
}