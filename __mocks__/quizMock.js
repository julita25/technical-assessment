import { faker } from "@faker-js/faker";

export const generateFakeQuiz = () => ({
  quizId: faker.datatype.string(),
  quizName: faker.datatype.string(),
  imageUrl: faker.internet.url(),
  iconUrl: faker.internet.url(),
  questions: [
    {
      id: faker.datatype.string(),
      question: faker.lorem.sentence(),
      choices: {
        1: faker.commerce.productName(),
        2: faker.commerce.productName(),
        3: faker.commerce.productName(),
        4: faker.commerce.productName()
      },
      answerType: "SINGLE",
      points: faker.datatype.number(1)
    },
    {
      id: faker.datatype.string(),
      question: faker.lorem.sentence(),
      choices: {
        1: faker.commerce.productName(),
        2: faker.commerce.productName(),
        3: faker.commerce.productName(),
        4: faker.commerce.productName()
      },
      answerType: "SINGLE",
      points: faker.datatype.number(1)
    }
  ]
});
