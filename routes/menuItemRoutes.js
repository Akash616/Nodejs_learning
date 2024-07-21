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

  router.put('/:id', async (req, res) => {
    try {
        const menuId = req.params.id; //Extract the is form the URL parameter
        const updatedMenuItem = req.body; //Updated data for the menu

        const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuItem, {
          new: true, //Return the updated documnet
          runValidators: true //Run mongoose validation
        });

        if(!response){ //if id is not present
          return res.status(404).json({ erroe: 'Menu not found' });
        }

        console.log('data updated');
        res.status(200).json(response);

    } catch (error) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error'});
    }
  });

  router.delete('/:id', async (req, res) => {
    try{
      const menuId = req.params.id;

      //Assuming you have a MenuItem model
      const response = await MenuItem.findByIdAndDelete(menuId);

      if(!response){
        return res.status(404).json({ error: 'Menu not found'});
      }

      console.log('data deleted');
      res.status(200).json({ message : 'Menu Deleted Successfully' });

    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
  });


  module.exports = router;