let objectString = "{\n" +
    "\"date\": \"2020-03-08\",\n" +
    "\"description\": \"Dzień Kobiet\"\n" +
    "}";

console.log(typeof objectString);
console.log(objectString.date);

const event = JSON.parse(objectString);

const anotherEvent = {
    "date": "2020-09-30",
    "description": "Dzień chłopaka"
}

console.log(`${event.date}, ${event.description}`);
console.log(`${anotherEvent.date} ${anotherEvent.description}`)

console.log(typeof event)
console.log(typeof anotherEvent)

console.log(JSON.stringify(anotherEvent).toUpperCase())