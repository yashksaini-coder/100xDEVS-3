const { Router } = require('express');
const courseRouter = Router();
const { purchase, courseModel} = require('../db.js');
const { userMiddleware } = require('../middleware/user');


courseRouter.get('/all', async (req, res) => {
    const allCourses = await courseModel.find({});
    return res.status(200).json({ message: "All courses are present here!", allCourses })
})

//purchase a course using details of userID and courseID
courseRouter.post('/purchase', userMiddleware, async (req,res) =>{
    
    const userId = req.userId;
    const courseId = req.body.courseId;
    //add many other checks too also properly handle requests and return 400 status
    try {
        await purchase.create({
            userId,
            courseId
        })

        res.status(200).json({message:"You have bought the course successfully"})

    } catch (error) {
        res.status(500).json({message:"An error occured " + error});        
    }
})

courseRouter.get('/preview', (req, res) => {
    //get a particular course details

    try {

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