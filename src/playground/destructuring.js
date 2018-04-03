

const person = {
    name: 'Shawn',
    age: 39,
    location: {
        city: 'Columbia',
        temp: 92
    }
};

// const name = person.name;
// const age = person.age;
const {name, age} = person

console.log(`${name} is ${age}.`)

