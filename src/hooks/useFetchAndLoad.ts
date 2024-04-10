import { useEffect, useState } from 'react'

interface AxiosCall {
  call: () => Promise<any>
  controller?: AbortController
}

interface FetchAndLoadHook {
  loading: boolean
  callEndpoint: (axiosCall: AxiosCall) => Promise<any>
}

const useFetchAndLoad = (): FetchAndLoadHook => {
  const [loading, setLoading] = useState<boolean>(false)
  let controller: AbortController | null = null

  const callEndpoint = async (axiosCall: AxiosCall): Promise<any> => {
    setLoading(true)
    if (axiosCall.controller) controller = axiosCall.controller
    let result: any = {}
    try {
      result = await axiosCall.call()
      setLoading(false)
    } catch (err) {
      setLoading(false)
      throw err
    }
    return result
  }

  const cancelEndpoint = () => {
    setLoading(false)
    if (controller) controller.abort()
  }

  useEffect(() => {
    return cancelEndpoint
  }, [])

  return { loading, callEndpoint }
}

export default useFetchAndLoad
