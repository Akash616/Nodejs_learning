const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

router.post('/', async (req, res) => {
    try{
  
      const data = req.body;
      const newItem = new MenuItem(data);
      const response = await newItem.save();
      console.log('data saved');
      res.status(200).json(response);
  
    }catch(err){
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error'});
    }
  });
  
  router.get('/', async (req, res) => {
    try{
      const response = await MenuItem.find();
      console.log('data fetched');
      res.status(200).json(response);
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
  });

  router.get('/:taste', async (req, res) => { //:taste is a varibale
    try{
        const taste = req.params.taste;
        if(taste == 'sweet' || taste == 'spicy' || taste == 'sour'){
            const response = await MenuItem.find({taste: taste});
            console.log('Response fetched');
        res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid taste type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error'});
    }
  });

  module.exports = router;