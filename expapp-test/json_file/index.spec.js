const request = require ("supertest");
const app = require('./index');



describe("Test todo methods", () => {
    it(`Returns all todos`, async () => {
        await request(app).get("/todo").expect(200).then((response) => {
            expect(response.body.length).toBe(3);
        });
       
    });
    it(`Returns a todo with id:${2}`, async () => {
        await request(app).get("/todo/2").expect(200).then((response) => {
            expect(response.body.name).toBe("Get pizza for dinner");
        });
       
    });
});
describe("Test responses from querying an external API", () => {
    it(`Should retrieve a random Chuck Norris joke`, async () => {
        let jokeResp = await request(app).get("/joke");
        let joke = JSON.parse(jokeResp.text);
        expect(joke.value).toBeTruthy();
       
    });
    it(`No 2 Chuck Norris jokes will be the same`, async () => {
        let joke1 = await request(app).get("/joke");
        let joke2 = await request(app).get("/joke");
        let j1 = JSON.parse(joke1.text);
        let j2 = JSON.parse(joke2.text);
        expect((j1.value === j2.value)).toBeFalsy();
        
    });
})

//take port out and put it in different file
//Server.js
// const app = require('./index')
// const port = 3000;

// app.listen(port, () => {
//     console.log(`Listening on port => ${port}`);
// });
// Package.json - change main: “server.js”


