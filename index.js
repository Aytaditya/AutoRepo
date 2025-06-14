import {OpenAI} from 'openai'
import { configDotenv } from 'dotenv'
import {exec} from 'node:child_process' // to execute shell commands

configDotenv()
const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY})


async function addTwoNumbers(a,b){
    return a+b;
}

async function getWeatherInfo(city){
    city=city.toLowerCase()
    const weatherData = {
        'paris': '10 Degrees C',
        'new york': '15 Degrees C',
        'tokyo': '20 Degrees C'
    };
    return weatherData[city] || 'Weather data not available';
}

function executeCommand(command){
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${error.message}`);
            } else if (stderr) {
                reject(`Error: ${stderr}`);
            } else {
                resolve(`stdout: ${stdout}\nstderr: ${stderr}`);
            }
        });
    }
)}



const SYSTEM_PROMPT=`
    You are a helpfull AI assistant who is designed to resolve user queries. 
    You work on START, THINK, ACTION, OBSERVE and OUTPUT mode. 

    In the START phase, user gives a query to you. 
    Then, you THINK how to resolve that query atleast 3-4 times and make sure all is clear. 
    If there is a need to call a tool, you call an ACTION event with tool and input parameters.
    if there is an action call, wait for the OBSERVE that is output of the tool. 
    Based on the observation of previous step output or repeat the loop.

    Rules:
    - always wait for next step. 
    - always output a single step and wait for next step.
    - Output must be stricltly JSON.
    - Only call tool action for available tools only. 
    - Strictly follow the output format in JSON.

    Avaiable tools:
    -addTwoNumbers(x:number, y:number): This tool adds two numbers and returns the result.
    -getWeatherInfo(city:string): This tool returns the weather information of the given city.
    -executeCommand(command:string): This tool executes a shell command and returns the output.

    Example:
    START: What is weather in Paris?
    THINK: The user is asking for weather of Paris. 
    THINK: From the available tools, i must call getWeatherInfo tool with Paris as input.
    ACTION: getWeatherInfo('Paris')
    OBSERVE: 10 Degrees C
    THINK: The output of getWeatherInfo is 10 Degrees C.
    OUTPUT: The weather in Paris is 10 Degrees C.

    OUTPUT EXAMPLE:
    {"role":"user", "content":"What is the weather in Paris?"}
    {"step": "think", "content": "User is asking for weather in Paris."}
    {"step": "think", "content": "from the available tools, i must call getWeatherInfo tool with Paris as input."}
    {"step": "action", "tool": "getWeatherInfo", "input": "Paris"}
    {"step": "observe", "content": "10 Degrees C"}
    {"step": "think", "content": "The output of getWeatherInfo is 10 Degrees C."}
    {"step": "output", "content": "The weather in Paris is 10 Degrees C."}
    

    OUTPUT FORMAT: 
    {"step": "string", "tool":"string", "input": "string", "content": "string"}

`

const messages=[
    {
        role: 'system',
        content: SYSTEM_PROMPT,
    },
]

//const user_query='Create a todo folder and create a todo app using html, css and javascript. Also create a readme file with instructions to run the app. also keep ui very good' 

const user_query='Create a folder weather and create a weather app using react+vite.The app should show the weather of Paris, New York and Tokyo. The app should have a good UI.'

messages.push({'role': 'user', 'content': user_query})

while(true){
    const res = await client.chat.completions.create({
        model: 'gpt-4.1',
        response_format:{type: 'json_object'},
        messages: messages,
    })
    messages.push({'role':'assistant', 'content': res.choices[0].message.content})
    const parsed_res = JSON.parse(res.choices[0].message.content) // to access individual fields we need to parse the response

    if(parsed_res.step && parsed_res.step === 'output'){
        console.log(parsed_res.content)
        break; 
    } 
    else if( parsed_res.step && parsed_res.step === 'think'){
        console.log(parsed_res.content)
        continue;
    }
    else if(parsed_res.step === 'action'){
        // caling action tool 
        if(parsed_res.tool === 'addTwoNumbers'){
            // converting ["5", "10"] → [5, 10] using split and map
            const result = await addTwoNumbers(...parsed_res.input.split(',').map(Number))
            messages.push({'role': 'assistant', 'content': `{"step": "observe", "content": "${result}"}`})
        } else if(parsed_res.tool === 'getWeatherInfo'){
            const result = await getWeatherInfo(parsed_res.input)
            messages.push({'role': 'assistant', 'content': `{"step": "observe", "content": "${result}"}`})
        }
        else if(parsed_res.tool === 'executeCommand'){
            const result = await executeCommand(parsed_res.input)
            messages.push({'role': 'assistant', 'content': `{"step": "observe", "content": "${result}"}`})
        }
    }
}

 async function main() {
    const response = await client.chat.completions.create({
        model: 'gpt-4.1',
        response_format:{type: 'json_object'},
        messages: [
        {
            role: 'system',
            content: SYSTEM_PROMPT,
        },
        {
            role: 'user',
            content: 'What is the weather in new York?',
        },
        {
            role: 'assistant',
            content: '{"step": "think", "tool": "", "input": "", "content": "User is asking for the weather in New York."}'
        },
        {
            role: 'assistant',
            content: '{"step": "think", "tool": "", "input": "", "content": "From the available tools, I must call getWeatherInfo tool with New York as input."}'
        },
        ],
    })
    
    console.log(response.choices[0].message.content)
    }

