import Flow from 'types/Flow'
import { clientCatalog as client } from 'utils/api'

const FLOW_ENDPOINT = '/flows'

async function getFlows(page: number, pageSize: number): Promise<Flow[] | any> {
  try {
    const data = await client.get(FLOW_ENDPOINT + `?page=${page}&pageSize=${pageSize}`)
    return Promise.resolve(data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export {
  getFlows
}

