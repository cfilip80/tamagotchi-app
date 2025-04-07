class Pet {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.energy = 50;
        this.fullness = 50;
        this.happiness = 50;
    }
    nap() {
        this.energy += 40;
        this.happiness -= 10;
        this.fullness -= 10;
        return `You took a nap with ${this.name}!`;
    }

    play() {
        this.happiness += 30;
        this.energy -= 10;
        this.fullness -= 10;
        return `You played with ${this.name}!`;
    }

    eat() {
        this.fullness += 30;
        this.happiness += 5;
        this.energy -= 15;
        return `You ate with ${this.name}!`;
    }
}