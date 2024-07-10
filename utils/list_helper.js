const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null;
    }

    return blogs.reduce((fav, current) => {
        return (current.likes > fav.likes) ? current : fav;
    });
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null;
    }

    let authorMap = new Map()

    blogs.forEach(blog => {
        const count = authorMap.get(blog.author) || 0;
        authorMap.set(blog.author, count + 1)
    })

    let topAuthor = {author: '', blogs: 0}
    for(let [author, count] of authorMap.entries()){
        if (count > topAuthor.blogs){
            topAuthor = {author: author, blogs: count}
        }
    }

    return topAuthor
}

const mostLikesAuthor = (blogs) => {
    if (blogs.length === 0) {
        return null;
    }

    let likesMap = new Map()

    blogs.forEach(blog => {
        const count = likesMap.get(blog.author) || 0;
        likesMap.set(blog.author, count + blog.likes)
    })

    let topAuthor = {author: '', likes: 0}
    for(let [author, count] of likesMap.entries()){
        if (count > topAuthor.likes){
            topAuthor = {author: author, likes: count}
        }
    }

    return topAuthor
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikesAuthor
}