import IProduct from "../interface/models/product"

export interface IqueryStr {
    keyword?: string,
    price?: {
        gt?: string,
        gte?: string,
        lt?: string,
        lte?: string
    },
    category?: string,
    page?: string
}

class ApiFeatures {
    query: any
    queryStr: IqueryStr

    constructor(query:any, queryStr:IqueryStr) {
        this.query = query,
        this.queryStr = queryStr
    }

    search() {
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
        //Deep clone of queryStr
        const queryCopy:{[key: string]: any} = {...this.queryStr}

        // Removing some field for category
        const removedFields = ["keyword", "price", "page"]

        removedFields.forEach(field => delete queryCopy[field])

        // Filter for price and ratings
        let queryStr = JSON.stringify(queryCopy)

        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)

        this.query = this.query.find(JSON.parse(queryStr))

        return this
    }

    pagination(input: number){
        const currentPage: number = Number(this.queryStr.page) || 1

        const noOfSkipProducts: number = input * (currentPage - 1)

        this.query = this.query.limit(input).skip(noOfSkipProducts)

        return this
    }
}

export default ApiFeatures