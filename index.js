const Joi = require('joi')
const express = require('express')
const res = require('express/lib/response')
const app = express()

const courses = [
    { id: 1, name: "courses_1"},
    { id: 2, name: "courses_2"},
    { id: 3, name: "courses_3"}
]   

app.post('/api/courses', (req, res) => {
        const { error } = validateCourse(req.body)
        if (error) {
           return res.status(400).send(error.details[0].message)
        }

        const course = {    
            id: courses.length + 1,
            name: req.body.name
        }

        courses.push(course)
        res.send(course)
})

app.put('/api/courses/:id', (req, res) => {
        const course = courses.find(c => c.id === parseInt(req.params.id))
        if (!course)
            return res.status(404).send('The course was not found')

        const { error } = validateCourse(req.body)
        if (error)
            return res.status(400).send(error.details[0].message)

        course.name = req.body.name
        req.send(course)
})

app.delete('/api/coourses/:id', (req, res) => {
        const course = courses.find(c => c.id === parseInt(req.params.id))
        if (!course) 
           return res.status(404).send('The course was not found')

        const index = courses.indexOf(course)
        courses.splice(index)

        res.send(courses)
})

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).require()
    }

    return Joi.validateCourse(course, schema)
}

app.get('/', (req, res) => {
        res.send('Hello!!!')
})

app.get('/api/courses', (req, res) => {
        res.send([1, 2, 3])
})

app.get('/api/courses/:id', (req, res) => {
        const course = courses.find(c => c.id === parseInt(req.params.id))
        if (!course) return res.status(404).send('The course was not found')
        res.send(course)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(` Listening on port  ${port} `))