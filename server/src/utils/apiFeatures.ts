export interface IQueryStr {
    keyword?: string;
    price?: {
        gt?: string;
        gte?: string;
        lt?: string;
        lte?: string;
    },
    page?: string;
    category?: string
    rating?: number
}

class ApiFeatures {
    query: any;
    queryStr: IQueryStr
    constructor(query: any, queryStr: IQueryStr)  {
        this.query = query;
        this.queryStr = queryStr;
    }

    serach() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}

        this.query = this.query.find({...keyword})

        return this
    }

    filter() {
        // Creating deep copy of queryStr
        const queryStrCopy:{[key: string]: any} = {...this.queryStr}

        // Removing fields for category
        const removedFields = ["keyword", "page"]
        removedFields.forEach(field => delete queryStrCopy[field])

        // Filter for price and ratings
        let queryString = JSON.stringify(queryStrCopy)
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)

        this.query = this.query.find(JSON.parse(queryString))

        return this
    }

    pagination(input: number) {
        const currentPage: number = Number(this.queryStr.page) || 1

        const noOfProductsSkipped: number = input * (currentPage - 1)

        console.log(currentPage, noOfProductsSkipped)

        this.query = this.query.limit(input).skip(noOfProductsSkipped)

        return this
    }
}

export default ApiFeatures;