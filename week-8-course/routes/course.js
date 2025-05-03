const { Router } = require('express');
const courseRouter = Router();


courseRouter.get('/all', (req, res) => {
    return res.status(200).json({ message: "All courses are present here!" })
})

courseRouter.post('/purchase', (req,res) =>{
    //purchase a course using details of userID and courseID
    
    //add many other checks too also properly handle requests and return 400 status
    try {
        // await course.find({courseID});

        //some logic to assign access to the user with userID

        //update the db to assign access
    } catch (error) {
        res.status(500).json({message:"An error occured " + error});        
    }
})

courseRouter.get('/preview', (req, res) => {
    //get a particular course details

    try {
        //add many other checks too also properly handle requests and return 400 status

        // await courseRouter.find({courseID})
        const course = {
            title: 'my first course',
            description: 'some desc',
            creatorId: 'objectID',
            price: 200,
            image: 'some img url',
        }

        return res.status(200).json({
            course: course
        })
    } catch (error) {
        res.status(500).json({message:"An error occured " + error});
    }
})

module.exports = {
    courseRouter: courseRouter
}