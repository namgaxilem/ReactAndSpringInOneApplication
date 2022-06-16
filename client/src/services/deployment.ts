import Flow from 'types/Flow'
import { client } from 'utils/api'

const DEPLOYMENT_ENDPOINT = '/deployment'
const NIFI_AGENT_ENDPOINT = '/nifi-agent'

async function getDeployment(): Promise<Flow[] | any> {
  try {
    const data = await client.get(DEPLOYMENT_ENDPOINT)
    return Promise.resolve(data)
  } catch (err) {
    return Promise.reject(err)
  }
}

async function postDeployment(body: any): Promise<Flow[] | any> {
  try {
    const data = await client.post(DEPLOYMENT_ENDPOINT, body)
    return Promise.resolve(data)
  } catch (err) {
    return Promise.reject(err)
  }
}

async function callNifiAgent(): Promise<Flow[] | any> {
  try {
    const data = await client.get(NIFI_AGENT_ENDPOINT)
    return Promise.resolve(data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export {
    postDeployment,
    callNifiAgent,
    getDeployment
}

