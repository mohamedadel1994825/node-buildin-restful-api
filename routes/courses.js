const express=require('express');
const Joi = require('@hapi/joi');
const router =express.Router();
router.use(express.json())
const _=require('underscore')
let courses=[
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'}
]
router.get('/',(req,res)=>{
    res.send(courses)
})
router.post('/',(req,res)=>{
    let {error}=validateCourse(req.body)
    if (error) {
        res.status(400).send(error.message);
        return
    }
    let course={
        id:courses.length+1,
        name:req.body.name
    }
    courses.push(course);
    res.send(course)
})
router.get('/:id',(req,res)=>{
let course=_.find(courses,course=>course.id=== req.params.id*1)
if (!course) {
    res.status(404).send('course with the given id not found')
    return
}
res.send(course)
})
router.put('/:id',(req,res)=>{
    let course=_.find(courses,course=>course.id=== req.params.id*1)
    if (!course) {
        res.status(404).send('course with the given id not found')
        return
    }
    let {error}=validateCourse(req.body)
    if (error) {
        res.status(400).send(error.message);
        return
    }
    course.name=req.body.name
    res.send(course)
    })
    router.delete('/:id',(req,res)=>{
        let course=_.find(courses,course=>course.id=== req.params.id*1)
        if (!course) {
            res.status(404).send('course with the given id not found')
            return
        }
        let index=_.indexOf(courses,course)
            courses.splice(index,1)     
            res.send(course)
     })
validateCourse=(course)=>{
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),    
        id: Joi.number()
            .integer()
            .min(0)
            .max(2013),
    })    
    
    let result= schema.validate(course);
    return result
    console.log('result',result)
}
module.exports=router;