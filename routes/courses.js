const express = require('express');
const Joi = require('joi');

const router = express.Router();

const courses = [{
    id: 1,
    name: 'course1'
  },
  {
    id: 2,
    name: 'course2'
  },
  {
    id: 3,
    name: 'course3'
  },
]

router.get('', (req, res) => {
  res.send(courses);
})

// /api/courses/1

router.get('/:id', (req, res) => {
  // let filt = courses.filter(ele => ele.id == req.params.id)
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('This course not available');
  res.send(course);
})


// creating a post request

router.post('/', (req, res) => {

  const result = validateCourse(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});


// Update the data using put

router.put('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('This course not available');
  const result = validateCourse(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  course.name = req.body.name;
  res.send(course);
})

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  const result = Joi.validate(course, schema);
  return result;
}

module.exports = router;
