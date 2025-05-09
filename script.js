class Pet {
    constructor(name, type) {
        this.name = name;
        this.type = type.toLowerCase();
        this.imageState = 'default';
        this.energy = 50;
        this.fullness = 50;
        this.happiness = 50;
        this.timer = null;
    }

    nap() {
        this.energy += 40;
        this.happiness -= 10;
        this.fullness -= 10;
        this.imageState = 'sleep';
        return `You let ${this.name} sleep!`;
    }

    play() {
        this.happiness += 30;
        this.energy -= 10;
        this.fullness -= 10;
        this.imageState = 'play';
        return `You played with ${this.name}!`;
    }

    eat() {
        this.fullness += 30;
        this.happiness += 5;
        this.energy -= 15;
        this.imageState = 'eat';
        return `You fed ${this.name}!`;
    }

    startTimer(callback) {
        this.timer = setInterval(() => {
            this.energy -= 15;
            this.fullness -= 15;
            this.happiness -= 15;
            callback();
        }, 10000);
    }

    stopTimer() {
        clearInterval(this.timer);
    }

    isAlive() {
        return this.energy > 0 && this.fullness > 0 && this.happiness > 0;
    }
}

class Dog extends Pet {
    constructor(name) {
        super(name, 'dog');
    }
}
class Cat extends Pet {
    constructor(name) {
        super(name, 'cat');
    }
}
class Rabbit extends Pet {
    constructor(name) {
        super(name, 'rabbit');
    }
}
class Bird extends Pet {
    constructor(name) {
        super(name, 'bird');
    }
}

class PetManager {
    constructor() {
        this.pets = [];
        this.maxPets = 4;
        this.historyElement = document.getElementById("history");
        this.container = document.getElementById("pets");
    }

    createPet(name, type) {
        if (this.pets.length >= this.maxPets) return alert("Max 4 husdjur!");
        if (!name) return alert("Ange ett namn!");

        let pet;
        switch (type) {
            case "Dog": pet = new Dog(name); break;
            case "Cat": pet = new Cat(name); break;
            case "Rabbit": pet = new Rabbit(name); break;
            case "Bird": pet = new Bird(name); break;
        }

        this.pets.push(pet);
        pet.startTimer(() => this.updatePets());
        this.renderPets();
    }

    performAction(index, action) {
        const pet = this.pets[index];
        if (!pet) return;

        let message = "";
        if (action === 'nap') message = pet.nap();
        else if (action === 'play') message = pet.play();
        else if (action === 'eat') message = pet.eat();

        this.addHistory(message);
        this.updatePets();
    }

    updatePets() {
        this.pets = this.pets.filter(pet => {
            if (!pet.isAlive()) {
                this.addHistory(`${pet.name} ran away!`);
                pet.stopTimer();
                return false;
            }
            return true;
        });
        this.renderPets();
    }

    renderPets() {
    let html = "";
    this.pets.forEach((pet, index) => {
        const imageFileName = `${pet.type.toLowerCase()}-${pet.imageState}.gif`;

        html += `
            <div class="col-md-3 mb-4 d-flex">
                <div class="card shadow-sm text-center h-100">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h5 class="card-title">${pet.name}</h5>
                            <div class="image-wrapper">
                                <img src="img/${imageFileName}" alt="${pet.type}">
                            </div>
                        </div>
                        <div>
                            <p class="card-text">Energy: ${pet.energy}</p>
                            <p class="card-text">Fullness: ${pet.fullness}</p>
                            <p class="card-text">Happiness: ${pet.happiness}</p>
                            <div class="d-flex justify-content-center gap-2 flex-wrap mt-auto">
                                <button class="btn btn-outline-secondary btn-sm" onclick="app.performAction(${index}, 'nap')">Sleep</button>
                                <button class="btn btn-outline-success btn-sm" onclick="app.performAction(${index}, 'play')">Play</button>
                                <button class="btn btn-outline-primary btn-sm" onclick="app.performAction(${index}, 'eat')">Eat</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    this.container.innerHTML = html;
}

    addHistory(message) {
        this.historyElement.innerHTML = message + "<br>" + this.historyElement.innerHTML;
    }
}

const app = new PetManager();

function createPet() {
    const name = document.getElementById("petName").value;
    const type = document.getElementById("animalType").value;
    app.createPet(name, type);
}