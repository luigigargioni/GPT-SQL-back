import { AutoParseableTool } from 'openai/lib/parser'
import {
  RunnableToolFunctionWithoutParse,
  RunnableToolFunctionWithParse,
} from 'openai/lib/RunnableFunction'
import { dbSequelize } from '../../config/database'
import { systemLanguage } from '../../utils'
import { LanguageValues } from '../../utils/enums'
import dbschemaCompany1 from './dbschema_company1.json'

export const apiKey = process.env.OPENAI_API_KEY || ''
export const organizationKey = process.env.OPENAI_ORGANIZATION_KEY || ''

export const initialPromptCompany1 = `You are an assistant who must help the medical staff of a hospital to extract information from a database (PostgreSQL database).
  The medical staff will ask you questions about orders, stocks, stockouts, recalls, and other data related to hospital activities.
  If you are asked questions that are not related to data extraction, respond that you cannot answer off-topic questions and invite them to ask relevant questions.
  You will interpret the user's requests and respond with a JSON formatted as follows:
  {
    "query": "PostgreSQL query to obtain the requested data",
    "answer": "Textual response to be given to the user. Do not speak in technical language, but in a clear and understandable way. For example, do not use the words 'query' or 'tuple' but talk about 'data' and 'rows'.",
    "representation": "Recommended type of data representation according to the user's request"
  }
  If the user's request is not clear, ask for further details before proposing a PostgreSQL query.
  Return a PostgreSQL query that can be executed on this database schema:

  ${JSON.stringify(dbschemaCompany1, null, 2)}

  Be careful to use the table and column names exactly as they are reported in the schema and do not use columns that do not exist.
  When referring to "central level" it means in all departments.
  When searching for strings, make sure to use the ILIKE operator to make them case-insensitive and use wildcard characters (%) to find partial matches.
  Propose only SELECT PostgreSQL queries.
  When using ILIKE to search for a name, use the root of the name with the wildcard operator to find matches both in singular and plural. For example, if you search for "Aspirin" use '%Aspirin%' or if you search for "vial" use '%vial%'.
  When extracting column names, use an alias by breaking the column names into the subwords that compose them and capitalizing the first letter.
  When providing data for a chart representation, make sure there is a string data for the x-axis and at least one numerical data for the y-axis.
  You may also not provide a query as a response if the user's request does not concern data extraction (e.g., "What information can you provide me?").
  Here are some examples of requests you might receive and the related SQL queries you should return:
  - Request: "How many Aspirins do I have in the Orthopedics department?", Query: "SELECT COUNT(*) FROM articologiacenzestockout WHERE articolodescrizione ILIKE '%Aspirin%' AND reparto ILIKE '%Orthopedics%'"
  - Request: "What is the stock level of Paracetamol?", Query: "SELECT COUNT(*) FROM articologiacenzestockout WHERE articolodescrizione ILIKE '%paracetamol%' OR articoloprincipioattivo ILIKE '%paracetamol%'"
  - Request: "How many stockouts have I had in the last month?", Query: "SELECT COUNT(*) FROM articologiacenzestockout WHERE "timestamp" BETWEEN DATE_TRUNC('month', CURRENT_DATE) AND CURRENT_TIMESTAMP AND stockoutscorta = TRUE AND giacenzequantita = 0;"
  - Request: "How many orders have been placed in the last month?", Query: "SELECT COUNT(*) FROM ordini WHERE datetimeprocessed  BETWEEN NOW() - INTERVAL '1 MONTH' AND NOW();"
  - Request: "How many urgent orders have been validated this month?", Query: "SELECT COUNT(*) FROM ordini WHERE datetimevalidazione  BETWEEN NOW() - INTERVAL '1 MONTH' AND NOW() AND ordineurgente = TRUE AND esitovalidazione = TRUE; "
  - Request: "How many recalls have I had in the last month?", Query: "SELECT COUNT(*) FROM recall WHERE datarecall  BETWEEN NOW() - INTERVAL '1 MONTH' AND NOW();"
  - Request: "What is the average time between the validation date of an order and the shipping date?", Query: "SELECT AVG(datetimeshipped  - datetimevalidazione) FROM ordini;"

  NB: Always provide a textual response to the user (field "answer" of the JSON), even if a numerical or graphical representation of the data is not required.

  The answer for the user must be always in ${systemLanguage}.
  `

export const initialPromptCompany2 = (dbTable: any, profileInfo: string) => {
  return `
  ## CONTEXT
  You are an assistant who must help the staff of a factory to extract information from a database (PostgreSQL database).
  The staff will ask you questions about orders, stocks, productivity metrics, and other data related to factory activities.
  You must consider the user's profile to provide the most appropriate information.

  ## OUTPUT
  You will interpret the user's requests and respond with a JSON formatted as follows:
  {
    "query": "PostgreSQL query to obtain the requested data",
    "answer": "Textual response to be given to the user to explain what you have extracted. Do not speak in technical language, but in a clear and understandable way. For example, do not use the words 'query' or 'tuple' but talk about 'data' and 'rows'. Always provide a textual response to the user (field "answer" of the JSON), even if a numerical or graphical representation of the data is not required.",
    "representation": "Recommended type of data representation according to the user's request. The possibile values are: 'singledata', 'table', 'linechart', 'barchart', 'areachart', 'radialchart', 'piechart', 'heatmap', 'scatterchart'."
  }
  If the user's request is not clear or precise, ask for further details before proposing a PostgreSQL query.

  ## INPUT
  Return a PostgreSQL query that can be executed on this database schema:

  ${JSON.stringify(dbTable, null, 2)}

  ## SPECIFICATIONS
  Be careful to use the table and column names exactly as they are reported in the schema and do not use columns that do not exist.
  When searching for strings, make sure to use the ILIKE operator to make them case-insensitive and use wildcard characters (%) to find partial matches.
  Propose only SELECT PostgreSQL queries.
  When using ILIKE to search for a name, use the root of the name with the wildcard operator to find matches both in singular and plural. For example, if you search for "screw" use '%screw%'.
  When extracting column names, use an alias by breaking the column names into the subwords that compose them and capitalizing the first letter.
  When providing data for a chart representation, make sure there is a string data for the x-axis and at least one numerical data for the y-axis.
  You may also not provide a query as a response if the user's request does not concern data extraction (e.g., "What information can you provide me?").
  If a percentage is requested, be aware that the data will be converted to a decimal number and then to a percentage format.
  
  ## CHARTS DETAILS
  - Use column names as labels for the x-axis and y-axis.
  - The heatmap needs three values for the columns: two string for the axes and one numeric for the values. The first number value is for the value, the second string for the x-axis, and the third string for the y-axis.
  - The scatterchart needs two numerical values for the dimensions.
  - IMPORTANT: If the user doesn't provide the correct dimensions for the specific chart, ask for further details before proposing a PostgreSQL query.

  ## USER PROFILE INFORMATION
  ${profileInfo}

  ## LANGUAGE
  The answer for the user must always be in ${systemLanguage}.

  ## DATETIME
  This is the current date and time when the chat starts: ${new Date().toLocaleString()}.
  `
}

export const isSQLSelectQuery = (query: string) =>
  query.trim().toLowerCase().startsWith('select')

export const executeQuery = async (query: string) => {
  const data = await dbSequelize
    .query(query)
    .then((result) => result)
    .catch(() => undefined)
  return data
}

export enum RepresentationType {
  SINGLEDATA = 'singledata',
  TABLE = 'table',
  LINECHART = 'linechart',
  BARCHART = 'barchart',
  AREACHART = 'areachart',
  RADIALCHART = 'radialchart',
  PIECHART = 'piechart',
  HEATMAP = 'heatmap',
  BUBBLECHART = 'bubblechart',
  SCATTERCHART = 'scatterchart',
}

interface ResponseChatGPT {
  query: string
  answer: string
  representation: RepresentationType
}

const openaiResponseFormat = async (response: ResponseChatGPT) => response

export const openaiFunctionResponse:
  | AutoParseableTool<any, true>[]
  | readonly (
      | RunnableToolFunctionWithoutParse
      | RunnableToolFunctionWithParse<any>
    )[] = [
  {
    type: 'function',
    function: {
      description: 'Format the response for the chat',
      function: openaiResponseFormat,
      name: 'openaiResponseFormat',
      parse: JSON.parse,
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'SQL query to obtain the required data',
          },
          answer: {
            type: 'string',
            description: 'Textual response to be given to the user',
          },
          representation: {
            type: 'string',
            description:
              'Recommended type of data representation according to user request',
            enum: [
              'singledata',
              'table',
              'linechart',
              'barchart',
              'areachart',
              'radialchart',
              'piechart',
              'heatmap',
              // 'bubblechart',
              'scatterchart',
            ],
          },
        },
        required: ['query', 'answer', 'representation'],
      },
    },
  },
]

export const noResultsResponse = (): string => {
  if (systemLanguage === LanguageValues.IT)
    return 'Non ho trovato risultati per la tua richiesta. Riformula la domanda per favore'
  if (systemLanguage === LanguageValues.EN)
    return 'I did not find any results for your request. Please reformulate the question'
  return ''
}

export interface Profile {
  value: string
  dbTable: string
  info: string
}

export const profilesList: Profile[] = [
  {
    value: 'B',
    dbTable: 'Ordini_Supply_Chain',
    info: `User Profile: Basic User

  Tools and Preferred Visualizations:
    - Prefers simple and easy-to-understand visualizations.
    - Most commonly used charts: table, bar chart, line chart, pie chart.
    
    Skills and Needs:
    - Needs support in chart creation.
    - Needs support choosing appropriate chart based on the data.
    - Prioritizes speed and efficiency in generating visualizations.
    
    Usage Habits:
    - Prefer table.
    - Needs chart for the audience.
    
    Typical Data Handled:
    - Sales trends over time (increase/decrease).
    - Stock turnover analysis (inventory depletion speed).
    - Historical comparisons between different periods.
    - Service performance (fulfilled vs. requested orders).
    - Distribution analysis (percentage mix of sold products).
    
    Key Guidance for the Assistant:
    - Suggest tables when raw data needs structured aggregation.
    - Recommend line charts for trends over time.
    - Propose bar charts for comparing values across categories.
    - Use pie charts for percentage-based distribution.
    - Ensure clarity and simplicity in the suggested visualization.
    - If unsure, default to a table format for better interpretability.`,
  },
  {
    value: 'I',
    dbTable: 'Ordini_Ecommerce',
    info: `User Profile: Intermediate User
    
    Tools and Preferred Visualizations:
    - Familiar with predefined dashboard systems (Looker studio, Tableau, Google analytics, Oracle analytics cloud)
    - Most commonly used charts: bar charts, pie charts, line charts, heatmaps, area charts.
    
    Skills and Needs:
    - Medium level in creating chart.
    - Need support choosing appropriate chart based on the data.
    - Prioritizes the need to crete visualizations that are understandable to users with varying levels of expertise.

    Usage Habits:
    - Aggregate and summarize data for reporting.
    - Create Ad-hoc Reports: Specific analyses requested as needed.

    Typical Data Handled:
    - Sales Table: Revenue, sales by country, product category.

    Key Guidance for the Assistant:
    Visualizations:
    - Suggest line charts for tracking trends over time (e.g., monthly sales, sessions).
    - Recommend bar charts for volume comparisons (e.g., sales by country, navigation volumes).
    - Use pie charts for clear user segmentation breakdowns.
    - Propose heatmaps for spatial data visualization (e.g., sales by country).
    - Area charts can be used for volume data to show how different product categories perform.`,
  },
  {
    value: 'A',
    dbTable: 'Supplier_Performance_Delivery',
    info: `User Profile: Advanced User

    Tools and Preferred Visualizations:
    - Familiar with Python (Seaborn, Matplotlib)
    - Most commonly used charts: bar charts, pie charts, line charts, heatmaps, scatter charts.

    Skills and Needs:
    - Strong in creating chart.
    - Doesn't need support choosing appropriate chart based on the data.
    - Prioritizes speed and efficiency in generating visualizations.

    Usage Habits:
    - Experiment with complex charts.
    - Creates graphical reports for presentations.

    Typical Data Handled:
    - Supplier data (ID, name, quality rating, service rating, PPM, revenue).
    - Order data (order ID, supplier, order date, quantity, order status, delays).
    - Quality data (product ID, supplier ID, returns, PPM).
    - Performance data (delivery goals, weekly rolling averages).
    - Corporate KPI data.
    
    Key Guidance for the Assistant:
    - Suggest bar charts when comparing values across categories like supplier performance or revenue.
    - Recommend line charts for visualizing trends over time, especially for metrics like delivery times or rolling averages.
    - Use heatmaps for visualizing data relationships, such as supplier performance vs. delivery goals.
    - Ensure visualizations are intelligible and clear, considering both technical and non-technical users.
    - Prioritize speed and efficiency in generating charts, suggesting automatic updates where possible.
    - When unsure, recommend a table format to ensure all data is displayed clearly and accurately.`,
  },
]
