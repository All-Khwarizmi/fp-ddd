# FP-DDD

The `fp-ddd` is a TypeScript library designed to offer a solid foundation for working with **Domain-Driven Design (DDD)** concepts such as entities, value objects, and aggregates. This package leverages the power of functional programming to ensure immutability and robust domain validation through the use of fp-ts and lodash.

## Features

- Entity Base Class: Abstract class for creating entities that are distinct by their state.
- Value Object Base Class: Abstract class for creating value objects which are immutable and validated upon creation.

## Installation
Install the package using npm:
    
```bash
    npm install fp-ddd
```


## Usage

Below are simplified examples of how you might implement and utilize the base classes provided by `fp-ddd`.

### Creating an Entity

```typescript
import { Entity } from 'fp-ddd';
import { Either } from "fp-ts/lib/Either";
import Failure from "./failure";

class User extends Entity<UserProps> {
  constructor(public readonly values: Either<Failure<UserProps>, UserProps>) {
    super();
  }

  get name(): string {
    return this.getOrCrash().name;
  }
}

// Usage
const user = new User(right({ name: 'John Doe', email: 'john@example.com' }));
console.log(user.name); // Outputs: John Doe
```

### Creating a Value Object

```typescript
import { ValueObject } from 'fp-ddd';
import { Either, right } from "fp-ts/lib/Either";
import Failure from "./failure";

class Email extends ValueObject<string> {
  constructor(public readonly value: Either<Failure<string>, string>) {
    super();
  }

  get email(): string {
    return this.getOrCrash();
  }
}

// Usage
const email = new Email(right('john@example.com'));
console.log(email.email); // Outputs: john@example.com
```

## API Reference
- isValid(): Checks if the contained value passes the domain rules.
- getOrCrash(): Forcibly extracts the value or throws an error if the validation fails.
- isEqual(other): Compares two instances to determine if they are equal based on their state.

## Background
### The Fusion of Functional Programming and Domain-Driven Design
Functional Programming (FP) and Domain-Driven Design (DDD) are two powerful paradigms in software development that, when combined, offer a robust approach to building scalable, maintainable, and business-focused software systems.

**Functional Programming (FP)** is a programming paradigm that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data. It promotes a declarative coding style, where the focus is on "what to solve" rather than "how to solve it." FP brings several benefits to software development, including more predictable code, easier testing, and improved modularity.

**Domain-Driven Design (DDD)** is a methodology for developing software that meets core business objectives by modeling software after real-world business domains. DDD emphasizes understanding the domain deeply and reflecting this understanding in the software architecture, helping to create software that is deeply aligned with the business needs and terminology.

When combined, **FP and DDD** offer a unique advantage: the clarity, simplicity, and immutability of FP complement the rich, model-driven focus of DDD. This synergy helps to:

- **Enhance Domain Modeling:** The immutable nature of FP aligns well with the concept of Value Objects in DDD, making it easier to reason about the state changes within the domain.
- **Reduce Side Effects:** FP's emphasis on pure functions minimizes side effects, which is critical in complex domain models where unexpected state changes can lead to bugs.
- **Improve Code Base Scalability and Maintainability:** The modular nature of FP, combined with the strategic design enforced by DDD, results in a codebase that is easier to extend and maintain.
The `fp-ddd` package is designed to leverage the strengths of both paradigms. It provides foundational classes and utilities that facilitate the implementation of domain models, ensuring that your software not only meets the technical best practices of FP but also aligns closely with your business strategies through DDD.

By using `fp-ddd`, developers can focus more on the strategic design of their domain while benefiting from the safety and robustness offered by functional programming.

## Contributing
Contributions are welcome! Please feel free to submit pull requests or open issues to discuss proposed changes or enhancements.

## License
This project is licensed under the MIT License - see the LICENSE file for details.