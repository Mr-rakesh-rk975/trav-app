export const  TravApis= () => {

    const fetchTourPackages = async (ALL_TOUSR_PER_PAGE,page) => {
        try {
            let result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/apis/packages/index?limit=${ALL_TOUSR_PER_PAGE}&page=${page}`)
            let resp = await result.json()
            let {data,totalCount,totalPerPage}=resp.data
            return {data,totalCount,totalPerPage}
        } catch (error) {
            console.log(error)

        }
    }

    return{
        fetchTourPackages
    }
}