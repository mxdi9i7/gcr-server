paginationExtra = (data, itemsPerPage, page) => {
    var newArr = []
    var bigArr = []
    var dataLength = data.length;
    for (var i = 1; i <= data.length; i++) {
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
        houseCount: dataLength,
        pageCount: maxPage,
        results: bigArr[page - 1]
    }
    return paginationData
}

module.exports = paginationExtra