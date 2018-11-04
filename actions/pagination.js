pagination = (data, itemsPerPage, page) => {
    var newArr = []
    var bigArr = []
    if(data == null){
        const emptyData = {
            pageCount: 0,
            results: []
        }
        return emptyData
    }
    for (var i = 1; i <= data.length; i ++) {
        newArr.push(data[i - 1])
        if (i % itemsPerPage == 0) {
            bigArr.push(newArr)
            newArr = []
        } else if (data.length == i) {
            bigArr.push(newArr)
        }
    }
    const maxPage = Math.ceil(data.length / itemsPerPage)
    const paginationData = {
        pageCount: maxPage,
        results: bigArr[page - 1]
    }
    return paginationData
}

module.exports = pagination