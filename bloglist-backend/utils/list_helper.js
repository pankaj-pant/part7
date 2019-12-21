const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
  const initialValue = 0
  const sum = blogs.reduce(
    (accumulator, currentValue) => accumulator + currentValue.likes
    , initialValue
  )

  return blogs.length === 0
    ? 0 :
    sum
}

const favoriteBlog = (blogs) => {
  let highestLikes = 0
  let blogIndex = 0
  blogs.map(function(b, index){
    if(b.likes > highestLikes){
      highestLikes = b.likes
      blogIndex = index
    }
  })

  const answer = {
    title: blogs[blogIndex].title,
    author: blogs[blogIndex].author,
    likes: blogs[blogIndex].likes
  }

  return answer
}

const mostBlogs = (blogs) => {
  function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      var key = obj[property]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj)
      return acc
    }, {})
  }

  const result = groupBy(blogs, 'author')

  const transformedResult = Object.entries(result)

  let highestNumber = 0
  let numberIndex = 0

  transformedResult.map((a, index) => {
    if(a[1].length > highestNumber) {
      highestNumber = a[1].length
      numberIndex = index
    }
  })

  const answer = {
    author: transformedResult[numberIndex][0],
    blogs: highestNumber
  }

  return answer
}

const mostLikes = (blogs) => {
  function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      var key = obj[property]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj)
      return acc
    }, {})
  }

  const result = groupBy(blogs, 'author')

  const transformedResult = Object.entries(result)

  let highestLikes = 0
  let numberIndex = 0
  let totalLikes = 0

  transformedResult.map((a, index) => {
    a[1].map((o) => {
      totalLikes = totalLikes + o.likes
    })
    if(totalLikes > highestLikes) {
      highestLikes = totalLikes
      numberIndex = index
      totalLikes = 0
    }
  })

  const answer = {
    author: transformedResult[numberIndex][0],
    likes: highestLikes
  }

  return answer
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
