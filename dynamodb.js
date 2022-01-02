const REGION = "eu-west-3";

const {
    DynamoDBClient,
    ListTablesCommand,
    QueryCommand,
    PutItemCommand,
    GetItemCommand,
    ScanCommand,
} = require("@aws-sdk/client-dynamodb");
const dynamoDBClient = new DynamoDBClient({ region: REGION });


const listTablesCommand = async () => {
    let data = {};
    const params = {

    }
    const command = new ListTablesCommand(params);
    data = await dynamoDBClient.send(command);

    console.log(data)
}

const queryCommand = async () => {
    let data = {};
    const params = {
        TableName: 'newsTable',
        KeyConditions: {
            guid: {
                ComparisonOperator: 'EQ',
                AttributeValueList: [{ 'S': 'abcde12345' }],
            },
        },
        ReturnConsumedCapacity: 'TOTAL',
    }
    const command = new QueryCommand(params);
    data = await dynamoDBClient.send(command);

    console.log(data)
}

const putItemCommand = async () => {
    let data = {};
    const params = {
        TableName: 'newsTable',
        Item: {
            "guid": { "S": "abcde12345" },
            "pubdate": { "N": new Date().getTime().toString() },
            "title": { "S": "First post in this thread" },
            "LastPostedBy": { "S": "fred@example.com" },
            "LastPostDateTime": { "S": "201603190422" }
        },
        ReturnConsumedCapacity: 'TOTAL',
    }
    const command = new PutItemCommand(params);
    data = await dynamoDBClient.send(command);

    console.log(data)
}

const getItemCommand = async () => {
    let data = {};
    const params = {
        TableName: 'newsTable',
        Key: {
            guid: {
                'S': 'abcde12345'
            },
            pubdate: {
                'N': '1631934723301'
            }
        },
        ReturnConsumedCapacity: 'TOTAL',
    }
    const command = new GetItemCommand(params);
    data = await dynamoDBClient.send(command);

    console.log(data)
}

const scanCommand = async () => {
    let data = {};
    const params = {
        TableName: 'newsTable',
        ReturnConsumedCapacity: 'TOTAL',
        FilterExpression: "#pubdate > :ymd",
        ExpressionAttributeNames: {
            "#pubdate": "pubdate",
        },
        ExpressionAttributeValues: {
            ":ymd": { 'N': '1600000000000' },
        }
    }
    const command = new ScanCommand(params);
    data = await dynamoDBClient.send(command);

    console.log(data.Items)
}

scanCommand();