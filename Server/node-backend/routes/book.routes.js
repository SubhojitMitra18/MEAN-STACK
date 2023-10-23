const express=require('express')
const app = express()
const bookRoute=express.Router()
let Book = require("../model/Book")
/*
bookRoute.route('/add-book').post((req,res,next)=>{
    Book.create(req.body,(error,data)=>{
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    });
});*/
//
bookRoute.route('/add-book').post((req, res, next) => {
    Book.create(req.body)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        next(error);
      });
  });

  bookRoute.route('/').get((req, res, next) => {
    Book.find()
      .then(data => {
        res.json(data);
      })
      .catch(error => {
        next(error);
      });
  });
/*
bookRoute.route('/').get((req,res)=>{
    Book.find((error,data)=>{
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    });
});*/

bookRoute.route('/read-book/:id').get(async (req, res, next) => {
    try {
      const data = await Book.findById(req.params.id);
      if (!data) {
        return res.status(404).json({ msg: 'Book not found' });
      }
      res.json(data);
    } catch (error) {
      next(error);
    }
  });
/*  


bookRoute.route('/read-book/:id').get((req,res)=>{
    Book.findById(req.params.id,(error,data)=>{
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    });
});*/

bookRoute.route('/update-book/:id').put(async (req, res, next) => {
    try {
      const data = await Book.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      if (!data) {
        return res.status(404).json({ msg: 'Book not found' });
      }
      res.json(data);
      console.log('Book Updated');
    } catch (error) {
      next(error);
    }
  });
/*  

bookRoute.route('/update-book/:id').put((req,res,next)=>{
    Book.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },(error,data)=>{
        if(error){
            return next(error);
            console.log(error)
        }else{
            res.json(data)
            console.log("Book Updated")
        }
    })
})*/

bookRoute.route('/delete-book/:id').delete(async (req, res, next) => {
    try {
      const data = await Book.findByIdAndDelete(req.params.id);
      if (!data) {
        return res.status(404).json({ msg: 'Book not found' });
      }
      res.status(200).json({ msg: 'Book deleted', data });
    } catch (error) {
      next(error);
    }
  });
  

/*
bookRoute.route('/delete-book/:id').delete((req,res,next)=>{
    Book.findByIdAndRemove(req.params.id,(error,data)=>{
        if(error){
            return next(error);
        }else{
            res.status(200).json({
                msg:data
            })
        }
    })
})*/

module.exports=bookRoute

