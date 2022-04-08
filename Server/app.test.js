const request = require('supertest');
const {app, readJSON, writeJSON} = require('./app');
const fs = require('fs');
const path = require('path');
const { send } = require('process');

let testReview = {
    id: 0,
    title: "Name of a coffee shop",
    description: "Description of the coffee shop",
    content: "Review of the coffee shop",
    gif: "",
    reaction: {
        like: 0,
        clap: 0,
        love: 0
    },
    comments: []
};
let reviews = [];

describe('API Server', () => {
    let api;
    let reviews = [];
    let testReview = {
        id: reviews.length,
        title: "Name of a coffee shop",
        description: "Description of the coffee shop",
        content: "Review of the coffee shop",
        gif: "",
        reaction: {
            thumbs: 0,
            heart: 0,
            coffee: 0
        },
        comments: []
    };
    

    let testComment = {
        id: 0,
        comments: ["This is a test comment"]
    };
    let emptyComment = {};

//test server running
    beforeAll(() => {
    api = app.listen(5000, () => {
        console.log('Test server running at port 5000!');
    });
});

//test server stopping
    afterAll((done) => {
        api.close(done);
        console.log('Gracefully stopping test server');
    });

//test home route
    it('responds to get / with a status 200', (done) => {
        request(api).get('/').expect(200, done);
    });

//test reviews route
    it('responds to get /reviews with a status 200', (done) => {
        request(api).get('/reviews').expect(200, done);
    });
    it('responds with a string', () => {
        expect(String);
    })

//test reviews by id route
describe('reviews by id', () => {
    it('retrieves review by id', async () => {
        const testReviewId = testReview.id
        const res = await request(api).get(`/reviews/${testReviewId}`);
        expect(200);
        expect(JSON.stringify(testReview));
        });
     //test that invalid ids return an error
     it('responds to out of range ids with status 404 and error message', async () => {
         let outOfRange = reviews.length + 1;
         const res = await request(api).get(`/reviews/${outOfRange}`);
         expect(404);
         expect('Please enter a valid id');
         });
})

//test post new review
   it('responds to post /reviews/newreview with status 201', async () => {
        const res = await request(api).post('/reviews/newreviews').send(testReview)
        expect(201);     
    });
    it('repsonds with stringified data', () => {
        expect(String);   
    });
    //test if the comment is pushed to the comments array
    //it('pushes new review to the reviews array', async () => {
    //    const res = await request(api).post('/reviews/newreview').send(testReview)
    //    expect(reviews.length).toBe(1);
    //});

//test get emoji route
    it('gets /emoji', () => {
        request(api).get('/emoji').expect(200,'hello');
    })

//test new comment
    describe('post new comment endpoint', () => {
        it('responds to post /reviews/newcomment with status 201', async () => {
            const res = await request(api).post('/reviews/newcomment').send(testComment)
            expect(201);
        });
        it('repsonds with stringified data', () => {
            expect(String);   
        });
    //test if the comment is pushed to the comments array
        it('pushes new comment to the comments array', async () => {
            const res = await request(api).post('/reviews/newcomment').send(testComment)
            expect(testComment.comments.length).toBe(1);
        });
    //test that an empty comment returns an error and error message
        it('returns an error if no comment is entered', async () => {
            const res = await request(api).post('/reviews/newcomment').send(emptyComment)
            expect(200);
            expect('Please add a comment');
        });
  
    });

});

describe('helperFunctions', () => {
      it('stringify works', () => {
        const jsonString = JSON.stringify(testReview)
        expect(String);
        }) 
        it('readJSON is defined', () => {
            expect(readJSON).toBeDefined();
        })
        it('read File', () => {
            const spyfs = jest.spyOn(fs, 'readFile');
            readJSON();
            expect(spyfs).toHaveBeenCalled();
        });



     // it('readJSON returns parsed data', () => {
     //       expect(readJSON('./reviews.json')).toBe();
     //      });

        it('writeJSON is defined', () => {
            expect(writeJSON).toBeDefined();
        })
       // it('writeJSON')
       

})

