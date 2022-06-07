import Flow from 'types/Flow'
import { client } from 'utils/api'

const DEPLOYMENT_ENDPOINT = '/deployment'

async function postDeployment(body: any): Promise<Flow[] | any> {
  try {
    const data = await client.post(DEPLOYMENT_ENDPOINT, body)
    return Promise.resolve(data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export {
    postDeployment
}

