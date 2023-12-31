/*
User Story: A visitor enters the website and finds a list of available freelancers. Each freelancer has a name, an occupation, and a starting price for their services. They observe on the list Alice, the writer with a starting price of $30, and Bob, who is a teacher, has a starting price of $50.

The visitor also finds a message that displays the average starting price of all the freelancers. In this example, the average starting price is $40.

A few seconds later, a new listing appears for a freelancer named Carol, who is a programmer and has a starting price of $70. The average starting price is updated to $50.

New freelancers continue to appear every few seconds, and the average starting price is updated accordingly.
*/

// Define various arrays for 'Names', 'Occupations', and 'Prices'
const names = ["Brian", "Paris", "Jared", "Colin", "Annie", "Jackie", "Zach", "Lisa", "David", "Allison", "Larry", "Andrea", "Brandon", "Crytstal", "Alicia"];
const occupations = ["Writer", "Teacher", "Painter", "Basketball Trainer", "Pilot", "Surgeon", "Dancer", "Rocket Scientist", "Florist", "Professional Bull Fighter"];
const prices = [30, 50, 70, 90, 110, 120, 140];
const maxFreeLancers = 10;
const freeLancers = [
    { name: "Alice",
      occupation: "Writer", 
      price: 30,
    },
    { name: "Bob",
     occupation: "Teacher", 
     price: 50,
    },
];
// create a new free lancer who will be added later.
const newFreeLancer = [
    { name: "Carol",
      occupation: "Programmer",
      price: 70,
    }
];
document.addEventListener("DOMContentLoaded", function() {
    render(); // this function is used to render the intial state.
const addFreeLancerIntervalId = setInterval(addFreeLancer, 3000); //This will call 'addFreeLancer' every 5 seconds and return an ID that will be used to stop the interval later.

function render() {
    const lancers = document.querySelector("#lancers");
    const freeLancerElements = freeLancers.map((freelancer) => {
        const element = document.createElement("li");
        const textNode = document.createTextNode(`${freelancer.name} is a ${freelancer.occupation} - their rate is ${freelancer.price}`);
        element.appendChild(textNode);
        element.classList.add(freelancer.name, freelancer.occupation, freelancer.price);
        return element;
    });

    const allFreeLancers = [...freeLancers, ...newFreeLancer];
    const totalPrices = allFreeLancers.reduce((sum, freelancer) => 
        sum + freelancer.price, 0);
    const averagePrice = totalPrices / allFreeLancers.length;

    const averageElement = document.querySelector("#averagePrice");
    averageElement.textContent = `Average Price: $${averagePrice.toFixed(2)}`;

    console.log(freeLancerElements);
    lancers.replaceChildren(...freeLancerElements);

    const newFreeLancerList = document.querySelector("#newFreeLancer");
    const newFreeLancerElements = newFreeLancer.map((freelancer) => {
        const element = document.createElement("li");
        const textNode = document.createTextNode(`${freelancer.name} is a new ${freelancer.occupation} - their rate is ${freelancer.price}`);
        element.appendChild(textNode);
       // element.classList.add(freelancer.name, freelancer.occupation, freelancer.price);
        return element;
    });

    console.log(newFreeLancerElements);
    newFreeLancerList.replaceChildren(...newFreeLancerElements);
}

function addFreeLancer() {
    const name = names[Math.floor(Math.random() * names.length)];
    const occupation = occupations[Math.floor(Math.random() * occupations.length)];
    const price = prices[Math.floor(Math.random() * prices.length)];

    newFreeLancer.push({ name, occupation, price });
    render();

    const allFreeLancers = [...freeLancers, ...newFreeLancer];
    const totalPrices = allFreeLancers.reduce((sum, freelancer) => 
        sum + freelancer.price, 0);
    const averagePrice = totalPrices / allFreeLancers.length;

    const averageElement = document.querySelector("#averagePrice");
    averageElement.textContent = `Average Price: $${averagePrice.toFixed(2)}`;

    if (newFreeLancer.length >= maxFreeLancers) {
        clearInterval(addFreeLancerIntervalId);
    }

}})
