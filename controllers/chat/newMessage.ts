import { Request, Response } from 'express'
import OpenAI from 'openai'
import {
  ChatCompletionAssistantMessageParam,
  ChatCompletionSystemMessageParam,
  ChatCompletionUserMessageParam,
} from 'openai/resources'

import { errorResponse, successResponse } from '../../response'
import {
  RepresentationType,
  apiKey,
  executeQuery,
  initialPromptCompany1,
  initialPromptCompany2,
  isSQLSelectQuery,
  noResultsResponse,
  openaiFunctionResponse,
  organizationKey,
  profilesList,
} from './utils'
import dbschemaCompany2 from './dbschema_company2.json'

type ChatLogType =
  | ChatCompletionAssistantMessageParam
  | ChatCompletionSystemMessageParam
  | ChatCompletionUserMessageParam

interface ResponseChatGPT {
  query: string
  answer: string
  representation: RepresentationType
}

interface ChatResponse {
  chatLog: ChatLogType[]
  response: ResponseChatGPT
  data: any[] | number | null
}

export const newMessage = async (req: Request, res: Response) => {
  try {
    const { message, chatLog, profile } = req.body

    const openai = new OpenAI({
      apiKey,
      organization: organizationKey,
    })

    const newChatLog: ChatLogType[] = []

    if (chatLog.length === 0) {
      const selectedProfile = profilesList.find((p) => p.value === profile)
      const filteredDbSchema = Object.keys(dbschemaCompany2)
        .filter((key) => key === selectedProfile.dbTable)
        .reduce((obj, key) => {
          obj[key] = dbschemaCompany2[key]
          return obj
        }, {})
      newChatLog.push({
        role: 'system',
        // content: initialPromptCompany1,
        content: initialPromptCompany2(filteredDbSchema, selectedProfile.info),
      })
    } else {
      newChatLog.push(...chatLog)
    }

    newChatLog.push({
      role: 'user',
      content: message,
    })

    const runner = openai.beta.chat.completions.runTools({
      messages: newChatLog,
      model: 'gpt-4o-mini',
      tool_choice: {
        type: 'function',
        function: { name: 'openaiResponseFormat' },
      },
      tools: openaiFunctionResponse,
      temperature: 0.2,
    })

    const chatCompletion = await runner.finalFunctionCallResult()
    const chatCompletionJson = JSON.parse(chatCompletion) as ResponseChatGPT

    const newMessageJson = {
      answer: chatCompletionJson.answer,
      query: chatCompletionJson.query,
      representation: chatCompletionJson.representation,
    }

    newChatLog.push({
      role: 'assistant',
      content: chatCompletion || '',
    })

    if (!newMessageJson.query) {
      successResponse(res, {
        chatLog: newChatLog,
        response: {
          answer: newMessageJson.answer,
          representation: null,
          query: null,
        },
        data: null,
      })
      return
    }

    if (!isSQLSelectQuery(newMessageJson.query)) {
      successResponse(res, {
        chatLog: newChatLog,
        response: {
          query: newMessageJson.query,
          representation: null,
          answer: noResultsResponse(),
        },
        data: null,
      })
      return
    }

    const extractedData = await executeQuery(newMessageJson.query)
    if (extractedData === undefined || extractedData[0].length === 0) {
      successResponse(res, {
        chatLog: newChatLog,
        response: {
          query: newMessageJson.query,
          representation: null,
          answer: noResultsResponse(),
        },
        data: null,
      })
      return
    }

    let resultData = extractedData
    if (
      newMessageJson.representation === RepresentationType.TABLE ||
      newMessageJson.representation === RepresentationType.LINECHART ||
      newMessageJson.representation === RepresentationType.BARCHART ||
      newMessageJson.representation === RepresentationType.AREACHART ||
      newMessageJson.representation === RepresentationType.RADIALCHART ||
      newMessageJson.representation === RepresentationType.PIECHART ||
      newMessageJson.representation === RepresentationType.HEATMAP ||
      newMessageJson.representation === RepresentationType.BUBBLECHART ||
      newMessageJson.representation === RepresentationType.SCATTERCHART
    ) {
      resultData =
        extractedData && extractedData.length > 0 ? extractedData[0] : []
    }
    if (newMessageJson.representation === RepresentationType.SINGLEDATA) {
      const [data] = extractedData
      const [resultObject] = data
      if (!data) {
        resultData = null
      } else {
        const [firstValue] = Object.values(resultObject)
        resultData = firstValue
      }
    }

    const response: ChatResponse = {
      chatLog: newChatLog,
      response: {
        query: newMessageJson.query,
        answer: newMessageJson.answer,
        representation: newMessageJson.representation,
      },
      data: resultData,
    }
    successResponse(res, response)
  } catch (err) {
    errorResponse(res, err)
  }
}
