import { version } from "punycode";

export class User {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    sayName(): void {
        console.log(this.name)
    }
}